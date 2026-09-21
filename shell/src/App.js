import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
const CartBadge = lazy(() => import("cart/CartBadge"));

// These imports resolve at runtime: "<remoteName>/<exposedName>"
const Products = lazy(() => import("products/Products"));
const Cart = lazy(() => import("cart/Cart"));
const Checkout = lazy(() => import("checkout/Checkout"));

export default function App() {
  return (
    <BrowserRouter>
      <nav
        style={{ display: "flex", gap: 16, padding: 16, background: "#111827" }}
      >
        <Link to="/" style={{ color: "#fff" }}>
          Products
        </Link>
        <Link to="/cart" style={{ color: "#fff" }}>
          Cart
        </Link>
        <Link to="/checkout" style={{ color: "#fff" }}>
          Checkout
        </Link>
        <Suspense fallback={null}>
          <CartBadge />
        </Suspense>
      </nav>

      <main style={{ padding: 16 }}>
        <Suspense fallback={<p>Loading micro frontend…</p>}>
          <Routes>
            <Route path="/" element={<Products />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </Suspense>
      </main>
    </BrowserRouter>
  );
}
