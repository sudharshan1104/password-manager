import { useState, createContext, useContext } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [superUser, setSuperUser] = useState(null);

  const login = (user) => {
    setSuperUser(user);
  };

  const logout = () => {
    setSuperUser(null);
  };

  return (
    <AuthContext.Provider value={{ superUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
