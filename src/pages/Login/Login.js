import React, { useState, useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';
import { FaUser, FaLock } from 'react-icons/fa'; // Importar iconos

const Login = () => {

  // Estado para la búsqueda
  const [searchTerm, setSearchTerm] = useState('');

  // Definir el estado del menú
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Definir los estados necesarios para el login
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

   // Validación de email
   const validateEmail = (email) => {
    if (!email) {
      return 'El campo de correo electrónico no puede estar vacío.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      return 'Por favor, introduce un correo electrónico válido.';
    } else {
      return '';
    }
  };

  // Validación de contraseña
  const validatePassword = (password) => {
    if (!password) {
      return 'El campo de contraseña no puede estar vacío.';
    } else if (password.length < 6) {
      return 'La contraseña debe tener al menos 6 caracteres.';
    } else {
      return '';
    }
  };

  // Manejar cambios en el email
  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    setErrors((prevErrors) => ({
      ...prevErrors,
      email: validateEmail(newEmail),
    }));
  };

  // Manejar cambios en la contraseña
  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setErrors((prevErrors) => ({
      ...prevErrors,
      password: validatePassword(newPassword),
    }));
  };

  // Manejar el envío del formulario de login
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

  // Validar antes de enviar
  const emailError = validateEmail(email);
  const passwordError = validatePassword(password);
  if (emailError || passwordError) {
    setErrors({ email: emailError, password: passwordError });
    setIsSubmitting(false);
    return;
  }

  // Intentar iniciar sesión usando el contexto de autenticación
  try {
    const success = await login(email, password);
    if (success) {
        navigate('/');
    }
} catch (error) {
    if (error.response && error.response.status === 404) {
        setErrors({ email: "Usuario no encontrado." });
    } else {
        alert("Error al conectar con el servidor.");
    }
}
  setIsSubmitting(false);
};


  return (
    <div>
      {/* Header */}
      <header className={styles.header}>
        <a href="/" className={styles.navTitle}>Di-Blog</a>
        <div className={styles.searchContainer}>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Buscar destinos, aventuras..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className={styles.searchButton}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" viewBox="0 0 16 16">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
            </svg>
          </button>
        </div>
        <nav className={styles.nav}>
          <button className={styles.hamburgerButton} onClick={toggleMenu}>
            ☰
          </button>
          <ul className={`${styles['nav-links']} ${isMenuOpen ? styles.showMenu : ''}`}>
            {['HOLA', 'BLOG DE VIAJE', 'DESTINOS', 'GUÍAS', 'SOBRE NOSOTROS'].map((link) => (
              <li key={link} onClick={() => setIsMenuOpen(false)}>
                {link}
              </li>
            ))}
          </ul>
        </nav>
      </header>

      {/* Login Section */}
      <div className={styles.container}>
        <form onSubmit={handleLogin} className={styles.loginBox} aria-labelledby="login-title">
          <h2 id="login-title" className={styles.title}>SIGN IN</h2>

          <div className={styles.inputContainer}>
            <div className={styles.inputWrapper}>
              <FaUser className={styles.icon} />
              <input
                type="email"
                placeholder="Correo electrónico"
                value={email}
                onChange={handleEmailChange}
                className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
              />
            </div>
            {errors.email && <p className={styles.errorMessage}>{errors.email}</p>}
          </div>

          <div className={styles.inputContainer}>
            <div className={styles.inputWrapper}>
              <FaLock className={styles.icon} />
              <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={handlePasswordChange}
                className={`${styles.input} ${errors.password ? styles.inputError : ''}`}
              />
            </div>
            {errors.password && <p className={styles.errorMessage}>{errors.password}</p>}
          </div>

          <div className={styles.checkboxContainer}>
            <input type="checkbox" id="remember-me" className={styles.checkbox} />
            <label htmlFor="remember-me">Remember me</label>
            <a href="/forgot-password" className={styles.link}>Forgot password?</a>
          </div>

          <button type="submit" className={styles.button} disabled={isSubmitting || errors.email || errors.password}>
            LOGIN
          </button>

          <div className={styles.footerLink}>
            <a href="/register">Create Account</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
