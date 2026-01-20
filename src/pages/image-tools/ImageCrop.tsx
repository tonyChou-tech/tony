import { useState, useRef, ChangeEvent } from 'react'
import AdBanner from '../../components/AdBanner'

function ImageCrop() {
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
      setStatus('請選擇有效的圖片文件')
    }
  }

  const handleResize = async () => {
    if (!file || !preview) {
      setStatus('請先選擇圖片')
      return
    }

    setStatus('處理中...')

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
            setStatus('裁切完成！檔案已下載')
          },
          'image/png',
          0.95
        )
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      setStatus('處理失敗：' + errorMessage)
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
      <h1>圖片裁切</h1>
      <p>裁切和調整圖片尺寸</p>

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
            選擇圖片
          </label>
        </div>

        {file && (
          <div style={{ marginTop: '1rem' }}>
            <h3>預設尺寸</h3>
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
                  寬度 (px):
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
                  高度 (px):
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
          裁切圖片
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
