import React, { useContext, useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import UserAvatar from '../UserAvatar/UserAvatar';
import styles from './Header.module.css';

const Header = () => {
  const { isAuth, user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const menuRef = useRef(null);

  // Estado para controlar el menú desplegable del avatar y el menú hamburguesa
  const [isAvatarMenuOpen, setIsAvatarMenuOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleAvatarMenu = () => {
    setIsAvatarMenuOpen(!isAvatarMenuOpen);
  };

  const toggleHamburgerMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Redirige al dashboard cuando se selecciona "Crear Destino"
  const handleCreateDestino = () => {
    navigate('/dashboard');
    setIsAvatarMenuOpen(false); // Opcional: Cerrar el menú después de la navegación
  };

  // Redirige a "Mis Destinos" cuando se selecciona esa opción
  const handleMyDestinations = () => {
    navigate('/mis-destinos');
    setIsAvatarMenuOpen(false); // Opcional: Cerrar el menú después de la navegación
  };

  // Cierra el menú del avatar si se hace clic fuera de él
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsAvatarMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.navTitle}>Di-Blog</Link>

      <nav className={styles.nav}>
        {/* Botón de menú hamburguesa para pantallas pequeñas */}
        <button className={styles.hamburgerButton} onClick={toggleHamburgerMenu}>
          ☰
        </button>

        {/* Enlaces de navegación */}
        <ul className={`${styles.navLinks} ${isMenuOpen ? styles.showMenu : ''}`}>
          
          <li onClick={toggleHamburgerMenu}>
          <Link to="/destinos">DESTINOS</Link>
          </li>
          
          <li onClick={toggleHamburgerMenu}>
            <Link to="/sobre-nosotros">SOBRE NOSOTROS</Link>
          </li>
        </ul>

         {/* Icono de usuario o enlaces de autenticación */}
         {isAuth ? (
          <div className={styles.avatarContainer} ref={menuRef}>
            <UserAvatar onClick={toggleAvatarMenu} className={styles.avatarIcon} />
            {isAvatarMenuOpen && (
              <div className={styles.dropdownMenu}>
                <button className={styles.closeButton} onClick={toggleAvatarMenu}>✕</button>
                <p>AJUSTES <span className={styles.arrow}>›</span></p>
                <p onClick={handleMyDestinations}>MIS DESTINOS <span className={styles.arrow}>›</span></p>
                <p onClick={handleCreateDestino}>CREAR DESTINO <span className={styles.arrow}>›</span></p>
                <p>AMIGOS <span className={styles.arrow}>›</span></p>
                <button onClick={handleLogout} className={styles.logoutButton}>Cerrar Sesión</button>
              </div>
            )}
          </div>
        ) : (
          <div className={styles.authLinks}>
            <Link to="/login" className={styles.authLink}>INICIO SESIÓN</Link>
            <Link to="/register" className={styles.authLink}>REGISTRARSE</Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
