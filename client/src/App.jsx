import { Routes, Route } from 'react-router-dom'
import { NotificationProvider } from './context/Notification'
import Layout from './components/Layout'
import AdminLayout from './components/AdminLayout'
import Home from './pages/Home'
import Catalog from './pages/Catalog'
import OfferDetail from './pages/OfferDetail'
import About from './pages/About'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import PaymentSuccess from './pages/PaymentSuccess'
import PaymentCancel from './pages/PaymentCancel'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import NewsDetail from './pages/NewsDetail'
import AdminDashboard from './pages/admin/Dashboard'
import AdminOffers from './pages/admin/Offers'
import AdminOfferForm from './pages/admin/OfferForm'
import AdminBookings from './pages/admin/Bookings'
import AdminUsers from './pages/admin/Users'
import AdminMessages from './pages/admin/Messages'
import AdminNews from './pages/admin/News'
import AdminReviews from './pages/admin/Reviews'
import AdminCategories from './pages/admin/Categories'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <NotificationProvider>
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/offres" element={<Catalog />} />
        <Route path="/offres/:slug" element={<OfferDetail />} />
        <Route path="/a-propos" element={<About />} />
        <Route path="/connexion" element={<Login />} />
        <Route path="/inscription" element={<Register />} />
        <Route path="/mon-compte" element={<Dashboard />} />
        <Route path="/paiement/succes" element={<PaymentSuccess />} />
        <Route path="/paiement/annule" element={<PaymentCancel />} />
        <Route path="/mot-de-passe-oublie" element={<ForgotPassword />} />
        <Route path="/reinitialisation" element={<ResetPassword />} />
        <Route path="/actualites/:slug" element={<NewsDetail />} />
      </Route>
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="offres" element={<AdminOffers />} />
        <Route path="offres/nouveau" element={<AdminOfferForm />} />
        <Route path="offres/:id" element={<AdminOfferForm />} />
        <Route path="reservations" element={<AdminBookings />} />
        <Route path="utilisateurs" element={<AdminUsers />} />
        <Route path="messages" element={<AdminMessages />} />
        <Route path="actualites" element={<AdminNews />} />
        <Route path="avis" element={<AdminReviews />} />
        <Route path="categories" element={<AdminCategories />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
    </NotificationProvider>
  )
}
