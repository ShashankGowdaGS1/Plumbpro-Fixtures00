import { Routes, Route } from "react-router-dom";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import HomePage from "@/pages/HomePage";
import ProductsPage from "@/pages/ProductsPage";
import OrderPage from "@/pages/OrderPage";
import AboutPage from "@/pages/AboutPage";

import AdminLogin from "@/pages/AdminLogin";
import AdminProducts from "@/pages/AdminProducts";
import AdminDashboard from "@/pages/AdminDashboard";
import AdminSales from "@/pages/AdminSales";

import AdminLayout from "@/layouts/AdminLayout";
import AdminRoute from "@/routes/AdminRoute";

const App = () => {
  return (
    <Routes>

      {/* ================= PUBLIC SITE ================= */}
      <Route
        path="/"
        element={
          <>
            <Navbar />
            <HomePage />
            <Footer />
          </>
        }
      />

      <Route
        path="/products"
        element={
          <>
            <Navbar />
            <ProductsPage />
            <Footer />
          </>
        }
      />

      {/* ✅ FIXED: use /orders */}
      <Route
        path="/orders"
        element={
          <>
            <Navbar />
            <OrderPage />
            <Footer />
          </>
        }
      />

      <Route
        path="/about"
        element={
          <>
            <Navbar />
            <AboutPage />
            <Footer />
          </>
        }
      />

      {/* ================= ADMIN LOGIN ================= */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* ================= ADMIN PANEL ================= */}
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminLayout />
          </AdminRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="products" element={<AdminProducts />} />
        <Route path="sales" element={<AdminSales />} />
      </Route>

    </Routes>
  );
};

export default App;