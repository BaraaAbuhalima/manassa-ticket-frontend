import { useState } from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext'
import type { Language } from '../i18n/translations'

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `text-sm font-medium transition-colors hover:text-slate-900 ${isActive ? 'text-slate-900' : 'text-slate-500'}`

const mobileNavLinkClass = ({ isActive }: { isActive: boolean }) =>
  `block rounded-md px-3 py-2 text-base font-medium transition-colors ${
    isActive ? 'bg-slate-100 text-slate-900' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
  }`

function LanguageSwitcher({ language, setLanguage }: { language: Language; setLanguage: (l: Language) => void }) {
  return (
    <div className="flex items-center gap-1 text-xs font-medium">
      <button
        type="button"
        onClick={() => setLanguage('ar')}
        aria-pressed={language === 'ar'}
        className={language === 'ar' ? 'text-slate-900' : 'text-slate-400 hover:text-slate-700'}
      >
        عربي
      </button>
      <span className="text-slate-300">/</span>
      <button
        type="button"
        onClick={() => setLanguage('en')}
        aria-pressed={language === 'en'}
        className={language === 'en' ? 'text-slate-900' : 'text-slate-400 hover:text-slate-700'}
      >
        EN
      </button>
    </div>
  )
}

export default function Layout() {
  const { t, language, setLanguage } = useLanguage()
  const [menuOpen, setMenuOpen] = useState(false)

  const navItems = [
    { to: '/', label: t('nav.home'), end: true },
    { to: '/find', label: t('nav.findDate') },
    { to: '/browse', label: t('nav.browse') },
    { to: '/sell', label: t('nav.sell') },
    { to: '/subscribe', label: t('nav.subscribe') },
    { to: '/manage-ticket', label: t('nav.manageTicket') },
    { to: '/contact', label: t('nav.contact') },
  ]

  // Policy is deliberately left out of the header nav (it's not a primary action) but still
  // needs to be reachable, so it's appended only to the footer link list.
  const footerNavItems = [...navItems, { to: '/policy', label: t('nav.policy'), end: false }]

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
          <NavLink
            to="/"
            className="flex items-center gap-2 text-base font-semibold text-slate-900 sm:text-lg"
            onClick={() => setMenuOpen(false)}
          >
            <img src="/favicon.svg" alt="" className="h-7 w-7" />
            Manassa Ticket Exchange
          </NavLink>

          <nav className="hidden items-center gap-6 sm:flex">
            {navItems.map((item) => (
              <NavLink key={item.to} to={item.to} end={item.end} className={navLinkClass}>
                {item.label}
              </NavLink>
            ))}
            <LanguageSwitcher language={language} setLanguage={setLanguage} />
          </nav>

          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md p-2 text-slate-600 hover:bg-slate-100 sm:hidden"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {menuOpen && (
          <nav className="border-t border-slate-200 px-4 py-3 sm:hidden">
            <div className="flex flex-col gap-1">
              {navItems.map((item) => (
                <NavLink key={item.to} to={item.to} end={item.end} className={mobileNavLinkClass} onClick={() => setMenuOpen(false)}>
                  {item.label}
                </NavLink>
              ))}
            </div>
            <div className="mt-3 border-t border-slate-100 px-3 pt-3">
              <LanguageSwitcher language={language} setLanguage={setLanguage} />
            </div>
          </nav>
        )}
      </header>
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8">
        <Outlet />
      </main>
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-5xl flex-col gap-8 px-4 py-10 sm:flex-row sm:justify-between">
          <div className="text-start">
            <p className="flex items-center gap-2 text-base font-semibold text-slate-900">
              <img src="/favicon.svg" alt="" className="h-6 w-6" />
              Manassa Ticket Exchange
            </p>
            <p className="mt-2 max-w-xs text-sm text-slate-500">{t('footer.tagline')}</p>
            <a
              href="mailto:support@manassaticket.com"
              className="mt-3 inline-flex items-center gap-1.5 text-sm text-slate-500 transition-colors hover:text-slate-900"
            >
              <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 6.75c0-.621.504-1.125 1.125-1.125h17.25c.621 0 1.125.504 1.125 1.125v10.5c0 .621-.504 1.125-1.125 1.125H3.375a1.125 1.125 0 0 1-1.125-1.125V6.75Z"
                />
                <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 7 8.25 6 8.25-6" />
              </svg>
              support@manassaticket.com
            </a>
          </div>

          <nav className="flex flex-col gap-2 text-start">
            {footerNavItems.map((item) => (
              <Link key={item.to} to={item.to} className="text-sm text-slate-500 transition-colors hover:text-slate-900">
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="border-t border-slate-100">
          <div className="mx-auto max-w-5xl px-4 py-4 text-center text-xs text-slate-400">
            {t('footer.copyright', { year: new Date().getFullYear() })}
          </div>
        </div>
      </footer>
    </div>
  )
}
