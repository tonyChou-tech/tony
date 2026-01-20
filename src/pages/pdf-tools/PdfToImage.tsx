import { useState, ChangeEvent } from 'react'
import { useTranslation } from 'react-i18next'
import * as pdfjsLib from 'pdfjs-dist'
import AdBanner from '../../components/AdBanner'

// 設定 PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`

interface ImageData {
  pageNum: number
  url: string
}

function PdfToImage() {
  const { t } = useTranslation()
  const [file, setFile] = useState<File | null>(null)
  const [images, setImages] = useState<ImageData[]>([])
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(false)

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile)
      setImages([])
      setStatus('')
    } else {
      setStatus(t('errors.invalidFile'))
    }
  }

  const handleConvert = async () => {
    if (!file) {
      setStatus(t('errors.fileRequired'))
      return
    }

    setLoading(true)
    setStatus(t('common.processing'))
    setImages([])

    try {
      const arrayBuffer = await file.arrayBuffer()
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise
      const numPages = pdf.numPages
      const imageUrls: ImageData[] = []

      for (let pageNum = 1; pageNum <= numPages; pageNum++) {
        const page = await pdf.getPage(pageNum)
        const scale = 2.0
        const viewport = page.getViewport({ scale })

        const canvas = document.createElement('canvas')
        const context = canvas.getContext('2d')
        if (!context) continue

        canvas.height = viewport.height
        canvas.width = viewport.width

        await page.render({
          canvasContext: context,
          viewport: viewport,
        } as any).promise

        const imageUrl = canvas.toDataURL('image/png')
        imageUrls.push({ pageNum, url: imageUrl })

        setStatus(t('pdfTools.pdfToImage.converting', { current: pageNum, total: numPages }))
      }

      setImages(imageUrls)
      setStatus(t('pdfTools.pdfToImage.success', { count: numPages }))
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : t('errors.unknownError')
      setStatus(t('errors.processingFailed', { message: errorMessage }))
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const downloadImage = (imageUrl: string, pageNum: number) => {
    const link = document.createElement('a')
    link.href = imageUrl
    link.download = `page-${pageNum}.png`
    link.click()
  }

  const downloadAll = () => {
    images.forEach((img) => {
      setTimeout(() => downloadImage(img.url, img.pageNum), img.pageNum * 100)
    })
  }

  return (
    <div className="tool-page">
      <h1>{t('pdfTools.pdfToImage.title')}</h1>
      <p>{t('pdfTools.pdfToImage.description')}</p>

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
            {t('pdfTools.pdfToImage.selectFile')}
          </label>
        </div>

        {file && (
          <div className="file-info">
            <p>已選擇: {file.name}</p>
          </div>
        )}

        <button onClick={handleConvert} disabled={!file || loading}>
          {loading ? t('common.processing') : t('common.upload')}
        </button>

        {status && (
          <div className="status-message">
            <p>{status}</p>
          </div>
        )}

        {images.length > 0 && (
          <>
            <button onClick={downloadAll} style={{ marginTop: '1rem' }}>
              {t('pdfTools.pdfToImage.downloadAll')}
            </button>

            <div className="image-grid" style={{ marginTop: '2rem' }}>
              {images.map((img) => (
                <div key={img.pageNum} className="image-item">
                  <img
                    src={img.url}
                    alt={`Page ${img.pageNum}`}
                    style={{ maxWidth: '100%', border: '1px solid #ddd' }}
                  />
                  <button
                    onClick={() => downloadImage(img.url, img.pageNum)}
                    style={{ marginTop: '0.5rem' }}
                  >
                    {t('pdfTools.pdfToImage.downloadPage', { page: img.pageNum })}
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      <AdBanner />
    </div>
  )
}

export default PdfToImage
