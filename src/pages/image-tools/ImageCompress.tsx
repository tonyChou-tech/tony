import { useState, ChangeEvent } from 'react'
import imageCompression from 'browser-image-compression'
import AdBanner from '../../components/AdBanner'

function ImageCompress() {
  const [file, setFile] = useState<File | null>(null)
  const [originalPreview, setOriginalPreview] = useState<string | null>(null)
  const [compressedPreview, setCompressedPreview] = useState<string | null>(null)
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(false)
  const [quality, setQuality] = useState(0.8)
  const [originalSize, setOriginalSize] = useState(0)
  const [compressedSize, setCompressedSize] = useState(0)

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile && selectedFile.type.startsWith('image/')) {
      setFile(selectedFile)
      setOriginalSize(selectedFile.size)
      setStatus('')
      setCompressedPreview(null)

      const reader = new FileReader()
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setOriginalPreview(reader.result)
        }
      }
      reader.readAsDataURL(selectedFile)
    } else {
      setStatus('請選擇有效的圖片文件')
    }
  }

  const handleCompress = async () => {
    if (!file) {
      setStatus('請先選擇圖片')
      return
    }

    setLoading(true)
    setStatus('壓縮中...')

    try {
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
        initialQuality: quality,
      }

      const compressedFile = await imageCompression(file, options)
      setCompressedSize(compressedFile.size)

      const reader = new FileReader()
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setCompressedPreview(reader.result)
        }
        const reduction = ((1 - compressedFile.size / originalSize) * 100).toFixed(2)
        setStatus(`壓縮完成！減少了 ${reduction}%`)
      }
      reader.readAsDataURL(compressedFile)

      // 創建下載連結
      const url = URL.createObjectURL(compressedFile)
      const link = document.createElement('a')
      link.href = url
      link.download = file.name.replace(/\.[^.]+$/, '-compressed$&')
      link.click()
      URL.revokeObjectURL(url)
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      setStatus('壓縮失敗：' + errorMessage)
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const formatFileSize = (bytes: number) => {
    return (bytes / 1024).toFixed(2) + ' KB'
  }

  return (
    <div className="tool-page">
      <h1>圖片壓縮</h1>
      <p>壓縮圖片大小，同時保持良好的畫質</p>

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
            <label>
              壓縮品質: {(quality * 100).toFixed(0)}%
              <input
                type="range"
                min="0.1"
                max="1"
                step="0.1"
                value={quality}
                onChange={(e) => setQuality(parseFloat(e.target.value))}
                style={{ marginLeft: '1rem', width: '200px' }}
              />
            </label>
          </div>
        )}

        <button onClick={handleCompress} disabled={!file || loading}>
          {loading ? '壓縮中...' : '開始壓縮'}
        </button>

        {status && (
          <div className="status-message">
            <p>{status}</p>
          </div>
        )}

        {(originalPreview || compressedPreview) && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '2rem' }}>
            {originalPreview && (
              <div>
                <h3>原始圖片</h3>
                <img src={originalPreview} alt="Original" style={{ maxWidth: '100%' }} />
                <p>大小: {formatFileSize(originalSize)}</p>
              </div>
            )}
            {compressedPreview && (
              <div>
                <h3>壓縮後</h3>
                <img src={compressedPreview} alt="Compressed" style={{ maxWidth: '100%' }} />
                <p>大小: {formatFileSize(compressedSize)}</p>
              </div>
            )}
          </div>
        )}
      </div>

      <AdBanner />
    </div>
  )
}

export default ImageCompress
