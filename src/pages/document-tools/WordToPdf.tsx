import { useState } from 'react'
import AdBanner from '../../components/AdBanner'

function WordToPdf() {
  const [file, setFile] = useState(null)
  const [status, setStatus] = useState('')

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    if (selectedFile && (
      selectedFile.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
      selectedFile.type === 'application/msword'
    )) {
      setFile(selectedFile)
      setStatus('')
    } else {
      setStatus('請選擇有效的 Word 文件 (.doc 或 .docx)')
    }
  }

  const handleConvert = () => {
    if (!file) {
      setStatus('請先選擇 Word 文件')
      return
    }

    // 注意：真正的 Word 轉 PDF 需要後端服務或付費 API
    // 瀏覽器無法直接處理 Word 文件格式
    setStatus('Word 轉 PDF 需要後端服務支援。建議使用：')
  }

  return (
    <div className="tool-page">
      <h1>Word 轉 PDF</h1>
      <p>將 Word 文檔轉換為 PDF 格式</p>

      <AdBanner />

      <div className="tool-card">
        <div className="file-input-wrapper">
          <input
            type="file"
            id="word-file"
            accept=".doc,.docx"
            onChange={handleFileChange}
          />
          <label htmlFor="word-file" className="file-input-label">
            選擇 Word 文件
          </label>
        </div>

        {file && (
          <div className="file-info">
            <p>已選擇: {file.name}</p>
            <p>大小: {(file.size / 1024 / 1024).toFixed(2)} MB</p>
          </div>
        )}

        <button onClick={handleConvert} disabled={!file}>
          轉換為 PDF
        </button>

        {status && (
          <div className="status-message">
            <p>{status}</p>
          </div>
        )}

        <div className="info-box" style={{ marginTop: '2rem' }}>
          <h3>功能說明</h3>
          <ul>
            <li>此功能需要後端服務或 API 支援</li>
            <li>瀏覽器無法直接處理 Word 文件格式</li>
            <li>建議使用線上服務：</li>
          </ul>
          <div style={{ marginTop: '1rem' }}>
            <p><strong>推薦服務：</strong></p>
            <ul>
              <li>Smallpdf.com</li>
              <li>iLovePDF.com</li>
              <li>PDF24.org</li>
              <li>或使用 Microsoft Word 的「另存為 PDF」功能</li>
            </ul>
          </div>
        </div>

        <div className="info-box" style={{ marginTop: '1rem', background: '#fff3cd', border: '1px solid #ffc107' }}>
          <h3>開發者注意</h3>
          <p>如需實現此功能，可考慮：</p>
          <ul>
            <li>使用後端服務（如 LibreOffice、Python docx2pdf）</li>
            <li>整合第三方 API（如 Zamzar API、CloudConvert）</li>
            <li>使用 Microsoft Graph API</li>
          </ul>
        </div>
      </div>

      <AdBanner />
    </div>
  )
}

export default WordToPdf
