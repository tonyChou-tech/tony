import { Link } from 'react-router-dom'
import AdBanner from '../components/AdBanner'

function Home() {
  const tools = {
    pdf: [
      { name: 'PDF 轉 Word', path: '/pdf-tools/pdf-to-word', desc: '將 PDF 文件轉換為可編輯的 Word 文檔' },
      { name: 'PDF 轉圖片', path: '/pdf-tools/pdf-to-image', desc: '將 PDF 頁面轉換為圖片格式' },
      { name: '合併 PDF', path: '/pdf-tools/merge-pdf', desc: '將多個 PDF 文件合併為一個' },
      { name: '壓縮 PDF', path: '/pdf-tools/compress-pdf', desc: '減少 PDF 文件大小' },
    ],
    image: [
      { name: '圖片壓縮', path: '/image-tools/compress', desc: '壓縮圖片大小，保持畫質' },
      { name: '圖片轉檔', path: '/image-tools/convert', desc: '轉換圖片格式 (JPG, PNG, WebP 等)' },
      { name: '圖片裁切', path: '/image-tools/crop', desc: '裁切和調整圖片尺寸' },
    ],
    document: [
      { name: 'Word 轉 PDF', path: '/document-tools/word-to-pdf', desc: '將 Word 文檔轉換為 PDF' },
      { name: 'Excel 轉 CSV', path: '/document-tools/excel-to-csv', desc: '將 Excel 文件轉換為 CSV 格式' },
    ],
    other: [
      { name: 'JSON 格式化', path: '/other-tools/json-formatter', desc: '格式化和驗證 JSON 數據' },
      { name: 'Base64 編碼/解碼', path: '/other-tools/base64', desc: 'Base64 編碼和解碼工具' },
      { name: 'QR Code 生成器', path: '/other-tools/qr-code', desc: '生成 QR Code 二維碼' },
    ],
  }

  return (
    <div className="home">
      <div className="hero">
        <h1>免費線上工具集</h1>
        <p>所有工具都在您的瀏覽器中運行，確保您的文件隱私和安全</p>
      </div>

      <AdBanner slot="top-banner" />

      <div className="tool-category">
        <h2>📄 PDF 工具</h2>
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
        <h2>🖼️ 圖片工具</h2>
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
        <h2>📝 文件工具</h2>
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
        <h2>🛠️ 其他工具</h2>
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
