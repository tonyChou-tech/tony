import { useState, ChangeEvent } from 'react'
import { PDFDocument } from 'pdf-lib'
import AdBanner from '../../components/AdBanner'

function CompressPdf() {
  const [file, setFile] = useState<File | null>(null)
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(false)
  const [originalSize, setOriginalSize] = useState(0)
  const [compressedSize, setCompressedSize] = useState(0)

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile)
      setOriginalSize(selectedFile.size)
      setStatus('')
      setCompressedSize(0)
    } else {
      setStatus('請選擇有效的 PDF 文件')
    }
  }

  const handleCompress = async () => {
    if (!file) {
      setStatus('請先選擇 PDF 文件')
      return
    }

    setLoading(true)
    setStatus('壓縮中...')

    try {
      const fileData = await file.arrayBuffer()
      const pdfDoc = await PDFDocument.load(fileData)

      // 注意：pdf-lib 的壓縮功能有限
      // 主要是移除未使用的對象和優化結構
      const compressedPdfBytes = await pdfDoc.save({
        useObjectStreams: true,
        addDefaultPage: false,
      })

      const compressedBlob = new Blob([compressedPdfBytes as BlobPart], { type: 'application/pdf' })
      const url = URL.createObjectURL(compressedBlob)

      setCompressedSize(compressedBlob.size)

      const link = document.createElement('a')
      link.href = url
      link.download = file.name.replace('.pdf', '-compressed.pdf')
      link.click()

      URL.revokeObjectURL(url)

      const reduction = ((1 - compressedBlob.size / originalSize) * 100).toFixed(2)
      setStatus(`壓縮完成！檔案已下載。減少了 ${reduction}%`)
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      setStatus('壓縮失敗：' + errorMessage)
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const formatFileSize = (bytes: number) => {
    return (bytes / 1024 / 1024).toFixed(2) + ' MB'
  }

  return (
    <div className="tool-page">
      <h1>壓縮 PDF</h1>
      <p>減少 PDF 文件大小</p>

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
            <p>原始大小: {formatFileSize(originalSize)}</p>
            {compressedSize > 0 && (
              <p>壓縮後: {formatFileSize(compressedSize)}</p>
            )}
          </div>
        )}

        <button onClick={handleCompress} disabled={!file || loading}>
          {loading ? '壓縮中...' : '壓縮 PDF'}
        </button>

        {status && (
          <div className="status-message">
            <p>{status}</p>
          </div>
        )}

        <div className="info-box" style={{ marginTop: '2rem' }}>
          <h3>功能說明</h3>
          <ul>
            <li>優化 PDF 文件結構</li>
            <li>移除未使用的對象</li>
            <li>基礎壓縮功能</li>
            <li>注意：此工具的壓縮效果有限</li>
            <li>如需更好的壓縮效果，建議使用專業的 PDF 壓縮服務</li>
          </ul>
        </div>
      </div>

      <AdBanner />
    </div>
  )
}

export default CompressPdf
