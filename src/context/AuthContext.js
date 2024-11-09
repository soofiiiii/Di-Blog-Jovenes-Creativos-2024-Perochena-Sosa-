import React, { createContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    try {
      // Aquí se hace la llamada a la API con `axios` o `fetch`
      const response = await fetch('https://6622071827fcd16fa6c8818c.mockapi.io/api/v1/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error('Error en el inicio de sesión', error);
      return false;
    }
  };

  const register = async (userData) => {
    // Lógica de registro (similar a `login`)
  };

  return (
    <AuthContext.Provider value={{ user, login, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
