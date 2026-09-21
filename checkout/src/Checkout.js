import { useCart } from "./useCart";

export default function Checkout() {
  const { status, items, clear, retry } = useCart();
  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <div style={{ border: "2px dashed #dc2626", padding: 16, borderRadius: 8 }}>
      <h2>💳 Checkout MFE</h2>

      {status === "loading" && <p>Loading your cart…</p>}

      {status === "unavailable" && (
        <div role="alert">
          <p>
            We can't load your cart right now, so checkout is paused. You
            haven't been charged.
          </p>
          <button onClick={retry}>Try again</button>
        </div>
      )}

      {status === "ready" && (
        <>
          <p>
            {items.length} line item(s) — Total: ${total}
          </p>
          <input placeholder="Name" /> <input placeholder="Card number" />
          <button disabled={items.length === 0} onClick={clear}>
            Pay now
          </button>
        </>
      )}
    </div>
  );
}
