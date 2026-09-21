import { useEffect, useState } from "react";
import { EVENTS, emit, on } from "./events";

export default function Checkout() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const off = on(EVENTS.CART_UPDATED, ({ items }) => setItems(items));
    emit(EVENTS.CART_REQUEST); // subscribe FIRST, then ask for current state
    return off; // cleanup on unmount
  }, []);

  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <div style={{ border: "2px dashed #dc2626", padding: 16, borderRadius: 8 }}>
      <h2>💳 Checkout MFE</h2>
      <p>
        {items.length} line item(s) — Total: ${total}
      </p>
      <input placeholder="Name" /> <input placeholder="Card number" />
      <button
        disabled={items.length === 0}
        onClick={() => emit(EVENTS.ORDER_PLACED, { total })}
      >
        Pay now
      </button>
    </div>
  );
}
