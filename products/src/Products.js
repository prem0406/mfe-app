import { useCartStore } from "cart/cartStore";

const items = [
  { id: 1, name: "Laptop", price: 999 },
  { id: 2, name: "Headphones", price: 199 },
  { id: 3, name: "Keyboard", price: 79 },
];

export default function Products() {
  const addItem = useCartStore((s) => s.addItem);

  return (
    <div style={{ border: "2px dashed #4f46e5", padding: 16, borderRadius: 8 }}>
      <h2>🛍️ Products MFE</h2>
      <ul>
        {items.map((p) => (
          <li key={p.id}>
            {p.name} — ${p.price}{" "}
            <button onClick={() => addItem(p)}>Add to cart</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
