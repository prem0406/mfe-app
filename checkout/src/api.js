export async function placeOrder(items) {
  const res = await fetch("/api/orders", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "X-Requested-With": "fetch",
    },
    body: JSON.stringify({ items }),
  });

  if (res.status === 401) {
    window.dispatchEvent(new CustomEvent("auth:expired")); // the shell handles the redirect
    const err = new Error("Unauthorized");
    err.status = 401;
    throw err;
  }
  if (!res.ok) throw new Error("Order failed");
  return res.json();
}
