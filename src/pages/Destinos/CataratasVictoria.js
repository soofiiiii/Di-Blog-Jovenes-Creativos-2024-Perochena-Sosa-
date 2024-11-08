import React, { useState, useEffect } from 'react';
import styles from '../../styles/DestinoPage.module.css'; // Archivo CSS común para todos los destinos

// Importa la imagen principal
import mainImage from '../../assets/image3.jpg';

const CataratasVictoria = () => {

      // Estado para la búsqueda
  const [searchTerm, setSearchTerm] = useState('');

  // Definir el estado del menú
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Desplazar hacia arriba cuando se monta el componente
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles.container}>
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

      {/* Contenedor principal */}
      <div className={styles.mainContent}>
        {/* Sección del blog (imagen y descripción) */}
        <section className={styles.blogSection}>
          <img src={mainImage} alt="Cataratas Victoria" className={styles.mainImage} />
          <p className={styles.destinationDescription}>
            Las Cataratas Victoria, conocidas localmente como "El Humo que Truena", son una experiencia que hay que vivir al menos una vez en la vida. Mi viaje a estas cascadas impresionantes fue una mezcla de adrenalina y conexión pura con la naturaleza.
            <br /><br />
            La primera vista de las cataratas fue absolutamente asombrosa. El ruido ensordecedor del agua cayendo me hizo sentir pequeño ante la majestuosidad de la naturaleza. Mientras caminaba por el sendero que rodea las cataratas, la bruma mojaba mi rostro, algo que era a la vez refrescante y emocionante. La cantidad de agua cayendo con una fuerza tan imponente crea un espectáculo visual único, una escena que parece sacada de un cuento de hadas.
            <br /><br />
            Uno de los momentos más memorables del viaje fue caminar por el Puente de la Bruma, donde literalmente me empapé con el rocío que sale de la cascada. Fue increíble sentir la fuerza de la naturaleza de esa forma tan visceral. Cada paso en el puente hacía que la emoción aumentara, y a pesar de terminar completamente mojado, fue uno de los mejores momentos de mi vida.
            <br /><br />
            Además de admirar las cataratas desde varios puntos panorámicos, tuve la oportunidad de hacer un paseo en helicóptero para verlas desde arriba. La vista aérea de las Cataratas Victoria es absolutamente impresionante. Desde el cielo, la extensión del agua y la forma en que caen las cataratas parecen aún más imponentes, mostrando lo pequeñas que son las obras humanas en comparación con la naturaleza.
            <br /><br />
            Después del paseo en helicóptero, disfruté de un tranquilo crucero por el río Zambeze. El contraste entre la adrenalina de las cascadas y la serenidad del río fue perfecto. Pudimos ver hipopótamos y cocodrilos mientras el sol se escondía detrás del horizonte, pintando el cielo con tonos naranjas y púrpuras. Terminé el día sintiendo que había sido testigo de algo realmente extraordinario, algo que las palabras apenas pueden describir.
            <br /><br />
            Recomiendo a cualquier amante de la naturaleza y la aventura que visite las Cataratas Victoria. No solo por la magnitud y la belleza de las cascadas, sino por la energía que el lugar transmite. Es un recordatorio de la increíble belleza del planeta que habitamos y de la importancia de conectarnos con estos paisajes naturales.
          </p>
        </section>

        {/* Sección de comentarios */}
        <section className={styles.commentsSection}>
          <h2 className={styles.commentsTitle}>121 comments</h2>
          <button className={styles.signOutButton}>Sign Out</button>
          <div className={styles.commentsSorting}>
            <p>Sort By Newest</p>
            <p>Kyle Lawrence</p>
          </div>
          <div className={styles.commentInput}>
            <input type="text" placeholder="Add a comment..." className={styles.commentBox} />
            <button className={styles.postButton}>Post</button>
          </div>

          {/* Lista de comentarios */}
          <div className={styles.commentsList}>
            <div className={styles.comment}>
              <p className={styles.commentUser}><strong>Mark Hamilton</strong> <span className={styles.commentTime}>· 1h</span></p>
              <p className={styles.commentText}>
                comentario de relleno 1.
              </p>
            </div>
            <div className={styles.comment}>
              <p className={styles.commentUser}><strong>Lauren Thomas</strong></p>
              <p className={styles.commentText}>
                comentario de relleno 2.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CataratasVictoria;
