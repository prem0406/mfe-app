import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { api } from "./api";

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

const emit = (name, detail) =>
  window.dispatchEvent(new CustomEvent(name, { detail }));

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // true until we've asked the server who we are

  // Restore the session on page load
  useEffect(() => {
    let cancelled = false;
    api("/api/auth/me")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => !cancelled && setUser(data?.user ?? null))
      .catch(() => !cancelled && setUser(null))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, []);

  const login = useCallback(async (username, password) => {
    const res = await api("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    });
    if (!res.ok)
      throw new Error(
        res.status === 401 ? "Invalid credentials" : "Login failed",
      );
    const { user } = await res.json();
    setUser(user);
    emit("auth:login", { userId: user.id });
  }, []);

  // Local cleanup, used when the server already ended the session (e.g. a 401)
  const clearSession = useCallback(() => {
    setUser(null);
    emit("auth:logout");
  }, []);

  const logout = useCallback(async () => {
    try {
      await api("/api/auth/logout", { method: "POST" });
    } finally {
      clearSession(); // clear the UI even if the network call fails
    }
  }, [clearSession]);

  // Remotes report a 401, and the shell decides what happens
  useEffect(() => {
    window.addEventListener("auth:expired", clearSession);
    return () => window.removeEventListener("auth:expired", clearSession);
  }, [clearSession]);

  const remoteAuth = useMemo(() => ({ user, logout }), [user, logout]);

  const value = useMemo(
    () => ({
      user,
      loading,
      isAuthenticated: !!user,
      login,
      logout,
      remoteAuth,
    }),
    [user, loading, login, logout, remoteAuth],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
