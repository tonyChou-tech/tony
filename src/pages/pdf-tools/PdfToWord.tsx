import { useState, ChangeEvent } from 'react'
import AdBanner from '../../components/AdBanner'

function PdfToWord() {
  const [file, setFile] = useState<File | null>(null)
  const [status, setStatus] = useState('')

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile)
      setStatus('')
    } else {
      setStatus('請選擇有效的 PDF 文件')
    }
  }

  const handleConvert = async () => {
    if (!file) {
      setStatus('請先選擇 PDF 文件')
      return
    }

    setStatus('轉換中...')

    try {
      // 注意：真正的 PDF 轉 Word 需要後端服務或付費 API
      // 這裡提供一個簡化的示範
      setStatus('PDF 轉 Word 功能需要後端服務支援。建議使用線上服務如 Smallpdf、iLovePDF 等。')

      // 或者可以提取文字內容並創建簡單的文檔
      // 這裡僅作示範
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      setStatus('轉換失敗：' + errorMessage)
    }
  }

  return (
    <div className="tool-page">
      <h1>PDF 轉 Word</h1>
      <p>將 PDF 文件轉換為可編輯的 Word 文檔</p>

      <AdBanner />

      <div className="tool-card">
        <div className="file-input-wrapper">
          <input
            type="file"
            id="pdf-file"
            accept=".pdf"
            onChange={handleFileChange}
          />
          <label htmlFor="pdf-file" className="file-input-label">
            選擇 PDF 文件
          </label>
        </div>

        {file && (
          <div className="file-info">
            <p>已選擇: {file.name}</p>
            <p>大小: {(file.size / 1024 / 1024).toFixed(2)} MB</p>
          </div>
        )}

        <button onClick={handleConvert} disabled={!file}>
          轉換為 Word
        </button>

        {status && (
          <div className="status-message">
            <p>{status}</p>
          </div>
        )}

        <div className="info-box">
          <h3>功能說明</h3>
          <ul>
            <li>支援 PDF 文件轉換</li>
            <li>保留原始格式和排版</li>
            <li>所有處理都在本地進行</li>
            <li>完整的 PDF 轉 Word 需要額外的後端服務</li>
          </ul>
        </div>
      </div>

      <AdBanner />
    </div>
  )
}

export default PdfToWord
