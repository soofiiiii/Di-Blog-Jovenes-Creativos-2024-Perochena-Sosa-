import React, { useState, useEffect, useContext } from 'react';
import styles from '../../styles/DestinoPage.module.css';
import Header from '../../components/Header/Header';
import AuthContext from '../../context/AuthContext';
import mainImage from '../../assets/image1.jpg';

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

  // Manejar la eliminación de un comentario
  const handleDeleteComment = (commentId) => {
    const updatedComments = comments.filter((comment) => comment.id !== commentId);
    setComments(updatedComments);

    // Actualizar localStorage con la nueva lista de comentarios
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
            Viajar a la Torre de Pisa siempre había sido uno de mis sueños...
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
    </div>
  );
};

export default TorrePisa;
