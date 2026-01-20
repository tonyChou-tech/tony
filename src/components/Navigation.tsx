import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import LanguageSwitcher from './LanguageSwitcher'

function Navigation() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState<string | null>(null)
  const { t } = useTranslation()

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (mobileMenuOpen && !target.closest('.mobile-menu') && !target.closest('.hamburger-button')) {
        setMobileMenuOpen(false)
        setMobileDropdownOpen(null)
      }
    }

    if (mobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [mobileMenuOpen])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [mobileMenuOpen])

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
        { to: '/pdf-tools/pdf-to-word', label: t('pdfTools.pdfToWord.title') },
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
        { to: '/document-tools/word-to-pdf', label: t('documentTools.wordToPdf.title') },
        { to: '/document-tools/excel-to-csv', label: t('documentTools.excelToCsv.title') },
      ],
    },
    {
      id: 'other',
      label: t('navigation.otherTools'),
      items: [
        { to: '/other-tools/json-formatter', label: t('otherTools.jsonFormatter.title') },
        { to: '/other-tools/base64', label: t('otherTools.base64.title') },
        { to: '/other-tools/qr-code', label: t('otherTools.qrCode.title') },
      ],
    },
  ]

  return (
    <nav className="bg-gray-900 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          {/* Logo */}
          <Link
            to="/"
            className="text-lg sm:text-xl lg:text-2xl font-bold text-primary hover:text-primary-hover transition-colors flex-shrink-0"
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
                  className={`absolute top-full left-0 bg-gray-800 min-w-[200px] list-none p-2 rounded shadow-xl
                    ${openDropdown === navItem.id ? 'block' : 'hidden'} group-hover:block`}
                >
                  {navItem.items.map((item) => (
                    <li key={item.to}>
                      <Link
                        to={item.to}
                        className="block py-3 px-4 text-white no-underline rounded hover:bg-primary transition-colors text-sm"
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

          {/* Mobile Hamburger Button */}
          <button
            className="hamburger-button lg:hidden p-2 text-white hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary rounded"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            <svg
              className="w-6 h-6 sm:w-7 sm:h-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                // X icon when menu is open
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                // Hamburger icon when menu is closed
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 lg:hidden ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        style={{ top: '56px' }}
      />

      {/* Mobile Menu */}
      <div
        className={`mobile-menu fixed top-14 sm:top-16 left-0 right-0 bottom-0 bg-gray-900 overflow-y-auto transition-transform duration-300 ease-in-out lg:hidden ${
          mobileMenuOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <ul className="flex flex-col list-none m-0 p-0">
          {navItems.map((navItem) => (
            <li key={navItem.id} className="border-b border-gray-800">
              {/* Dropdown Header - min 44px touch target */}
              <button
                onClick={() => toggleMobileDropdown(navItem.id)}
                className="w-full flex items-center justify-between px-6 py-4 text-white hover:bg-gray-800 transition-colors text-left min-h-[44px]"
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
                className={`bg-gray-800 overflow-hidden transition-all duration-300 ease-in-out ${
                  mobileDropdownOpen === navItem.id ? 'max-h-screen' : 'max-h-0'
                }`}
              >
                {navItem.items.map((item) => (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      onClick={closeMobileMenu}
                      className="block py-4 px-8 text-white no-underline hover:bg-gray-700 transition-colors min-h-[44px] flex items-center"
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
    </nav>
  )
}

export default Navigation
