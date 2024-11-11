import axios from 'axios';

const API_BASE_URL = 'https://6622071827fcd16fa6c8818c.mockapi.io/api/v1';

// Función para registrar un usuario
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/users`, userData);
    // Devuelve el token o los datos de usuario, si está disponible en la respuesta
    return response.data; 
  } catch (error) {
    console.error('Error registrando usuario:', error);
    return null;
  }
};

// Función para iniciar sesión (verificar las credenciales)
export const loginUser = async (email, password) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users`, {
      params: {
        email,
        password,
      },
    });
    
    // Verifica si el usuario existe y devualve el primer usuario (mock)
    if (response.data.length > 0) {
      return response.data[0];
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    return null;
  }
};

// Obtener todos los usuarios
export const getUsers = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/users`);
    return await response.json();
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    return [];
  }
};

// Actualizar datos de usuario
export const updateUser = async (userId, updatedData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    });
    return await response.json();
  } catch (error) {
    console.error('Error al actualizar usuario:', error);
    return null;
  }
};

// Eliminar un usuario
export const deleteUser = async (userId) => {
  try {
    await fetch(`${API_BASE_URL}/users/${userId}`, {
      method: 'DELETE',
    });
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
  }
};
