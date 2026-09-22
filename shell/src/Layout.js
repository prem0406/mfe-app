import { Routes, Route, Link } from "react-router-dom";
import Remote from "./Remote";
import { useAuth } from "./auth/AuthContext";
import Login from "./auth/Login";
import ProtectedRoute from "./auth/ProtectedRoute";

const loadProducts = () => import("products/Products");
const loadCart = () => import("cart/Cart");
const loadCheckout = () => import("checkout/Checkout");
const loadCartBadge = () => import("cart/CartBadge");

export default function Layout() {
  const { user, logout, remoteAuth } = useAuth();
  const authProps = { auth: remoteAuth };

  return (
    <>
      <nav
        style={{
          display: "flex",
          gap: 16,
          padding: 16,
          background: "#111827",
          alignItems: "center",
        }}
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
        <Remote
          name="cart badge"
          loader={loadCartBadge}
          loading={null}
          fallback={() => <span style={{ color: "#9ca3af" }}>🛒 –</span>}
        />
        <span style={{ marginLeft: "auto", color: "#fff" }}>
          {user ? (
            <>
              👤 {user.name} <button onClick={logout}>Logout</button>
            </>
          ) : (
            <Link to="/login" style={{ color: "#fff" }}>
              Login
            </Link>
          )}
        </span>
      </nav>

      <main style={{ padding: 16 }}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <Remote
                name="products"
                loader={loadProducts}
                componentProps={authProps}
              />
            }
          />
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Remote
                  name="cart"
                  loader={loadCart}
                  componentProps={authProps}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <Remote
                  name="checkout"
                  loader={loadCheckout}
                  componentProps={authProps}
                />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </>
  );
}
