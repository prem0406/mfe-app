import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Remote from "./Remote";

const loadProducts = () => import("products/Products");
const loadCart = () => import("cart/Cart");
const loadCheckout = () => import("checkout/Checkout");
const loadCartBadge = () => import("cart/CartBadge");

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

        {/* Non-critical widget: fail quietly with a neutral placeholder */}
        <Remote
          name="cart badge"
          loader={loadCartBadge}
          loading={null}
          fallback={() => <span style={{ color: "#9ca3af" }}>🛒 –</span>}
        />
      </nav>

      <main style={{ padding: 16 }}>
        <Routes>
          <Route
            path="/"
            element={<Remote name="products" loader={loadProducts} />}
          />
          <Route
            path="/cart"
            element={<Remote name="cart" loader={loadCart} />}
          />
          <Route
            path="/checkout"
            element={<Remote name="checkout" loader={loadCheckout} />}
          />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
