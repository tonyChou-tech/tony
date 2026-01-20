import { useState, useRef, ChangeEvent } from 'react'
import { useTranslation } from 'react-i18next'
import AdBanner from '../../components/AdBanner'

function ImageCrop() {
  const { t } = useTranslation()
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [status, setStatus] = useState('')
  const [width, setWidth] = useState(800)
  const [height, setHeight] = useState(600)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile && selectedFile.type.startsWith('image/')) {
      setFile(selectedFile)
      setStatus('')

      const reader = new FileReader()
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setPreview(reader.result)
        }
      }
      reader.readAsDataURL(selectedFile)
    } else {
      setStatus(t('errors.invalidFile'))
    }
  }

  const handleResize = async () => {
    if (!file || !preview) {
      setStatus(t('errors.fileRequired'))
      return
    }

    setStatus(t('imageTools.crop.cropping'))

    try {
      const img = new Image()
      img.src = preview

      img.onload = () => {
        const canvas = canvasRef.current
        if (!canvas) return

        canvas.width = width
        canvas.height = height

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        // 計算縮放比例以填滿畫布
        const scale = Math.max(width / img.width, height / img.height)
        const scaledWidth = img.width * scale
        const scaledHeight = img.height * scale

        // 居中裁切
        const x = (width - scaledWidth) / 2
        const y = (height - scaledHeight) / 2

        ctx.drawImage(img, x, y, scaledWidth, scaledHeight)

        canvas.toBlob(
          (blob) => {
            if (!blob) return
            const url = URL.createObjectURL(blob)
            const link = document.createElement('a')
            link.href = url
            link.download = file.name.replace(/\.[^.]+$/, '-cropped$&')
            link.click()
            URL.revokeObjectURL(url)
            setStatus(t('imageTools.crop.success'))
          },
          'image/png',
          0.95
        )
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : t('errors.unknownError')
      setStatus(t('errors.processingFailed', { message: errorMessage }))
      console.error(error)
    }
  }

  const presets = [
    { name: '正方形 (1:1)', width: 800, height: 800 },
    { name: '寬屏 (16:9)', width: 1920, height: 1080 },
    { name: 'Instagram (1:1)', width: 1080, height: 1080 },
    { name: 'Instagram Story (9:16)', width: 1080, height: 1920 },
    { name: 'Facebook Cover (16:9)', width: 1200, height: 675 },
  ]

  return (
    <div className="tool-page">
      <h1>{t('imageTools.crop.title')}</h1>
      <p>{t('imageTools.crop.description')}</p>

      <AdBanner />

      <div className="tool-card">
        <div className="file-input-wrapper">
          <input
            type="file"
            id="image-file"
            accept="image/*"
            onChange={handleFileChange}
          />
          <label htmlFor="image-file" className="file-input-label">
            {t('imageTools.crop.selectImage')}
          </label>
        </div>

        {file && (
          <div style={{ marginTop: '1rem' }}>
            <h3>{t('imageTools.crop.presets')}</h3>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
              {presets.map((preset) => (
                <button
                  key={preset.name}
                  onClick={() => {
                    setWidth(preset.width)
                    setHeight(preset.height)
                  }}
                  style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}
                >
                  {preset.name}
                </button>
              ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label>
                  {t('imageTools.crop.width')}:
                  <input
                    type="number"
                    value={width}
                    onChange={(e) => setWidth(parseInt(e.target.value) || 0)}
                    style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
                  />
                </label>
              </div>
              <div>
                <label>
                  {t('imageTools.crop.height')}:
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(parseInt(e.target.value) || 0)}
                    style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
                  />
                </label>
              </div>
            </div>
          </div>
        )}

        <button onClick={handleResize} disabled={!file}>
          {t('imageTools.crop.title')}
        </button>

        {status && (
          <div className="status-message">
            <p>{status}</p>
          </div>
        )}

        {preview && (
          <div style={{ marginTop: '2rem' }}>
            <h3>原始圖片</h3>
            <img src={preview} alt="Preview" style={{ maxWidth: '100%', maxHeight: '400px' }} />
          </div>
        )}

        <canvas ref={canvasRef} style={{ display: 'none' }} />
      </div>

      <AdBanner />
    </div>
  )
}

export default ImageCrop
