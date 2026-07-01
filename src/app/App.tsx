import { BrowserRouter, Routes, Route } from "react-router";
import { Toaster } from "sonner";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { Layout } from "./components/Layout";
import { HomePage } from "./pages/HomePage";
import { DarshanSuchiPage } from "./pages/DarshanSuchiPage";
import { HowItWorksPage } from "./pages/HowItWorksPage";
import { StorePage } from "./pages/StorePage";
import { DownloadPage } from "./pages/DownloadPage";
import { LoginPage } from "./pages/LoginPage";
import { SignupPage } from "./pages/SignupPage";
import { CartPage } from "./pages/CartPage";

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Toaster position="top-center" richColors />
        <BrowserRouter>
          <Routes>
            {/* Standalone auth pages (no navbar/footer) */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />

            {/* Main app with shared layout */}
            <Route element={<Layout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/darshan-suchi" element={<DarshanSuchiPage />} />
              <Route path="/how-it-works" element={<HowItWorksPage />} />
              <Route path="/store" element={<StorePage />} />
              <Route path="/download" element={<DownloadPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="*" element={<HomePage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}
