import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import styles from './MyDestinations.module.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

const MyDestinations = () => {
  const { user } = useContext(AuthContext);
  const [userDestinations, setUserDestinations] = useState([]);
  const [publishDescription, setPublishDescription] = useState(''); // Estado para la descripción
  const [destinationToPublish, setDestinationToPublish] = useState(null); // Estado para el destino que se va a publicar
  const navigate = useNavigate();

  useEffect(() => {
    const storedDestinations = JSON.parse(localStorage.getItem('destinations')) || [];
    const filteredDestinations = storedDestinations.filter(destination => destination.userId === user.id);
    setUserDestinations(filteredDestinations);
  }, [user]);

  const loadDestinations = () => {
    const storedDestinations = JSON.parse(localStorage.getItem('destinations')) || [];
    const filteredDestinations = storedDestinations.filter(
      destination => destination.userId === user?.id
    );
    setUserDestinations(filteredDestinations);
  };

  // Función para eliminar un destino
  const handleDelete = (id) => {
    const storedDestinations = JSON.parse(localStorage.getItem('destinations')) || [];
    const updatedDestinations = storedDestinations.filter(destination => destination.id !== id);
    localStorage.setItem('destinations', JSON.stringify(updatedDestinations));
    loadDestinations();
    alert("Destino eliminado con éxito.");
  };

  // Función para editar un destino
  const handleEdit = (destination) => {
    navigate('/dashboard', { state: destination }); 
  };

  // Función para abrir el modal de descripción al publicar
  const handleOpenPublishModal = (destination) => {
    setDestinationToPublish(destination);
    setPublishDescription(''); // Limpiar el campo de descripción
  };

  // Función para guardar la descripción y publicar el destino
  const handlePublish = () => {
    if (publishDescription.length > 50) {
      alert("La descripción puede tener hasta 50 caracteres.");
      return;
    }

    const updatedDestinations = userDestinations.map(destination =>
      destination.id === destinationToPublish.id
        ? { ...destination, published: true, publishDescription }
        : destination
    );
    setUserDestinations(updatedDestinations);
    localStorage.setItem('destinations', JSON.stringify(updatedDestinations));
    setDestinationToPublish(null); // Cerrar el modal
    alert("Destino publicado con éxito.");
  };

  // Función para hacer un destino privado
  const handleMakePrivate = (id) => {
    const updatedDestinations = userDestinations.map(destination =>
      destination.id === id ? { ...destination, published: false } : destination
    );
    setUserDestinations(updatedDestinations);
    localStorage.setItem('destinations', JSON.stringify(updatedDestinations));
    alert("Destino cambiado a privado con éxito.");
  };

  return (
    <div className={styles.container}>
      <Header />
      
      <div className={styles.content}>
        <h2>Mis Destinos</h2>
        {userDestinations.length > 0 ? (
          <div className={styles.destinationsList}>
            {userDestinations.map(destination => (
              <div key={destination.id} className={styles.destinationCard}>
                <h3>{destination.title}</h3>
                <img src={destination.mainImage} alt={destination.title} className={styles.destinationImage} />
                <div className={styles.actions}>
                  <button onClick={() => handleEdit(destination)} className={styles.editButton}>Modificar</button>
                  <button onClick={() => handleDelete(destination.id)} className={styles.deleteButton}>Eliminar</button>
                  {!destination.published ? (
                    <button onClick={() => handleOpenPublishModal(destination)} className={styles.publishButton}>Publicar</button>
                  ) : (
                    <button onClick={() => handleMakePrivate(destination.id)} className={styles.privatizeButton}>Privado</button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No has creado ningún destino todavía.</p>
        )}
      </div>

      {/* Modal de descripción para publicar */}
      {destinationToPublish && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h3>Escribe una breve descripción para tu destino</h3>
            <textarea
              value={publishDescription}
              onChange={(e) => setPublishDescription(e.target.value)}
              placeholder="Escribe una descripción breve de máximo 50 caracteres..."
              className={styles.descriptionInput}
            />
            <button onClick={handlePublish} className={styles.submitButton}>Publicar Destino</button>
            <button onClick={() => setDestinationToPublish(null)} className={styles.cancelButton}>Cancelar</button>
          </div>
        </div>
      )}
      {/* Footer Importado */}
    <Footer />
    </div>
  );
};

export default MyDestinations;
