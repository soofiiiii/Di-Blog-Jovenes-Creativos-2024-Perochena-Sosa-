import React, { useState, useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';
import { FaUser, FaLock } from 'react-icons/fa'; // Importar iconos
import Header from '../../components/Header/Header';


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

  // Validación de email con regex robusto
  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email) {
      return 'El campo de correo electrónico no puede estar vacío.';
    } else if (!regex.test(email)) {
      return 'Por favor, introduce un correo electrónico válido.';
    }
    return '';
  };

  // Validación de contraseña
  const validatePassword = (password) => {
    if (!password) {
      return 'El campo de contraseña no puede estar vacío.';
    } else if (password.length < 6) {
      return 'La contraseña debe tener al menos 6 caracteres.';
    }
    return '';
  };

  // Manejar cambios de entrada centralizados
  const handleInputChange = (e, field) => {
    const value = e.target.value;
    if (field === 'email') {
      setEmail(value);
      setErrors((prevErrors) => ({ ...prevErrors, email: validateEmail(value) }));
    } else if (field === 'password') {
      setPassword(value);
      setErrors((prevErrors) => ({ ...prevErrors, password: validatePassword(value) }));
    }
  };

  // Envío del formulario
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    if (emailError || passwordError) {
      setErrors({ email: emailError, password: passwordError });
      setIsSubmitting(false);
      return;
    }

    try {
      const success = await login(email, password);
      if (success) {
        navigate('/');
      } else {
        setErrors({ email: 'Credenciales incorrectas.', password: '' });
      }
    } catch (error) {
      setErrors({
        email: '',
        password: 'Error al conectar con el servidor. Por favor, intenta más tarde.',
      });
    }
    setIsSubmitting(false);
  };

  return (
    <div className={styles.containerLogin}>
    {/* Header Importado */}
    <Header />
      

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
                onChange={(e) => handleInputChange(e, 'email')} // Actualizado aquí
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
                onChange={(e) => handleInputChange(e, 'password')} // Actualizado aquí
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
