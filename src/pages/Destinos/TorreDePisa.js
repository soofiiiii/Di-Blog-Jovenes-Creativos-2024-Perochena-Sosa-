import React, { useState, useEffect } from 'react';
import styles from '../../styles/DestinoPage.module.css'; // Archivo CSS común para todos los destinos

// Importa la imagen principal
import mainImage from '../../assets/image1.jpg';

const TorrePisa = () => {
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
          <img src={mainImage} alt="Torre de Pisa" className={styles.mainImage} />
          <p className={styles.destinationDescription}>
            Viajar a la Torre de Pisa siempre había sido uno de mis sueños, y finalmente tener la oportunidad de conocer este lugar icónico fue una experiencia increíble. Desde el momento en que llegué, me encontré rodeado por la energía vibrante de la Piazza dei Miracoli. La torre, inclinada pero majestuosa, parecía desafiar las leyes de la gravedad. Es fácil entender por qué la Torre de Pisa se ha convertido en un símbolo mundialmente conocido.
            <br /><br />
            Recuerdo la primera vista de la torre, parecía tan surrealista que no pude evitar preguntarme cómo algo tan magnífico podía inclinarse sin caer. Esa inclinación es lo que la hace única, y estar allí, frente a ella, fue un momento especial. Los turistas, cada uno intentando encontrar el mejor ángulo para esa típica foto empujando la torre, le daban un aire de diversión y alegría a todo el lugar.
            <br /><br />
            Decidí aventurarme y subir los 294 escalones que llevan a la cima. La escalera en espiral es bastante angosta y, con la inclinación, cada paso se siente diferente, casi como si estuvieras caminando dentro de un lugar encantado. La sensación de desequilibrio te acompaña hasta el último escalón, donde al llegar a la cima, te recibe una vista espectacular de la ciudad de Pisa. Desde allí se puede ver la extensión de la Piazza, con el Baptisterio y la Catedral, todos formando un conjunto arquitectónico que parece sacado de un sueño.
            <br /><br />
            Pasé un buen rato admirando la vista, disfrutando del viento suave y tratando de absorber cada detalle. Desde arriba, se podía sentir la historia del lugar, las décadas de esfuerzo para mantener esta torre en pie, y el ingenio de quienes la construyeron y la restauraron. Pisa no es solo su torre inclinada; es una ciudad que respira historia y arte en cada rincón.
            <br /><br />
            Después de bajar, me tomé un tiempo para pasear por los alrededores. Probé algunos platillos de la gastronomía local, como la "cecina", un pan de garbanzo típico de la región, mientras me sentaba en la plaza observando a la gente. Es fácil dejarse llevar por el ambiente relajado y alegre que se siente en este lugar. Incluso me uní a otros turistas para tomar una de esas fotos cliché sujetando la torre; fue más difícil de lo que parecía lograr la pose perfecta, pero nos reímos mucho intentándolo.
            <br /><br />
            Recomiendo totalmente visitar la Torre de Pisa si alguna vez tienen la oportunidad. No solo por la torre en sí, sino por la atmósfera única del lugar. Es un destino que combina historia, cultura y un toque de diversión que lo convierte en una experiencia memorable. Pisa es mucho más que su famosa torre inclinada, pero no hay duda de que ese momento al ver la torre en persona, con su desafiante inclinación, quedará grabado en mi memoria para siempre.
          </p>
        </section>

        {/* Sección de comentarios */}
        <section className={styles.commentsSection}>
          <h2 className={styles.commentsTitle}>57 comments</h2>
          <button className={styles.signOutButton}>Sign Out</button>
          <div className={styles.commentsSorting}>
            <p>Sort By Newest</p>
            <p>John Doe</p>
          </div>
          <div className={styles.commentInput}>
            <input type="text" placeholder="Add a comment..." className={styles.commentBox} />
            <button className={styles.postButton}>Post</button>
          </div>

          {/* Lista de comentarios */}
          <div className={styles.commentsList}>
            <div className={styles.comment}>
              <p className={styles.commentUser}><strong>Jane Smith</strong> <span className={styles.commentTime}>· 2h</span></p>
              <p className={styles.commentText}>
                comentario de relleno sobre la Torre de Pisa.
              </p>
            </div>
            <div className={styles.comment}>
              <p className={styles.commentUser}><strong>Mario Rossi</strong></p>
              <p className={styles.commentText}>
                comentario de relleno 2 sobre la Torre de Pisa.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default TorrePisa;
