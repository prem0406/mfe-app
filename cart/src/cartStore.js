import { EVENTS, emit, on } from "./events";

let items = [];
const listeners = new Set();

function publish() {
  listeners.forEach((l) => l()); // notify this MFE's React components
  emit(EVENTS.CART_UPDATED, { items }); // notify other MFEs
}

on(EVENTS.ADD_TO_CART, (product) => {
  const existing = items.find((i) => i.id === product.id);
  items = existing
    ? items.map((i) => (i.id === product.id ? { ...i, qty: i.qty + 1 } : i))
    : [...items, { ...product, qty: 1 }];
  publish();
});

on(EVENTS.CART_REQUEST, publish); // late joiners can ask for current state
on(EVENTS.ORDER_PLACED, () => {
  items = [];
  publish();
});

export const getItems = () => items;
export const subscribe = (l) => {
  listeners.add(l);
  return () => listeners.delete(l);
};
