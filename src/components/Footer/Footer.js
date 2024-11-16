import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
      </div>
      <div className={styles.footerBottom}>
        <p>&copy; {new Date().getFullYear()} Di-Blog. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
