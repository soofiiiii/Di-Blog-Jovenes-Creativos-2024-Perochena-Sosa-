import React, {createContext, useState, useEffect, Children} from "react";
import {loginUser, registerUser, logoutUser, isAuthenticated, getCurrentUser} from '../services/api'

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuth, setIsAuth] = useState(isAuthenticated());

  useEffect(() => {
    if (isAuth) {
      const currentUser = getCurrentUser();
      setUser(currentUser);
    }
  }, [isAuth]);

  const login = async (email, password) => {
    try {
      const { user, token } = await loginUser(email, password);
      setUser(user);
      setIsAuth(true);
      return true; // Devuelve "true" al frontend
    } catch (error) {
      console.error("Error en el login:", error);
      return false; // Devuelve "false" en caso de error
    }
  };

  const register = async (name, email, password) => {
    try {
      const { user, token } = await registerUser({ name, email, password });
      setUser(user);
      setIsAuth(true);
      return true;
    } catch (error) {
      console.error("Error en el registro:", error);
      return false;
    }
  };


  const logout = () => {
    logoutUser();
    setUser(null);
    setIsAuth(false);
  }

  return (
    <AuthContext.Provider value={{ user, isAuth, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;