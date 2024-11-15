// src/components/CommentsSection.js
import React, { useState, useContext, useEffect } from 'react';
import AuthContext from '../../context/AuthContext';
import styles from './CommentsSection.module.css';

const CommentsSection = ({ destinationId }) => {
  const { isAuth, user } = useContext(AuthContext);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    // Cargar comentarios desde localStorage
    const storedComments = JSON.parse(localStorage.getItem('comments')) || {};
    setComments(storedComments[destinationId] || []);
  }, [destinationId]);

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

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
    const storedComments = JSON.parse(localStorage.getItem('comments')) || {};
    storedComments[destinationId] = updatedComments;
    localStorage.setItem('comments', JSON.stringify(storedComments));
  };

  return (
    <div className={styles.commentsSection}>
      <h3>{comments.length} Comentarios</h3>
      {isAuth ? (
        <div className={styles.commentForm}>
          <input
            type="text"
            placeholder="Añade un comentario..."
            value={newComment}
            onChange={handleCommentChange}
            className={styles.commentInput}
          />
          <button onClick={handleAddComment} className={styles.postButton}>Publicar</button>
        </div>
      ) : (
        <p>Inicia sesión para dejar un comentario.</p>
      )}

      <div className={styles.commentList}>
        {comments.map((comment) => (
          <div key={comment.id} className={styles.comment}>
            <p><strong>{comment.userName}</strong> · {comment.timestamp}</p>
            <p>{comment.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentsSection;
