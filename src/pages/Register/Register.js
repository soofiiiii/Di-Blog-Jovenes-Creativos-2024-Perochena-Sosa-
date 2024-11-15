import React, { useState, useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import styles from './Register.module.css';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';

const Register = () => {

  // Estado para la búsqueda
  const [searchTerm, setSearchTerm] = useState('');

  // Definir el estado del menú
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const { register } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  

  // Validaciones
  const validateName = (name) => {
    if (!name) {
      return 'El campo de nombre no puede estar vacío.';
    }
    return '';
  };

  const validateEmail = (email) => {
    if (!email) {
      return 'El campo de correo electrónico no puede estar vacío.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      return 'Por favor, introduce un correo electrónico válido.';
    }
    return '';
  };

  const validatePassword = (password) => {
    if (!password) {
      return 'El campo de contraseña no puede estar vacío.';
    } else if (password.length < 6) {
      return 'La contraseña debe tener al menos 6 caracteres.';
    }
    return '';
  };

  const validateConfirmPassword = (password, confirmPassword) => {
    if (!confirmPassword) {
      return 'Por favor, confirma tu contraseña.';
    } else if (password !== confirmPassword) {
      return 'Las contraseñas no coinciden.';
    }
    return '';
  };

  // Manejar el registro
  const handleRegister = async () => {
    setIsSubmitting(true);

    // Validar antes de enviar
    const nameError = validateName(name);
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    const confirmPasswordError = validateConfirmPassword(password, confirmPassword);

    if (nameError || emailError || passwordError || confirmPasswordError) {
      setErrors({ name: nameError, email: emailError, password: passwordError, confirmPassword: confirmPasswordError });
      setIsSubmitting(false);
      return;
    }

    // Llamada a la función register del contexto
    const success = await register(name, email, password);
    if (!success) {
      setErrors({ general: "Credenciales incorrectas. Por favor, intenta de nuevo." });
    } else {
      console.log('Registro exitoso');
      navigate('/');
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

        <div className={styles.container}>
      <div className={styles.registerBox}>
        <h2 className={styles.title}>Registrarse</h2>
        <div className={styles.inputContainer}>
          <div className={styles.inputWrapper}>
            <FaUser className={styles.icon} />
            <input
              type="text"
              placeholder="Nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
            />
          </div>
          {errors.name && <p className={styles.errorMessage}>{errors.name}</p>}
        </div>
        <div className={styles.inputContainer}>
          <div className={styles.inputWrapper}>
            <FaEnvelope className={styles.icon} />
            <input
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              onChange={(e) => setPassword(e.target.value)}
              className={`${styles.input} ${errors.password ? styles.inputError : ''}`}
            />
          </div>
          {errors.password && <p className={styles.errorMessage}>{errors.password}</p>}
        </div>
        <div className={styles.inputContainer}>
          <div className={styles.inputWrapper}>
            <FaLock className={styles.icon} />
            <input
              type="password"
              placeholder="Confirmar contraseña"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`${styles.input} ${errors.confirmPassword ? styles.inputError : ''}`}
            />
          </div>
          {errors.confirmPassword && <p className={styles.errorMessage}>{errors.confirmPassword}</p>}
        </div>
        <button onClick={handleRegister} className={styles.button} disabled={isSubmitting}>
            Registrarse
          </button>
      </div>
    </div>
    </div>
  );
};

export default Register;
