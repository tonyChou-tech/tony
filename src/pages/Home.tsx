import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import AdBanner from '../components/AdBanner'

function Home() {
  const { t } = useTranslation()

  const tools = {
    pdf: [
      { name: t('pdfTools.pdfToImage.title'), path: '/pdf-tools/pdf-to-image', desc: t('pdfTools.pdfToImage.description'), icon: '🖼️' },
      { name: t('pdfTools.mergePdf.title'), path: '/pdf-tools/merge-pdf', desc: t('pdfTools.mergePdf.description'), icon: '🔗' },
      { name: t('pdfTools.compressPdf.title'), path: '/pdf-tools/compress-pdf', desc: t('pdfTools.compressPdf.description'), icon: '📦' },
    ],
    image: [
      { name: t('imageTools.compress.title'), path: '/image-tools/compress', desc: t('imageTools.compress.description'), icon: '🗜️' },
      { name: t('imageTools.convert.title'), path: '/image-tools/convert', desc: t('imageTools.convert.description'), icon: '🔄' },
      { name: t('imageTools.crop.title'), path: '/image-tools/crop', desc: t('imageTools.crop.description'), icon: '✂️' },
    ],
    document: [
      { name: t('documentTools.excelToCsv.title'), path: '/document-tools/excel-to-csv', desc: t('documentTools.excelToCsv.description'), icon: '📊' },
    ],
    other: [
      { name: t('otherTools.jsonFormatter.title'), path: '/other-tools/json-formatter', desc: t('otherTools.jsonFormatter.description'), icon: '{ }' },
      { name: t('otherTools.base64.title'), path: '/other-tools/base64', desc: t('otherTools.base64.description'), icon: '🔐' },
      { name: t('otherTools.qrCode.title'), path: '/other-tools/qr-code', desc: t('otherTools.qrCode.description'), icon: '📱' },
    ],
  }

  const allCategories = [
    { id: 'pdf', title: t('pdfTools.category'), icon: '📄', tools: tools.pdf },
    { id: 'image', title: t('imageTools.category'), icon: '🖼️', tools: tools.image },
    { id: 'document', title: t('documentTools.category'), icon: '📝', tools: tools.document },
    { id: 'other', title: t('otherTools.category'), icon: '🛠️', tools: tools.other },
  ]

  return (
    <div className="min-h-screen bg-dark-bg">
      {/* Hero Section with Gradient Background */}
      <div className="relative overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-mesh opacity-50"></div>

        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `linear-gradient(rgba(196, 255, 14, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(196, 255, 14, 0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}></div>

        {/* Hero Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32 text-center">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-tight">
            <span className="block">{t('home.heroTitle')}</span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-12">
            {t('home.heroDescription')}
          </p>

          {/* Decorative Elements */}
          <div className="flex justify-center gap-4 flex-wrap">
            <div className="px-6 py-2 bg-primary/10 border border-primary/30 rounded-full text-primary text-sm font-medium">
              ✓ {t('common.processing').replace('...', '')} 快速
            </div>
            <div className="px-6 py-2 bg-primary/10 border border-primary/30 rounded-full text-primary text-sm font-medium">
              ✓ 隱私安全
            </div>
            <div className="px-6 py-2 bg-primary/10 border border-primary/30 rounded-full text-primary text-sm font-medium">
              ✓ 完全免費
            </div>
          </div>
        </div>
      </div>

      <AdBanner slot="top-banner" />

      {/* Tools Grid Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {allCategories.map((category, idx) => (
          <div key={category.id} className="mb-16">
            {/* Category Header */}
            <div className="flex items-center gap-4 mb-8">
              <div className="text-4xl">{category.icon}</div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white">
                {category.title}
              </h2>
              <div className="flex-1 h-px bg-gradient-to-r from-primary/50 to-transparent"></div>
            </div>

            {/* Tools Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {category.tools.map((tool) => (
                <Link
                  key={tool.path}
                  to={tool.path}
                  className="group relative bg-dark-surface hover:bg-dark-accent border border-gray-700 hover:border-primary/50 rounded-xl p-6 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/20"
                >
                  {/* Glow Effect on Hover */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/0 to-primary/0 group-hover:from-primary/5 group-hover:to-transparent transition-all duration-300"></div>

                  <div className="relative">
                    <div className="text-4xl mb-4">{tool.icon}</div>
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-primary transition-colors">
                      {tool.name}
                    </h3>
                    <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                      {tool.desc}
                    </p>

                    {/* Arrow Icon */}
                    <div className="mt-4 flex items-center text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-sm font-medium">開始使用</span>
                      <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Ad Banner between categories */}
            {idx === 0 && <div className="my-12"><AdBanner slot="middle-banner-1" /></div>}
            {idx === 2 && <div className="my-12"><AdBanner slot="middle-banner-2" /></div>}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home
