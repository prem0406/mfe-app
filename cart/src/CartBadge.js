import { useCartStore, selectCount } from "./store/cartStore";

export default function CartBadge() {
  const count = useCartStore(selectCount);
  return <span style={{ color: "#fff" }}>🛒 {count}</span>;
}
