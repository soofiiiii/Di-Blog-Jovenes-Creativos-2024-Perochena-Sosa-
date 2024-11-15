import axios from 'axios';
import bcrypt from 'bcryptjs';

const API_BASE_URL = 'https://6622071827fcd16fa6c8818c.mockapi.io/api/v1';
const secretKey = "x9!Jz5H@hTnR2bV7&Qc9P$kL";


// Función para generar el JWT
function generateJWT(payload){
  const header = {alg: "HS256", typ: "JWT"};
  const base64Header = btoa(JSON.stringify(header));
  const base64Payload = btoa(JSON.stringify(payload));
  const signature = btoa(base64Header + "." + base64Payload + secretKey);
  return `${base64Header}.${base64Payload}.${signature}`;
}

// Función para decodificar el JWT y verificar su validez
function decodeJWT(token){
  const [header, payload, signature] = token.split(".");
  const decodePayload = JSON.parse(atob(payload));

  const expectedSignature = btoa(header + "." + payload + secretKey);
  if (signature != expectedSignature) {
    throw new Error("Token no válido");
  }

  return decodePayload;
}

const fetchUserByEmail = async (email) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users?email=${email}`);
    return response.data[0]; // Toma el primer usuario si existe
  } catch (error) {
    console.error("Error obteniendo usuario:", error);
    throw error;
  }
};

// Función para registrar un usuario
export const registerUser = async (userData) => {
  try {
    if (!userData.email || !userData.password) {
      throw new Error('Correo electrónico y contraseña son obligatorios');
    }

    // Encriptar la contraseña antes de enciarla a la API
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userData.password, salt);

    const newUserData = {
      name: userData.name,
      email: userData.email,
      password: hashedPassword,
    };

    // Registrar el usuario en la API
    const response = await axios.post(`${API_BASE_URL}/users`, newUserData);

    // Generar un token JWT y almacenarlo en localStorage
    const token = generateJWT({ id: response.data.id, email: response.data.email });
    localStorage.setItem("authToken", token);

    return { ...response.data, token };

  } catch (error) {
    console.error('Error registrando usuario:', error.message);
    return null;
  }
};

// Función para iniciar sesión (verificar las credenciales)
export const loginUser = async (email, password) => {
  try {
    // Obtener el usuario desde la API
    const user = await fetchUserByEmail(email);
  
    if (!user) {
      throw new Error("Usuario no encontrado");
    }
  
    // Verificar la contraseña
    if (!user.password) {
      throw new Error("Contraseña no encontrada en el usuario");
    }
  
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      throw new Error("Email o Contraseña incorrectos");
    }
  
    // Generar un token JWT si la contraseña es correcta
    const token = generateJWT({ id: user.id, email: user.email });
  
    // Almacenar el token en LocalStorage
    localStorage.setItem("authToken", token);
  
    return { user, token };

  } catch (error) {
    console.error('Error iniciando sesión:', error.message);
    throw error;
  }
};

// Función para cerrar sesión
export const logoutUser = () => {
  localStorage.removeItem("authToken");
};

// Función para verificar si el usuario está autenticado
export const isAuthenticated = () => {
  const token = localStorage.getItem("authToken");
  if (!token) return false;

  try {
      decodeJWT(token); // intentar decodificar y verificar el token
      return true;
  } catch (error) {
      console.error("Token no válido:", error);
      logoutUser();
      return false;
  }
};

// Obtener la información del usuario actual desde el token almacenado
export const getCurrentUser = () => {
  const token = localStorage.getItem("authToken");
  if (!token) return null;

  try {
      const userData = decodeJWT(token);
      return userData;
  } catch (error) {
      console.error("Error al obtener el usuario:", error);
      return null;
  }
}



