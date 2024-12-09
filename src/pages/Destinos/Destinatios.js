import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import styles from './Destinations.module.css';
import Header from '../../components/Header/Header';


Modal.setAppElement('#root'); // Configura el elemento raíz del modal para la accesibilidad


const Destinations = () => {
  const [publicDestinations, setPublicDestinations] = useState([]);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const [currentGallery, setCurrentGallery] = useState([]);


  useEffect(() => {
    // Obtén todos los destinos desde localStorage
    const storedDestinations = JSON.parse(localStorage.getItem('destinations')) || [];
    // Filtra solo los destinos publicados
    const publishedDestinations = storedDestinations.filter(destination => destination.published);
    setPublicDestinations(publishedDestinations);
  }, []);


  // Funciones para el manejo del modal de la galería
  const openModal = (gallery, image) => {
    setCurrentGallery(gallery);
    setCurrentImage(image);
    setIsGalleryOpen(true);
  };


  const closeModal = () => {
    setIsGalleryOpen(false);
    setCurrentImage(null);
  };


  const goToNextImage = () => {
    const currentIndex = currentGallery.indexOf(currentImage);
    const nextIndex = (currentIndex + 1) % currentGallery.length;
    setCurrentImage(currentGallery[nextIndex]);
  };


  const goToPreviousImage = () => {
    const currentIndex = currentGallery.indexOf(currentImage);
    const previousIndex = (currentIndex - 1 + currentGallery.length) % currentGallery.length;
    setCurrentImage(currentGallery[previousIndex]);
  };


  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.content}>
        <h2>Destinos Públicos</h2>
        <div className={styles.destinationsList}>
          {publicDestinations.length > 0 ? (
            publicDestinations.map((destination) => (
              <div key={destination.id} className={styles.featureCard}>
                <img
                  src={destination.mainImage}
                  alt={destination.title}
                  className={styles.mainImage}
                />
                <h3>{destination.title}</h3>
                <p>{destination.description}</p>
                {destination.id && (
                  <Link to={`/destination/${destination.id}`}>
                    <button className={styles.learnButton}>Leer Más</button>
                  </Link>
                )}
                <div className={styles.gallery}>
                  {destination.galleryImages && destination.galleryImages.slice(0, 4).map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Galería ${index + 1}`}
                      className={styles.galleryImage}
                      onClick={() => openModal(destination.galleryImages, image)}
                    />
                  ))}
                </div>
              </div>
            ))
          ) : (
            <p>No hay destinos públicos disponibles.</p>
          )}
        </div>
      </div>


      {/* Modal para la galería de imágenes */}
      <Modal
        isOpen={isGalleryOpen}
        onRequestClose={closeModal}
        contentLabel="Imagen ampliada"
        className={styles.modal}
        overlayClassName={styles.overlay}
      >
        {currentImage && (
          <div className={styles.modalContent}>
            {/* Botón para la imagen anterior */}
            <button
              onClick={goToPreviousImage}
              className={`${styles.arrowButton} ${styles.arrowLeft}`}
            >
              ❮
            </button>


            {/* Imagen ampliada */}
            <img src={currentImage} alt="Imagen ampliada" className={styles.modalImage} />


            {/* Botón para la imagen siguiente */}
            <button
              onClick={goToNextImage}
              className={`${styles.arrowButton} ${styles.arrowRight}`}
            >
              ❯
            </button>


            <div className={styles.thumbnailContainer}>
              {currentGallery.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Miniatura ${index + 1}`}
                  onClick={() => setCurrentImage(img)}
                  className={styles.thumbnail}
                />
              ))}
            </div>


            <button onClick={closeModal} className={styles.closeButton} aria-label="Cerrar">
              ×
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
};


export default Destinations;
