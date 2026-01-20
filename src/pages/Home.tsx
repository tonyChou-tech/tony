import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import AdBanner from '../components/AdBanner'

function Home() {
  const { t } = useTranslation()

  const tools = {
    pdf: [
      { name: t('pdfTools.pdfToWord.title'), path: '/pdf-tools/pdf-to-word', desc: t('pdfTools.pdfToWord.description') },
      { name: t('pdfTools.pdfToImage.title'), path: '/pdf-tools/pdf-to-image', desc: t('pdfTools.pdfToImage.description') },
      { name: t('pdfTools.mergePdf.title'), path: '/pdf-tools/merge-pdf', desc: t('pdfTools.mergePdf.description') },
      { name: t('pdfTools.compressPdf.title'), path: '/pdf-tools/compress-pdf', desc: t('pdfTools.compressPdf.description') },
    ],
    image: [
      { name: t('imageTools.compress.title'), path: '/image-tools/compress', desc: t('imageTools.compress.description') },
      { name: t('imageTools.convert.title'), path: '/image-tools/convert', desc: t('imageTools.convert.description') },
      { name: t('imageTools.crop.title'), path: '/image-tools/crop', desc: t('imageTools.crop.description') },
    ],
    document: [
      { name: t('documentTools.wordToPdf.title'), path: '/document-tools/word-to-pdf', desc: t('documentTools.wordToPdf.description') },
      { name: t('documentTools.excelToCsv.title'), path: '/document-tools/excel-to-csv', desc: t('documentTools.excelToCsv.description') },
    ],
    other: [
      { name: t('otherTools.jsonFormatter.title'), path: '/other-tools/json-formatter', desc: t('otherTools.jsonFormatter.description') },
      { name: t('otherTools.base64.title'), path: '/other-tools/base64', desc: t('otherTools.base64.description') },
      { name: t('otherTools.qrCode.title'), path: '/other-tools/qr-code', desc: t('otherTools.qrCode.description') },
    ],
  }

  return (
    <div className="home">
      <div className="hero">
        <h1>{t('home.heroTitle')}</h1>
        <p>{t('home.heroDescription')}</p>
      </div>

      <AdBanner slot="top-banner" />

      <div className="tool-category">
        <h2>📄 {t('pdfTools.category')}</h2>
        <div className="tool-grid">
          {tools.pdf.map((tool) => (
            <Link key={tool.path} to={tool.path} className="tool-link">
              <h3>{tool.name}</h3>
              <p>{tool.desc}</p>
            </Link>
          ))}
        </div>
      </div>

      <AdBanner slot="middle-banner-1" />

      <div className="tool-category">
        <h2>🖼️ {t('imageTools.category')}</h2>
        <div className="tool-grid">
          {tools.image.map((tool) => (
            <Link key={tool.path} to={tool.path} className="tool-link">
              <h3>{tool.name}</h3>
              <p>{tool.desc}</p>
            </Link>
          ))}
        </div>
      </div>

      <div className="tool-category">
        <h2>📝 {t('documentTools.category')}</h2>
        <div className="tool-grid">
          {tools.document.map((tool) => (
            <Link key={tool.path} to={tool.path} className="tool-link">
              <h3>{tool.name}</h3>
              <p>{tool.desc}</p>
            </Link>
          ))}
        </div>
      </div>

      <AdBanner slot="middle-banner-2" />

      <div className="tool-category">
        <h2>🛠️ {t('otherTools.category')}</h2>
        <div className="tool-grid">
          {tools.other.map((tool) => (
            <Link key={tool.path} to={tool.path} className="tool-link">
              <h3>{tool.name}</h3>
              <p>{tool.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home
