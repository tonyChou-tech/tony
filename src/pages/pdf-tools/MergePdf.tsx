import { useState, ChangeEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { PDFDocument } from 'pdf-lib'
import AdBanner from '../../components/AdBanner'

function MergePdf() {
  const { t } = useTranslation()
  const [files, setFiles] = useState<File[]>([])
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(false)

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || [])
    const pdfFiles = selectedFiles.filter((file: File) => file.type === 'application/pdf')

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
    setStatus(t('pdfTools.mergePdf.merging', { current: 0, total: files.length }))

    try {
      const mergedPdf = await PDFDocument.create()

      for (let i = 0; i < files.length; i++) {
        const fileData = await files[i].arrayBuffer()
        const pdf = await PDFDocument.load(fileData)
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices())
        copiedPages.forEach((page) => mergedPdf.addPage(page))
        setStatus(t('pdfTools.mergePdf.merging', { current: i + 1, total: files.length }))
      }

      const mergedPdfBytes = await mergedPdf.save()
      const blob = new Blob([mergedPdfBytes as BlobPart], { type: 'application/pdf' })
      const url = URL.createObjectURL(blob)

      const link = document.createElement('a')
      link.href = url
      link.download = 'merged.pdf'
      link.click()

      URL.revokeObjectURL(url)
      setStatus(t('pdfTools.mergePdf.success'))
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : t('errors.unknownError')
      setStatus(t('errors.processingFailed', { message: errorMessage }))
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index))
  }

  return (
    <div className="tool-page">
      <h1>{t('pdfTools.mergePdf.title')}</h1>
      <p>{t('pdfTools.mergePdf.description')}</p>

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
            {t('pdfTools.mergePdf.selectFiles')}
          </label>
        </div>

        {files.length > 0 && (
          <div className="file-list" style={{ marginTop: '1rem' }}>
            <h3>{t('pdfTools.mergePdf.filesSelected', { count: files.length })}</h3>
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
                  {t('pdfTools.mergePdf.remove')}
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
          {loading ? t('common.processing') : t('pdfTools.mergePdf.title')}
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
