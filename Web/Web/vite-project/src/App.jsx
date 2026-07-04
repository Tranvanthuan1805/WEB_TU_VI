import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import FengShui from './pages/FengShui';
import PostList from './pages/PostList';
import PostDetail from './pages/PostDetail';
import ProductList from './pages/ProductList';
import Checkout from './pages/Checkout';
import VnpayReturn from './pages/VnpayReturn';
import Contact from './pages/Contact';
import Login from './pages/Login';
import AdminDashboard from './pages/admin/AdminDashboard';
import { PrivacyPolicy, TermsOfService, Disclaimer } from './pages/InfoPages';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="phong-thuy" element={<FengShui />} />
          <Route path="bai-viet" element={<PostList />} />
          <Route path="bai-viet/:slug" element={<PostDetail />} />
          <Route path="san-pham" element={<ProductList />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="vnpay-return" element={<VnpayReturn />} />
          <Route path="lien-he" element={<Contact />} />
          <Route path="chinh-sach-bao-mat" element={<PrivacyPolicy />} />
          <Route path="dieu-khoan-dich-vu" element={<TermsOfService />} />
          <Route path="mien-tru-trach-nhiem" element={<Disclaimer />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/admin/*" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
