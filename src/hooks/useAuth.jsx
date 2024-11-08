import { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useSessionStorage } from "./useStorage";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useSessionStorage("user", null);
  const navigate = useNavigate();
  const login = async (data, redirectURL = "/") => {
    setUser(data);
    navigate(redirectURL);
  };

  const logout = (shouldRedirect) => {
    setUser(null);
    shouldRedirect && navigate("/", { replace: true });
  };

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
    }),
    [user]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
