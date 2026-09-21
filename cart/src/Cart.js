import { useCartStore, selectTotal } from "./store/cartStore";

export default function Cart() {
  const items = useCartStore((s) => s.items);
  const total = useCartStore(selectTotal);

  return (
    <div style={{ border: "2px dashed #059669", padding: 16, borderRadius: 8 }}>
      <h2>🛒 Cart MFE</h2>
      {items.length === 0 && <p>Cart is empty</p>}
      {items.map((i) => (
        <p key={i.id}>
          {i.name} × {i.qty} — ${i.price * i.qty}
        </p>
      ))}
      <strong>Total: ${total}</strong>
    </div>
  );
}
