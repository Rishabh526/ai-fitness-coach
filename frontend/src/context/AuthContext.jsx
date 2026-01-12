import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // ✅ Restore tokens on page load
  useEffect(() => {
    const storedAccess = localStorage.getItem("access");
    const storedRefresh = localStorage.getItem("refresh");

    if (storedAccess && storedRefresh) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setAccessToken(storedAccess);
      setRefreshToken(storedRefresh);
      setIsAuthenticated(true);
    }
  }, []);

  // ✅ Login handler
  const login = (access, refresh) => {
    localStorage.setItem("access", access);
    localStorage.setItem("refresh", refresh);

    setAccessToken(access);
    setRefreshToken(refresh);
    setIsAuthenticated(true);
  };

  // ✅ Logout handler
  const logout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");

    setAccessToken(null);
    setRefreshToken(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        accessToken,
        refreshToken,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// ✅ Custom hook (important)
// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContext(AuthContext);
}

export default AuthContext