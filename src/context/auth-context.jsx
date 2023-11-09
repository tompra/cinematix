import React from "react";

export const authContext = React.createContext({});

// auth hook
export function useAuthCtx() {
  return React.useContext(authContext);
}

export function AuthProvider({ children }) {
  const storedUser = localStorage.getItem("user");
  const storedToken = localStorage.getItem("token");
  const initUser = storedUser ? JSON.parse(storedUser) : null;
  const initToken = storedToken ? storedToken : null;
  const [user, setUser] = React.useState(initUser);
  const [token, setToken] = React.useState(initToken);
  const [loading, setLoading] = React.useState(true);

  const onBoardUser = React.useCallback((user, token) => {
    setUser(user);
    setToken(token);
  }, []);

  const offloadUser = React.useCallback(() => {
    setUser(null);
    setToken(null);
  }, []);

  const value = React.useMemo(
    () => ({
      user,
      setUser,
      token,
      setToken,
      onBoardUser,
      offloadUser,
      loading,
      setLoading,
    }),
    [user, token, loading, onBoardUser, offloadUser]
  );

  return <authContext.Provider value={value}>{children}</authContext.Provider>;
}
