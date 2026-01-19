import { useState } from 'react'
import AdBanner from '../../components/AdBanner'

function ExcelToCsv() {
  const [file, setFile] = useState(null)
  const [status, setStatus] = useState('')

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    if (selectedFile && (
      selectedFile.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
      selectedFile.type === 'application/vnd.ms-excel' ||
      selectedFile.name.endsWith('.csv')
    )) {
      setFile(selectedFile)
      setStatus('')
    } else {
      setStatus('請選擇有效的 Excel 文件 (.xls, .xlsx) 或 CSV 文件')
    }
  }

  const handleConvert = () => {
    if (!file) {
      setStatus('請先選擇 Excel 文件')
      return
    }

    // 基本的 CSV 讀取（如果上傳的是 CSV）
    if (file.name.endsWith('.csv')) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const text = e.target.result
        const blob = new Blob([text], { type: 'text/csv' })
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = file.name
        link.click()
        URL.revokeObjectURL(url)
        setStatus('CSV 文件已下載')
      }
      reader.readAsText(file)
    } else {
      // Excel 轉 CSV 需要額外的庫（如 xlsx）
      setStatus('Excel 轉 CSV 功能需要安裝 xlsx 庫。此處為簡化版本。')
    }
  }

  return (
    <div className="tool-page">
      <h1>Excel 轉 CSV</h1>
      <p>將 Excel 文件轉換為 CSV 格式</p>

      <AdBanner />

      <div className="tool-card">
        <div className="file-input-wrapper">
          <input
            type="file"
            id="excel-file"
            accept=".xls,.xlsx,.csv"
            onChange={handleFileChange}
          />
          <label htmlFor="excel-file" className="file-input-label">
            選擇 Excel 文件
          </label>
        </div>

        {file && (
          <div className="file-info">
            <p>已選擇: {file.name}</p>
            <p>大小: {(file.size / 1024).toFixed(2)} KB</p>
          </div>
        )}

        <button onClick={handleConvert} disabled={!file}>
          轉換為 CSV
        </button>

        {status && (
          <div className="status-message">
            <p>{status}</p>
          </div>
        )}

        <div className="info-box" style={{ marginTop: '2rem' }}>
          <h3>功能說明</h3>
          <ul>
            <li>支援 Excel 文件 (.xls, .xlsx)</li>
            <li>輸出為 CSV 格式</li>
            <li>CSV 格式可被大多數程式讀取</li>
          </ul>
        </div>

        <div className="info-box" style={{ marginTop: '1rem', background: '#e3f2fd', border: '1px solid #2196f3' }}>
          <h3>提示</h3>
          <p>完整的 Excel 轉 CSV 功能需要安裝 xlsx 庫：</p>
          <pre style={{ background: '#263238', color: '#fff', padding: '1rem', borderRadius: '4px', overflow: 'auto' }}>
            npm install xlsx
          </pre>
          <p>然後可以使用 XLSX.read() 和 XLSX.utils.sheet_to_csv() 來實現轉換</p>
        </div>
      </div>

      <AdBanner />
    </div>
  )
}

export default ExcelToCsv
