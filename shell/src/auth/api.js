export function api(path, options = {}) {
  return fetch(path, {
    credentials: "include", // sends the cookie; harmless when same-origin
    ...options,
    headers: {
      "Content-Type": "application/json",
      "X-Requested-With": "fetch", // the CSRF header the server requires
      ...options.headers,
    },
  });
}
