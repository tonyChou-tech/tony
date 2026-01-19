import { Link } from 'react-router-dom'
import { useState } from 'react'

function Navigation() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  return (
    <nav className="bg-gray-900 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-primary hover:text-primary-hover transition-colors">
          線上工具集
        </Link>

        <ul className="flex gap-8 list-none m-0 p-0">
          <li
            className="relative group"
            onMouseEnter={() => setOpenDropdown('pdf')}
            onMouseLeave={() => setOpenDropdown(null)}
          >
            <span className="text-white cursor-pointer py-2 block hover:text-primary transition-colors">
              PDF 工具
            </span>
            <ul className={`absolute top-full left-0 bg-gray-800 min-w-[200px] list-none p-2 rounded shadow-xl
              ${openDropdown === 'pdf' ? 'block' : 'hidden'} group-hover:block`}>
              <li>
                <Link
                  to="/pdf-tools/pdf-to-word"
                  className="block py-3 px-4 text-white no-underline rounded hover:bg-primary transition-colors"
                >
                  PDF 轉 Word
                </Link>
              </li>
              <li>
                <Link
                  to="/pdf-tools/pdf-to-image"
                  className="block py-3 px-4 text-white no-underline rounded hover:bg-primary transition-colors"
                >
                  PDF 轉圖片
                </Link>
              </li>
              <li>
                <Link
                  to="/pdf-tools/merge-pdf"
                  className="block py-3 px-4 text-white no-underline rounded hover:bg-primary transition-colors"
                >
                  合併 PDF
                </Link>
              </li>
              <li>
                <Link
                  to="/pdf-tools/compress-pdf"
                  className="block py-3 px-4 text-white no-underline rounded hover:bg-primary transition-colors"
                >
                  壓縮 PDF
                </Link>
              </li>
            </ul>
          </li>

          <li
            className="relative group"
            onMouseEnter={() => setOpenDropdown('image')}
            onMouseLeave={() => setOpenDropdown(null)}
          >
            <span className="text-white cursor-pointer py-2 block hover:text-primary transition-colors">
              圖片工具
            </span>
            <ul className={`absolute top-full left-0 bg-gray-800 min-w-[200px] list-none p-2 rounded shadow-xl
              ${openDropdown === 'image' ? 'block' : 'hidden'} group-hover:block`}>
              <li>
                <Link
                  to="/image-tools/compress"
                  className="block py-3 px-4 text-white no-underline rounded hover:bg-primary transition-colors"
                >
                  圖片壓縮
                </Link>
              </li>
              <li>
                <Link
                  to="/image-tools/convert"
                  className="block py-3 px-4 text-white no-underline rounded hover:bg-primary transition-colors"
                >
                  圖片轉檔
                </Link>
              </li>
              <li>
                <Link
                  to="/image-tools/crop"
                  className="block py-3 px-4 text-white no-underline rounded hover:bg-primary transition-colors"
                >
                  圖片裁切
                </Link>
              </li>
            </ul>
          </li>

          <li
            className="relative group"
            onMouseEnter={() => setOpenDropdown('document')}
            onMouseLeave={() => setOpenDropdown(null)}
          >
            <span className="text-white cursor-pointer py-2 block hover:text-primary transition-colors">
              文件工具
            </span>
            <ul className={`absolute top-full left-0 bg-gray-800 min-w-[200px] list-none p-2 rounded shadow-xl
              ${openDropdown === 'document' ? 'block' : 'hidden'} group-hover:block`}>
              <li>
                <Link
                  to="/document-tools/word-to-pdf"
                  className="block py-3 px-4 text-white no-underline rounded hover:bg-primary transition-colors"
                >
                  Word 轉 PDF
                </Link>
              </li>
              <li>
                <Link
                  to="/document-tools/excel-to-csv"
                  className="block py-3 px-4 text-white no-underline rounded hover:bg-primary transition-colors"
                >
                  Excel 轉 CSV
                </Link>
              </li>
            </ul>
          </li>

          <li
            className="relative group"
            onMouseEnter={() => setOpenDropdown('other')}
            onMouseLeave={() => setOpenDropdown(null)}
          >
            <span className="text-white cursor-pointer py-2 block hover:text-primary transition-colors">
              其他工具
            </span>
            <ul className={`absolute top-full left-0 bg-gray-800 min-w-[200px] list-none p-2 rounded shadow-xl
              ${openDropdown === 'other' ? 'block' : 'hidden'} group-hover:block`}>
              <li>
                <Link
                  to="/other-tools/json-formatter"
                  className="block py-3 px-4 text-white no-underline rounded hover:bg-primary transition-colors"
                >
                  JSON 格式化
                </Link>
              </li>
              <li>
                <Link
                  to="/other-tools/base64"
                  className="block py-3 px-4 text-white no-underline rounded hover:bg-primary transition-colors"
                >
                  Base64 編碼/解碼
                </Link>
              </li>
              <li>
                <Link
                  to="/other-tools/qr-code"
                  className="block py-3 px-4 text-white no-underline rounded hover:bg-primary transition-colors"
                >
                  QR Code 生成器
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navigation
