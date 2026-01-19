import { useState } from 'react'
import { PDFDocument } from 'pdf-lib'
import AdBanner from '../../components/AdBanner'

function MergePdf() {
  const [files, setFiles] = useState([])
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(false)

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files)
    const pdfFiles = selectedFiles.filter(file => file.type === 'application/pdf')

    if (pdfFiles.length !== selectedFiles.length) {
      setStatus('部分文件不是 PDF 格式，已自動過濾')
    } else {
      setStatus('')
    }

    setFiles(pdfFiles)
  }

  const handleMerge = async () => {
    if (files.length < 2) {
      setStatus('請至少選擇 2 個 PDF 文件')
      return
    }

    setLoading(true)
    setStatus('合併中...')

    try {
      const mergedPdf = await PDFDocument.create()

      for (let i = 0; i < files.length; i++) {
        const fileData = await files[i].arrayBuffer()
        const pdf = await PDFDocument.load(fileData)
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices())
        copiedPages.forEach((page) => mergedPdf.addPage(page))
        setStatus(`合併中... ${i + 1}/${files.length}`)
      }

      const mergedPdfBytes = await mergedPdf.save()
      const blob = new Blob([mergedPdfBytes], { type: 'application/pdf' })
      const url = URL.createObjectURL(blob)

      const link = document.createElement('a')
      link.href = url
      link.download = 'merged.pdf'
      link.click()

      URL.revokeObjectURL(url)
      setStatus('合併完成！檔案已下載')
    } catch (error) {
      setStatus('合併失敗：' + error.message)
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const removeFile = (index) => {
    setFiles(files.filter((_, i) => i !== index))
  }

  return (
    <div className="tool-page">
      <h1>合併 PDF</h1>
      <p>將多個 PDF 文件合併為一個文件</p>

      <AdBanner />

      <div className="tool-card">
        <div className="file-input-wrapper">
          <input
            type="file"
            id="pdf-files"
            accept=".pdf"
            multiple
            onChange={handleFileChange}
          />
          <label htmlFor="pdf-files" className="file-input-label">
            選擇多個 PDF 文件
          </label>
        </div>

        {files.length > 0 && (
          <div className="file-list" style={{ marginTop: '1rem' }}>
            <h3>已選擇的文件 ({files.length})</h3>
            {files.map((file, index) => (
              <div key={index} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0.5rem',
                background: '#f5f5f5',
                marginBottom: '0.5rem',
                borderRadius: '4px'
              }}>
                <span>{index + 1}. {file.name}</span>
                <button
                  onClick={() => removeFile(index)}
                  style={{ padding: '0.25rem 0.5rem', fontSize: '0.8rem' }}
                >
                  移除
                </button>
              </div>
            ))}
          </div>
        )}

        <button
          onClick={handleMerge}
          disabled={files.length < 2 || loading}
          style={{ marginTop: '1rem' }}
        >
          {loading ? '合併中...' : '合併 PDF'}
        </button>

        {status && (
          <div className="status-message">
            <p>{status}</p>
          </div>
        )}

        <div className="info-box" style={{ marginTop: '2rem' }}>
          <h3>使用說明</h3>
          <ul>
            <li>選擇 2 個或更多 PDF 文件</li>
            <li>文件將按照選擇的順序合併</li>
            <li>可以移除不需要的文件</li>
            <li>所有處理都在瀏覽器本地完成</li>
          </ul>
        </div>
      </div>

      <AdBanner />
    </div>
  )
}

export default MergePdf
