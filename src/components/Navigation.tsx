import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import LanguageSwitcher from './LanguageSwitcher'

function Navigation() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState<string | null>(null)
  const { t } = useTranslation()

  // No need for click outside handler for inline menu
  // No need to prevent body scroll for inline menu

  const toggleMobileDropdown = (menu: string) => {
    setMobileDropdownOpen(mobileDropdownOpen === menu ? null : menu)
  }

  const closeMobileMenu = () => {
    setMobileMenuOpen(false)
    setMobileDropdownOpen(null)
  }

  const navItems = [
    {
      id: 'pdf',
      label: t('navigation.pdfTools'),
      items: [
        { to: '/pdf-tools/pdf-to-image', label: t('pdfTools.pdfToImage.title') },
        { to: '/pdf-tools/merge-pdf', label: t('pdfTools.mergePdf.title') },
        { to: '/pdf-tools/compress-pdf', label: t('pdfTools.compressPdf.title') },
      ],
    },
    {
      id: 'image',
      label: t('navigation.imageTools'),
      items: [
        { to: '/image-tools/compress', label: t('imageTools.compress.title') },
        { to: '/image-tools/convert', label: t('imageTools.convert.title') },
        { to: '/image-tools/crop', label: t('imageTools.crop.title') },
      ],
    },
    {
      id: 'document',
      label: t('navigation.documentTools'),
      items: [
        { to: '/document-tools/excel-to-csv', label: t('documentTools.excelToCsv.title') },
      ],
    },
    {
      id: 'other',
      label: t('navigation.otherTools'),
      items: [
        { to: '/other-tools/currency-converter', label: t('otherTools.currencyConverter.title') },
        { to: '/other-tools/json-formatter', label: t('otherTools.jsonFormatter.title') },
        { to: '/other-tools/base64', label: t('otherTools.base64.title') },
        { to: '/other-tools/qr-code', label: t('otherTools.qrCode.title') },
      ],
    },
  ]

  return (
    <nav className="bg-dark-bg/95 backdrop-blur-sm border-b border-gray-800 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          {/* Logo */}
          <Link
            to="/"
            className="text-lg sm:text-xl lg:text-2xl font-black text-primary hover:text-primary-hover transition-colors flex-shrink-0"
            onClick={closeMobileMenu}
          >
            {t('home.title')}
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden lg:flex gap-4 xl:gap-8 list-none m-0 p-0 items-center">
            {navItems.map((navItem) => (
              <li
                key={navItem.id}
                className="relative group"
                onMouseEnter={() => setOpenDropdown(navItem.id)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <span className="text-white cursor-pointer py-2 block hover:text-primary transition-colors text-sm xl:text-base">
                  {navItem.label}
                </span>
                <ul
                  className={`absolute top-full left-0 bg-dark-surface border border-gray-700 min-w-[200px] list-none p-2 rounded shadow-xl
                    ${openDropdown === navItem.id ? 'block' : 'hidden'} group-hover:block`}
                >
                  {navItem.items.map((item) => (
                    <li key={item.to}>
                      <Link
                        to={item.to}
                        className="block py-3 px-4 text-gray-200 no-underline rounded hover:bg-dark-accent hover:text-primary transition-colors text-sm"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
            <li>
              <LanguageSwitcher />
            </li>
          </ul>

          {/* Mobile Hamburger Button - More Visible */}
          <button
            className="hamburger-button lg:hidden flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 bg-dark-surface border border-primary/50 rounded-lg hover:bg-primary/10 hover:border-primary transition-all focus:outline-none focus:ring-2 focus:ring-primary shadow-lg"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                // X icon when menu is open
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  stroke="#c4ff0e"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                // Hamburger icon when menu is closed
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  stroke="#c4ff0e"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="mobile-menu lg:hidden bg-dark-bg border-t border-gray-800">
        <ul className="flex flex-col list-none m-0 p-0">
          {navItems.map((navItem) => (
            <li key={navItem.id} className="border-b border-gray-700">
              {/* Dropdown Header - min 44px touch target */}
              <button
                onClick={() => toggleMobileDropdown(navItem.id)}
                className="w-full flex items-center justify-between px-6 py-4 text-gray-200 hover:bg-dark-accent hover:text-primary transition-colors text-left min-h-[44px]"
              >
                <span className="text-base sm:text-lg font-medium">{navItem.label}</span>
                <svg
                  className={`w-5 h-5 transition-transform duration-200 ${
                    mobileDropdownOpen === navItem.id ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* Dropdown Items */}
              <ul
                className={`bg-dark-surface overflow-hidden transition-all duration-300 ease-in-out ${
                  mobileDropdownOpen === navItem.id ? 'max-h-screen' : 'max-h-0'
                }`}
              >
                {navItem.items.map((item) => (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      onClick={closeMobileMenu}
                      className="block py-4 px-8 text-gray-200 no-underline hover:bg-dark-accent hover:text-primary transition-colors min-h-[44px] flex items-center"
                    >
                      <span className="text-sm sm:text-base">{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}

          {/* Language Switcher at Bottom */}
          <li className="px-6 py-6 mt-4">
            <div className="flex justify-center">
              <LanguageSwitcher />
            </div>
          </li>
        </ul>
        </div>
      )}
    </nav>
  )
}

export default Navigation
