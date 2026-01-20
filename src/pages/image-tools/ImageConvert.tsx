import { useState, ChangeEvent } from 'react'
import { useTranslation } from 'react-i18next'
import AdBanner from '../../components/AdBanner'
import type { OutputFormat } from '../../types'

function ImageConvert() {
  const { t } = useTranslation()
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [status, setStatus] = useState<string>('')
  const [outputFormat, setOutputFormat] = useState<OutputFormat>('png')

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile && selectedFile.type.startsWith('image/')) {
      setFile(selectedFile)
      setStatus('')

      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(selectedFile)
    } else {
      setStatus(t('errors.invalidFile'))
    }
  }

  const handleConvert = async () => {
    if (!file || !preview) {
      setStatus(t('errors.fileRequired'))
      return
    }

    setStatus(t('imageTools.convert.converting'))

    try {
      const img = new Image()
      img.src = preview

      img.onload = () => {
        const canvas = document.createElement('canvas')
        canvas.width = img.width
        canvas.height = img.height

        const ctx = canvas.getContext('2d')
        if (!ctx) {
          setStatus('無法獲取 canvas context')
          return
        }

        ctx.drawImage(img, 0, 0)

        canvas.toBlob(
          (blob) => {
            if (!blob) {
              setStatus(t('errors.processingFailed', { message: '轉換失敗' }))
              return
            }

            const url = URL.createObjectURL(blob)
            const link = document.createElement('a')
            link.href = url
            link.download = file.name.replace(/\.[^.]+$/, `.${outputFormat}`)
            link.click()
            URL.revokeObjectURL(url)
            setStatus(t('imageTools.convert.success', { format: outputFormat.toUpperCase() }))
          },
          `image/${outputFormat}`,
          0.95
        )
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : t('errors.unknownError')
      setStatus(t('errors.processingFailed', { message: errorMessage }))
      console.error(error)
    }
  }

  return (
    <div className="tool-page">
      <h1>{t('imageTools.convert.title')}</h1>
      <p>{t('imageTools.convert.description')}</p>

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
            {t('imageTools.convert.selectImage')}
          </label>
        </div>

        {file && (
          <div style={{ marginTop: '1rem' }}>
            <label>
              {t('imageTools.convert.outputFormat')}:
              <select
                value={outputFormat}
                onChange={(e) => setOutputFormat(e.target.value as OutputFormat)}
                style={{ marginLeft: '1rem', padding: '0.5rem' }}
              >
                <option value="png">PNG</option>
                <option value="jpeg">JPEG</option>
                <option value="webp">WebP</option>
              </select>
            </label>
          </div>
        )}

        <button onClick={handleConvert} disabled={!file}>
          {t('common.upload')}
        </button>

        {status && (
          <div className="status-message">
            <p>{status}</p>
          </div>
        )}

        {preview && (
          <div style={{ marginTop: '2rem' }}>
            <h3>{t('imageTools.convert.preview')}</h3>
            <img src={preview} alt="Preview" style={{ maxWidth: '100%', maxHeight: '400px' }} />
          </div>
        )}

        <div className="info-box" style={{ marginTop: '2rem' }}>
          <h3>支援格式</h3>
          <ul>
            <li>輸入: JPG, PNG, GIF, BMP, WebP 等</li>
            <li>輸出: PNG, JPEG, WebP</li>
            <li>所有處理都在瀏覽器本地完成</li>
          </ul>
        </div>
      </div>

      <AdBanner />
    </div>
  )
}

export default ImageConvert
