export const EVENTS = {
  ADD_TO_CART: "cart:add",
  CART_UPDATED: "cart:updated",
  CART_REQUEST: "cart:request",
  ORDER_PLACED: "checkout:placed",
};

export const emit = (name, detail) =>
  window.dispatchEvent(new CustomEvent(name, { detail }));

// returns an unsubscribe function
export const on = (name, handler) => {
  const listener = (e) => handler(e.detail);
  window.addEventListener(name, listener);
  return () => window.removeEventListener(name, listener);
};
