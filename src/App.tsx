import { Routes, Route } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

// Pages
import Home from './pages/Home'
import PdfToWord from './pages/pdf-tools/PdfToWord'
import PdfToImage from './pages/pdf-tools/PdfToImage'
import MergePdf from './pages/pdf-tools/MergePdf'
import CompressPdf from './pages/pdf-tools/CompressPdf'
import ImageCompress from './pages/image-tools/ImageCompress'
import ImageConvert from './pages/image-tools/ImageConvert'
import ImageCrop from './pages/image-tools/ImageCrop'
import WordToPdf from './pages/document-tools/WordToPdf'
import ExcelToCsv from './pages/document-tools/ExcelToCsv'
import JsonFormatter from './pages/other-tools/JsonFormatter'
import Base64Tool from './pages/other-tools/Base64Tool'
import QrCodeGenerator from './pages/other-tools/QrCodeGenerator'

// Components
import Navigation from './components/Navigation'
import AdBanner from './components/AdBanner'

function App() {
  const { t } = useTranslation()

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1 container">
        <Routes>
          <Route path="/" element={<Home />} />

          {/* PDF Tools */}
          <Route path="/pdf-tools/pdf-to-word" element={<PdfToWord />} />
          <Route path="/pdf-tools/pdf-to-image" element={<PdfToImage />} />
          <Route path="/pdf-tools/merge-pdf" element={<MergePdf />} />
          <Route path="/pdf-tools/compress-pdf" element={<CompressPdf />} />

          {/* Image Tools */}
          <Route path="/image-tools/compress" element={<ImageCompress />} />
          <Route path="/image-tools/convert" element={<ImageConvert />} />
          <Route path="/image-tools/crop" element={<ImageCrop />} />

          {/* Document Tools */}
          <Route path="/document-tools/word-to-pdf" element={<WordToPdf />} />
          <Route path="/document-tools/excel-to-csv" element={<ExcelToCsv />} />

          {/* Other Tools */}
          <Route path="/other-tools/json-formatter" element={<JsonFormatter />} />
          <Route path="/other-tools/base64" element={<Base64Tool />} />
          <Route path="/other-tools/qr-code" element={<QrCodeGenerator />} />
        </Routes>

        <AdBanner slot="bottom-banner" />
      </main>

      <footer className="bg-gray-900 text-white text-center py-8 mt-16">
        <p>{t('footer.copyright')}</p>
      </footer>
    </div>
  )
}

export default App
