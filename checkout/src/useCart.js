import { useCallback, useEffect, useState } from "react";

const TIMEOUT_MS = 5000;
let storePromise = null; // cached so every component shares one load attempt

function withTimeout(promise, ms) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(
      () => reject(new Error(`cart remote timed out after ${ms}ms`)),
      ms,
    );
    promise.then(
      (v) => {
        clearTimeout(timer);
        resolve(v);
      },
      (e) => {
        clearTimeout(timer);
        reject(e);
      },
    );
  });
}

function loadCartStore() {
  if (!storePromise) {
    storePromise = withTimeout(import("cart/cartStore"), TIMEOUT_MS)
      .then((m) => m.useCartStore)
      .catch((err) => {
        storePromise = null; // don't cache failures, so retry can try again
        throw err;
      });
  }
  return storePromise;
}

export function useCart() {
  const [state, setState] = useState({ status: "loading", items: [] });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let cancelled = false;
    let unsubscribe = () => {};

    setState((s) =>
      s.status === "loading" ? s : { status: "loading", items: [] },
    );

    loadCartStore()
      .then((store) => {
        if (cancelled) return;
        // A Zustand hook also exposes getState/subscribe, so no conditional hook call is needed
        const sync = () => {
          const { items, addItem, clear } = store.getState();
          setState({ status: "ready", items, addItem, clear });
        };
        sync();
        unsubscribe = store.subscribe(sync);
      })
      .catch((error) => {
        if (!cancelled) setState({ status: "unavailable", items: [], error });
      });

    return () => {
      cancelled = true;
      unsubscribe();
    };
  }, [attempt]);

  const retry = useCallback(() => setAttempt((a) => a + 1), []);
  return { ...state, retry };
}
