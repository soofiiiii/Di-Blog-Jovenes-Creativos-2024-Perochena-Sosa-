import React, { useState, useEffect, useContext } from 'react';
import styles from '../../styles/DestinoPage.module.css'; // Archivo CSS común para todos los destinos
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import AuthContext from '../../context/AuthContext';
// Importa la imagen principal
import mainImage from '../../assets/image3.jpg';

const CataratasVictoria = () => {
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
    localStorage.setItem('comments_cataratas_victoria', JSON.stringify(updatedComments));
  };

  // Eliminar un comentario
  const handleDeleteComment = (commentId) => {
    const updatedComments = comments.filter((comment) => comment.id !== commentId);
    setComments(updatedComments);

    // Actualizar localStorage con la lista de comentarios
    localStorage.setItem('comments_cataratas_victoria', JSON.stringify(updatedComments));
  };

  return (
    <div className={styles.container}>
      {/* Header Importado */}
      <Header />

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

                {/* Botón de eliminación (solo visible para el autor del comentario) */}
                {isAuth && comment.userId === user.Id && (
                  <button
                    onClick={() => handleDeleteComment(comment.id)}
                    className={styles.deleteButton}
                  >
                    Eliminar
                  </button>
                )}
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

export default CataratasVictoria;
