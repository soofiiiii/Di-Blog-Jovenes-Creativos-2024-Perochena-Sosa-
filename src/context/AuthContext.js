import React, { createContext, useEffect, useState } from 'react';
import { registerUser, loginUser } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);


// Al cargar el contexto, revisa si hay un token en localSotage
useEffect(() => {
  const userId = localStorage.getItem('userId');
  if (userId) {
    setUser({ id: userId });
  }
}, []);


// Función de login que guarda el token en localStorage tras un login exitoso
const login = async (credentials) => {
  const response = await loginUser(credentials.email, credentials.password);
  if (response) {
    const userId = response.id;

    // Guardar el id del usuario en localStorage para simular una sesión
    localStorage.setItem('userId', userId);
    setUser({ id: userId });
    return true;
  }
  return false;
};

// Función de registro para registrar al usuario y guardar el token
const register = async (userData) => {
  const response = await registerUser(userData);
  if (response) {
    const userId = response.id;
    localStorage.setItem('userId', userId);
    setUser({ id: userId });
    return true;
  }
  return false;
};

  // Función de logout que elimina el token de localStorage 
const logout = () => {
    localStorage.removeItem('userId');
    setUser(null);
  };

return (
  <AuthContext.Provider value={{ user, login, register, logout }}>
    {children}
  </AuthContext.Provider>
  );
};

export default AuthContext;
