import { useCart } from "./useCart";

const PRODUCTS = [
  { id: 1, name: "Laptop", price: 999 },
  { id: 2, name: "Headphones", price: 199 },
  { id: 3, name: "Keyboard", price: 79 },
];

export default function Products({ auth }) {
  const { status, addItem, retry } = useCart();

  return (
    <div style={{ border: "2px dashed #4f46e5", padding: 16, borderRadius: 8 }}>
      <h2>🛍️ Products MFE</h2>
      <p>
        {auth?.user ? `Welcome back, ${auth.user.name}` : "Browsing as guest"}
      </p>

      {status === "unavailable" && (
        <p
          role="alert"
          style={{ background: "#fef3c7", padding: 8, borderRadius: 4 }}
        >
          The cart is temporarily unavailable. You can still browse.{" "}
          <button onClick={retry}>Retry</button>
        </p>
      )}

      <ul>
        {PRODUCTS.map((p) => (
          <li key={p.id}>
            {p.name} — ${p.price}{" "}
            <button
              disabled={status !== "ready"}
              title={status === "ready" ? "" : "Cart not available"}
              onClick={() => addItem(p)}
            >
              Add to cart
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
