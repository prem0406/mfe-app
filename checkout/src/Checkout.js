import { useState } from "react";
import { useCart } from "./useCart";
import { placeOrder } from "./api";

export default function Checkout({ auth }) {
  const { status, items, clear, retry } = useCart();
  const [message, setMessage] = useState(null);
  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);

  const pay = async () => {
    try {
      const { orderId } = await placeOrder(items); // fetch the token at call time
      clear();
      setMessage(`✅ Order #${orderId} placed for ${auth.user.name}`);
    } catch (err) {
      if (err.status !== 401) setMessage("Payment failed. Please try again."); // 401 is handled by the shell
    }
  };

  return (
    <div style={{ border: "2px dashed #dc2626", padding: 16, borderRadius: 8 }}>
      <h2>💳 Checkout MFE</h2>
      {message && <p role="status">{message}</p>}
      {status === "loading" && <p>Loading your cart…</p>}
      {status === "unavailable" && (
        <div role="alert">
          <p>We can't load your cart, so checkout is paused.</p>
          <button onClick={retry}>Try again</button>
        </div>
      )}
      {status === "ready" && (
        <>
          <p>
            {items.length} line item(s) — Total: ${total}
          </p>
          <button disabled={items.length === 0} onClick={pay}>
            Pay now
          </button>
        </>
      )}
    </div>
  );
}
