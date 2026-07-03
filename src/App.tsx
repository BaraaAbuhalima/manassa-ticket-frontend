import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import BrowsePage from './pages/BrowsePage'
import TicketDetailPage from './pages/TicketDetailPage'
import CheckoutPage from './pages/CheckoutPage'
import SellPage from './pages/SellPage'
import SubscribePage from './pages/SubscribePage'
import NotFoundPage from './pages/NotFoundPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="browse" element={<BrowsePage />} />
          <Route path="tickets/:id" element={<TicketDetailPage />} />
          <Route path="checkout/:id" element={<CheckoutPage />} />
          <Route path="sell" element={<SellPage />} />
          <Route path="subscribe" element={<SubscribePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
