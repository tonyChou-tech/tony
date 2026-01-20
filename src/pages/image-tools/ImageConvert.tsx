import { useState, ChangeEvent } from 'react'
import AdBanner from '../../components/AdBanner'
import type { OutputFormat } from '../../types'

function ImageConvert() {
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
      setStatus('請選擇有效的圖片文件')
    }
  }

  const handleConvert = async () => {
    if (!file || !preview) {
      setStatus('請先選擇圖片')
      return
    }

    setStatus('轉換中...')

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
              setStatus('轉換失敗')
              return
            }

            const url = URL.createObjectURL(blob)
            const link = document.createElement('a')
            link.href = url
            link.download = file.name.replace(/\.[^.]+$/, `.${outputFormat}`)
            link.click()
            URL.revokeObjectURL(url)
            setStatus(`轉換完成！已轉換為 ${outputFormat.toUpperCase()} 格式`)
          },
          `image/${outputFormat}`,
          0.95
        )
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '未知錯誤'
      setStatus('轉換失敗：' + errorMessage)
      console.error(error)
    }
  }

  return (
    <div className="tool-page">
      <h1>圖片轉檔</h1>
      <p>轉換圖片格式 (JPG, PNG, WebP 等)</p>

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
              輸出格式:
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
          開始轉換
        </button>

        {status && (
          <div className="status-message">
            <p>{status}</p>
          </div>
        )}

        {preview && (
          <div style={{ marginTop: '2rem' }}>
            <h3>預覽</h3>
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
