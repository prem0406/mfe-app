import { useSyncExternalStore } from "react";
import { getItems, subscribe } from "./cartStore";

export default function CartBadge() {
  const items = useSyncExternalStore(subscribe, getItems);
  const count = items.reduce((n, i) => n + i.qty, 0);
  return <span style={{ color: "#fff" }}>🛒 {count}</span>;
}
