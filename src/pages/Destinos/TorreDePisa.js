import React, { useState, useEffect, useContext } from 'react';
import styles from '../../styles/DestinoPage.module.css';
import Header from '../../components/Header/Header';
import AuthContext from '../../context/AuthContext';
import mainImage from '../../assets/image1.jpg';
import Footer from '../../components/Footer/Footer';

const TorrePisa = () => {
  const { isAuth, user } = useContext(AuthContext); 
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');


  // Cargar comentarios desde localStorage al montar el componente
  useEffect(() => {
    window.scrollTo(0, 0);
    const storedComments = JSON.parse(localStorage.getItem('comments_torre_pisa')) || [];
    setComments(storedComments);
  }, []);

  // Manejar cambios en el campo de comentario
  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  // Manejar la publicación de un nuevo comentario
  const handleAddComment = () => {
    if (!isAuth) {
      alert("Debes iniciar sesión o registrarte para comentar.");
      return;
    }

    const comment = {
      id: Date.now(),
      userName: user.name,
      content: newComment,
      timestamp: new Date().toLocaleString(),
    };

    const updatedComments = [...comments, comment];
    setComments(updatedComments);
    setNewComment('');

    // Guardar los comentarios actualizados en localStorage
    localStorage.setItem('comments_torre_pisa', JSON.stringify(updatedComments));
  };


  return (
    <div className={styles.container}>
      {/* Header Importado */}
      <Header />

      {/* Contenedor principal */}
      <div className={styles.mainContent}>
        {/* Sección del blog (imagen y descripción) */}
        <section className={styles.blogSection}>
          <img src={mainImage} alt="Torre de Pisa" className={styles.mainImage} />
          <p className={styles.destinationDescription}>
            Viajar a la Torre de Pisa siempre había sido uno de mis sueños, pero nunca imaginé la magnitud de la experiencia hasta que estuve allí, con mis pies tocando el suelo de esa maravillosa plaza. Al llegar a la Piazza dei Miracoli, la primera vista de la torre fue algo impresionante. Ahí estaba, inclinada pero majestuosa, desafiando la gravedad y capturando mi atención como pocas cosas lo han hecho.
          </p>

          <p className={styles.destinationDescription}>
            Mientras caminaba hacia la torre, el bullicio de los turistas y los destellos de las cámaras se mezclaban con una atmósfera histórica palpable. La torre, con sus ocho niveles de mármol blanco y adornos de piedra, se veía aún más impresionante de cerca. Decidí subir los 294 escalones que llevan a la cima. Cada paso era como retroceder en el tiempo, con los escalones desgastados y ligeramente inclinados que me recordaban los siglos de historia que este monumento ha vivido. Subir a la Torre de Pisa no es solo un reto físico, sino también una oportunidad para reflexionar sobre cuántas personas, a lo largo de los siglos, han pisado esos mismos escalones y se han maravillado ante su inclinación.
          </p>

          <p className={styles.destinationDescription}>
            Una vez arriba, la vista era absolutamente espectacular. Desde allí, podía ver toda la ciudad de Pisa y sus alrededores. Las montañas distantes, los tejados terracota, y la plaza misma se extendían frente a mí como una pintura renacentista. Sentí una mezcla de logro y asombro al darme cuenta de dónde estaba. A pesar de la inclinación, la plataforma de observación me permitió caminar alrededor de la torre y disfrutar de vistas de 360 grados que parecían sacadas de un libro de historia.
          </p>

          <p className={styles.destinationDescription}>
            Después de descender, me tomé un momento para pasear por la plaza y visitar la Catedral de Pisa y el Baptisterio, ambos igualmente magníficos. La Piazza dei Miracoli tiene una magia única, donde cada estructura parece contar su propia historia, pero a la vez se complementan perfectamente. Fue interesante escuchar las leyendas sobre la construcción de la torre y cómo, a pesar de los intentos de corregir la inclinación, la estructura ha resistido de una forma casi desafiante.
          </p>

          <p className={styles.destinationDescription}>
            Lo que más me impresionó fue la habilidad humana para crear algo tan espectacular, y que, incluso con fallos en los cimientos, se convirtiera en uno de los monumentos más icónicos del mundo. La Torre de Pisa me enseñó que incluso las imperfecciones pueden ser hermosas y dar lugar a algo inolvidable. Me tomé el clásico "foto sosteniendo la torre", claro, pero más allá de la foto, la experiencia de estar ahí, de conectar con la historia y de sentir la atmósfera especial de este lugar, fue lo que hizo de este viaje algo que guardaré siempre en mi memoria.
          </p>
        </section>

        {/* Sección de comentarios */}
        <section className={styles.commentsSection}>
          <h2 className={styles.commentsTitle}>{comments.length} comentarios</h2>

          {/* Comprobación de autenticación */}
          {isAuth ? (
            <div className={styles.commentInput}>
              <input
                type="text"
                placeholder="Añade un comentario..."
                value={newComment}
                onChange={handleCommentChange}
                className={styles.commentBox}
              />
              <button onClick={handleAddComment} className={styles.postButton}>Publicar</button>
            </div>
          ) : (
            <p>Inicia sesión para dejar un comentario.</p>
          )}

          {/* Lista de comentarios */}
          <div className={styles.commentsList}>
            {comments.map((comment) => (
              <div key={comment.id} className={styles.comment}>
                <p className={styles.commentUser}>
                  <strong>{comment.userName = user.name}</strong> 
                  <span className={styles.commentTime}> · {comment.timestamp}</span>
                </p>
                <p className={styles.commentText}>{comment.content}</p>

               
              </div>
            ))}
          </div>
        </section>
      </div>
      {/* Footer Importado */}
    <Footer />
    </div>
  );
};

export default TorrePisa;
