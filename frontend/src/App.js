import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ScrollToTop from './ScrollToTop';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CartPage from './pages/CartPage';
import ProductsPage from './pages/ProductsPage';
import ProductPage from './pages/ProductPage';
import ContactPage from './pages/ContactPage';
import AboutPage from './pages/AboutPage';
// Toast alerts
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from './components/Sidebar/Sidebar';
import OrderHistory from './pages/OrderHistory';
import ProfilePage from './pages/ProfilePage';
import PlaceOrderScreen from './pages/PlaceOrderScreen';
import PaymentMethodPage from './pages/PaymentMethodPage';
import ShippingAddressPage from './pages/ShippingAddressPage';
import DashboardPage from './pages/DashboardPage';
import ProductListPage from './pages/ProductListPage';
import ProtRoute from './components/ProtRoute';
import AdminRoute from './components/AdminRoute';
import PrivacyPolicy from './pages/privacies/PrivacyPolicy';
import TermsConditions from './pages/privacies/TermsConditions';
import ShippingPolicy from './pages/privacies/ShippingPolicy';
import ReturnPolicy from './pages/privacies/ReturnPolicy';
import CreateProductPage from './pages/CreateProductPage';
import EditProductPage from './pages/EditProductPage';
import OrderPage from './pages/OrderPage';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <Router>
      <Sidebar isOpen={isOpen} toggle={toggle} />
      <Navbar toggle={toggle} />
      <ScrollToTop />
      <ToastContainer position="top-center" limit={1} />
      <main>
        <Routes>
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsConditions />} />
          <Route path="/shipping-policy" element={<ShippingPolicy />} />
          <Route path="/return" element={<ReturnPolicy />} />

          <Route path="/about" element={<AboutPage />} />
          <Route
            path="/order-history"
            element={
              <ProtRoute>
                <OrderHistory />
              </ProtRoute>
            }
          />

          <Route
            path="/order/:id"
            element={
              <ProtRoute>
                <OrderPage />
              </ProtRoute>
            }
          />
          <Route path="/placeorder" element={<PlaceOrderScreen />} />
          <Route path="/payment" element={<PaymentMethodPage />} />
          <Route path="/shipping" element={<ShippingAddressPage />} />
          <Route
            path="/profile"
            element={
              <ProtRoute>
                <ProfilePage />
              </ProtRoute>
            }
          />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/product/:slug" element={<ProductPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          {/* admin routes */}

          <Route
            path="/admin/dashboard"
            element={
              <AdminRoute>
                <DashboardPage />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/product/:id"
            element={
              <AdminRoute>
                <EditProductPage />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/product-create"
            element={
              <AdminRoute>
                <CreateProductPage />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/products"
            element={
              <AdminRoute>
                <ProductListPage />
              </AdminRoute>
            }
          />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
