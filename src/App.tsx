import { useEffect, useRef } from 'react'
import { BrowserRouter, Route, Routes, useSearchParams } from 'react-router-dom'
import { normalizeLanguage, useLanguage } from './i18n/LanguageContext'
import type { Language } from './i18n/translations'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import BrowsePage from './pages/BrowsePage'
import FindDatePage from './pages/FindDatePage'
import TicketDetailPage from './pages/TicketDetailPage'
import CheckoutPage from './pages/CheckoutPage'
import SellPage from './pages/SellPage'
import SubscribePage from './pages/SubscribePage'
import ManageTicketPage from './pages/ManageTicketPage'
import ContactPage from './pages/ContactPage'
import NotFoundPage from './pages/NotFoundPage'

// Keeps the active language and a ?lang=en / ?lang=ar query parameter in sync,
// making the URL the source of truth so links can force (and always carry) a language.
function LanguageUrlSync() {
  const [searchParams, setSearchParams] = useSearchParams()
  const { language, setLanguage } = useLanguage()
  const lastSynced = useRef<Language | null>(null)

  useEffect(() => {
    const urlLang = normalizeLanguage(searchParams.get('lang'))

    // URL -> state: adopt a ?lang= we didn't just write (shared link, back/forward nav).
    if (urlLang && urlLang !== language && urlLang !== lastSynced.current) {
      setLanguage(urlLang)
      lastSynced.current = urlLang
      return
    }

    // state -> URL: keep ?lang= present and correct after a toggle or a navigation
    // that dropped the parameter. Other query params are preserved.
    if (urlLang !== language) {
      const next = new URLSearchParams(searchParams)
      next.set('lang', language)
      setSearchParams(next, { replace: true })
    }
    lastSynced.current = language
  }, [searchParams, language, setLanguage, setSearchParams])

  return null
}

export default function App() {
  return (
    <BrowserRouter>
      <LanguageUrlSync />
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="home" element={<HomePage />} />
          <Route path="find" element={<FindDatePage />} />
          <Route path="browse" element={<BrowsePage />} />
          <Route path="tickets/:id" element={<TicketDetailPage />} />
          <Route path="checkout/:id" element={<CheckoutPage />} />
          <Route path="sell" element={<SellPage />} />
          <Route path="subscribe" element={<SubscribePage />} />
          <Route path="manage-ticket" element={<ManageTicketPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
