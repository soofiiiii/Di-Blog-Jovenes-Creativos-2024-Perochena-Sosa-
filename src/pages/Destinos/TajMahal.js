import React, { useState, useEffect, useContext } from 'react';
import styles from '../../styles/DestinoPage.module.css'; // Archivo CSS común para todos los destinos
import Header from '../../components/Header/Header';
import AuthContext from '../../context/AuthContext';
import mainImage from '../../assets/image2.jpg';

const TajMahal = () => {
  const { isAuth, user } = useContext(AuthContext); 
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');


  // Cargar comentarios desde localStorage al montar el componente
  useEffect(() => {
    window.scrollTo(0, 0);
    const storedComments = JSON.parse(localStorage.getItem('comments_taj_mahal')) || [];
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
    localStorage.setItem('comments_taj_mahal', JSON.stringify(updatedComments));
  };

  // Manejar la eliminación de un comentario
  const handleDeleteComment = (commentId) => {
    const updatedComments = comments.filter((comment) => comment.id !== commentId);
    setComments(updatedComments);

    // Actualizar localStorage con la nueva lista de comentarios
    localStorage.setItem('comments_taj_mahal', JSON.stringify(updatedComments));
  };

  return (
    <div className={styles.container}>
      {/* Header Importado */}
      <Header />

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

export default TajMahal;
