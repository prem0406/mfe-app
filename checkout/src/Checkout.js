import { useCartStore, selectTotal } from "cart/cartStore";

export default function Checkout() {
  const items = useCartStore((s) => s.items);
  const total = useCartStore(selectTotal);
  const clear = useCartStore((s) => s.clear);

  return (
    <div style={{ border: "2px dashed #dc2626", padding: 16, borderRadius: 8 }}>
      <h2>💳 Checkout MFE</h2>
      <p>
        {items.length} line item(s) — Total: ${total}
      </p>
      <input placeholder="Name" /> <input placeholder="Card number" />
      <button disabled={items.length === 0} onClick={clear}>
        Pay now
      </button>
    </div>
  );
}
