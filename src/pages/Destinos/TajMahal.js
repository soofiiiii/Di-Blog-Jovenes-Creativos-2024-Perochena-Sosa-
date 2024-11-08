import React, { useState, useEffect } from 'react';
import styles from '../../styles/DestinoPage.module.css'; // Archivo CSS común para todos los destinos

// Importa la imagen principal
import mainImage from '../../assets/image2.jpg';

const TajMahal = () => {
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
          <img src={mainImage} alt="Taj Mahal" className={styles.mainImage} />
          <p className={styles.destinationDescription}>
            Visitar el Taj Mahal fue una de las experiencias más conmovedoras de mi vida. El viaje comenzó temprano en la mañana, cuando el sol apenas comenzaba a asomarse en el horizonte, pintando el cielo de tonos naranjas y dorados. Al llegar al complejo, me encontré frente a una vista que había visto miles de veces en fotografías, pero que, en persona, fue abrumadoramente hermosa.
            <br /><br />
            Al cruzar el gran portal de entrada, la primera visión del Taj Mahal me dejó sin palabras. El mármol blanco resplandeciente parecía brillar bajo los rayos del sol, reflejándose en el estanque que se extiende frente al mausoleo. La simetría perfecta del edificio y la delicadeza de los detalles es algo que solo puede apreciarse verdaderamente estando ahí. La historia detrás del Taj, un monumento al amor de Shah Jahan por Mumtaz Mahal, parecía cobrar vida mientras caminaba por los jardines perfectamente cuidados.
            <br /><br />
            Recuerdo haberme detenido frente a la plataforma elevada donde se encuentra el Taj Mahal. A pesar de la multitud de turistas, había una sensación de calma, casi como si el lugar invitara al silencio y a la reflexión. La brisa era suave, y el aroma de las flores que rodean los jardines añadía un toque especial al ambiente. Me tomé un momento para simplemente sentarme y observar la inmensidad del monumento, pensando en el poder del amor que motivó su construcción.
            <br /><br />
            Decidí explorar el interior del Taj Mahal, y aunque la atmósfera es mucho más sobria, la grandeza sigue siendo palpable. Las incrustaciones de piedras preciosas y las elaboradas tallas en el mármol son testimonios del increíble trabajo artesanal que se llevó a cabo hace siglos. Me impresionó la luz natural que entra a través de los intrincados patrones de las ventanas, creando un ambiente sereno y casi espiritual.
            <br /><br />
            Después de explorar el mausoleo, me dirigí a los jardines traseros, desde donde se puede ver el río Yamuna. Esta zona es menos concurrida y ofrece una perspectiva diferente del Taj Mahal, donde se puede admirar su reflejo en el agua mientras el sol comienza a ponerse. Fue un momento de paz absoluta, lejos del bullicio de la entrada principal, y me permitió apreciar aún más la belleza y el simbolismo de este monumento.
            <br /><br />
            Visitar el Taj Mahal no es solo una experiencia visual, es un viaje a través de la historia, la arquitectura y el amor. No importa cuántas veces lo hayas visto en fotos o documentales, nada se compara con estar allí y sentir su grandeza. Este viaje me recordó la importancia de valorar los momentos y de celebrar la belleza que la humanidad es capaz de crear. Si alguna vez tienen la oportunidad de visitar el Taj Mahal, les recomiendo ir con tiempo, disfrutar cada detalle, y dejarse llevar por la magia de este lugar.
          </p>
        </section>

        {/* Sección de comentarios */}
        <section className={styles.commentsSection}>
          <h2 className={styles.commentsTitle}>89 comments</h2>
          <button className={styles.signOutButton}>Sign Out</button>
          <div className={styles.commentsSorting}>
            <p>Sort By Newest</p>
            <p>Jane Doe</p>
          </div>
          <div className={styles.commentInput}>
            <input type="text" placeholder="Add a comment..." className={styles.commentBox} />
            <button className={styles.postButton}>Post</button>
          </div>

          {/* Lista de comentarios */}
          <div className={styles.commentsList}>
            <div className={styles.comment}>
              <p className={styles.commentUser}><strong>Sam Brown</strong> <span className={styles.commentTime}>· 3h</span></p>
              <p className={styles.commentText}>
                comentario de relleno sobre el Taj Mahal.
              </p>
            </div>
            <div className={styles.comment}>
              <p className={styles.commentUser}><strong>Anita Kapoor</strong></p>
              <p className={styles.commentText}>
                comentario de relleno 2 sobre el Taj Mahal.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default TajMahal;
