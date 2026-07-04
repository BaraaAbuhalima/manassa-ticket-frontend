import { BrowserRouter, Route, Routes } from 'react-router-dom'
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

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
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
