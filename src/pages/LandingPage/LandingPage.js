import React, { useState } from 'react';
import Modal from 'react-modal';
import styles from './LandingPage.module.css';
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";


// Importaciones de imágenes
import image1 from '../../assets/image1.jpg';
import image2 from '../../assets/image2.jpg';
import image3 from '../../assets/image3.jpg';
import image6 from '../../assets/image6.png';

import galleryImage1 from '../../assets/gallery1.jpg';
import galleryImage2 from '../../assets/gallery2.jpg';
import galleryImage3 from '../../assets/gallery3.jpg';
import galleryImage4 from '../../assets/gallery4.jpg';

import galleryImage5 from '../../assets/gallery5.jpg';
import galleryImage6 from '../../assets/gallery6.jpg';
import galleryImage7 from '../../assets/gallery7.jpg';
import galleryImage8 from '../../assets/gallery8.jpg';

import galleryImage9 from '../../assets/gallery9.jpg';
import galleryImage10 from '../../assets/gallery10.jpg';
import galleryImage11 from '../../assets/gallery11.jpg';
import galleryImage12 from '../../assets/gallery12.jpg';


const LandingPage = () => {

   // Estado para abrir la galería
   const [isGalleryOpen, setIsGalleryOpen] = useState(false);
   const [currentImage, setCurrentImage] = useState(null);
   const [currentGallery, setCurrentGallery] = useState([]);


  // Galerías de imágenes para cada destino
  const images = {
    torrePisa: [galleryImage1, galleryImage2, galleryImage3, galleryImage4],
    tajMahal: [galleryImage5, galleryImage6, galleryImage7, galleryImage8],
    cataratas: [galleryImage9, galleryImage10, galleryImage11, galleryImage12],
  };

  // Abrir galería
  const openModal = (gallery, image) => {
    setCurrentGallery(gallery);
    setCurrentImage(image);
    setIsGalleryOpen(true);
  };

  // Cerrar galería
  const closeModal = () => {
    setIsGalleryOpen(false);
    setCurrentImage(null);
  };

  // Avanzar a la siguiente imagen
  const goToNextImage = () => {
    const currentIndex = currentGallery.indexOf(currentImage);
    const nextIndex = (currentIndex + 1) % currentGallery.length;
    setCurrentImage(currentGallery[nextIndex]);
  };

  // Retroceder a la imagen anterior
  const goToPreviousImage = () => {
    const currentIndex = currentGallery.indexOf(currentImage);
    const previousIndex = (currentIndex - 1 + currentGallery.length) % currentGallery.length;
    setCurrentImage(currentGallery[previousIndex]);
  };

   // Estado para la búsqueda
  const [searchTerm, setSearchTerm] = useState('');

  // Definir el estado del menú
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
      <h1 className={styles.navTitle}>Di-Blog</h1>
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
    

      <section className={styles.heroSection} style={{ backgroundImage: `url(${image6})` }}>
        <div className={styles.heroContent}>
          <h1 className={styles.title}>Di-Blog</h1>
          <p className={styles.subTitle}>Learn More</p>
          <div className={styles.searchContainer}>
            <input type="text"
              className={styles.searchInput}
              placeholder="Buscar destinos, aventuras..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} // Permite escribir en el campo
            />
            <button className={styles.searchButton}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      <section className={styles.features}>
        {Object.entries(images).map(([galleryKey, galleryImages]) => (
          <div key={galleryKey} className={styles.featureCard}>
            <img
              src={
                galleryKey === 'torrePisa'
                  ? image1
                  : galleryKey === 'tajMahal'
                  ? image2
                  : image3
              }
              alt={`Foto de destino ${galleryKey}`}
              onClick={() =>
                openModal(galleryImages, 
                  galleryKey === 'torrePisa' ? image1 : 
                  galleryKey === 'tajMahal' ? image2 : 
                  image3
                )
              }
            />
            <h3>
              {galleryKey === 'torrePisa'
                ? 'Torre de Pisa'
                : galleryKey === 'tajMahal'
                ? 'Taj Mahal, India'
                : 'Cataratas Victoria'}
            </h3>
            <p>
              {galleryKey === 'torrePisa'
                ? 'Descubre la historia detrás de la torre más inclinada del mundo y su enigmático encanto.'
                : galleryKey === 'tajMahal'
                ? 'Adéntrate en el monumento más romántico del mundo y déjate sorprender por su belleza eterna.'
                : 'Explora la majestuosidad de las Cataratas Victoria, donde la naturaleza muestra todo su poder.'}
            </p>
            <button className={styles.learnButton}>Learn More</button>
            <div className={styles.featureGallery}>
              {galleryImages.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Imagen de galería ${index + 1}`}
                  onClick={() => openModal(galleryImages, img)}
                  className={styles.thumbnail}
                />
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Modal para la galería */}
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
            <button onClick={goToPreviousImage} className={`${styles.arrowButton} ${styles.arrowLeft}`}>
              ❮
            </button>

            {/* Imagen ampliada */}
            <img src={currentImage} alt="Imagen ampliada" className={styles.modalImage} />

            {/* Botón para la imagen siguiente */}
            <button onClick={goToNextImage} className={`${styles.arrowButton} ${styles.arrowRight}`}>
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

            <button onClick={closeModal} className={styles.closeButton}>×</button>
          </div>
        )}
      </Modal>

    </div>
  );
};

export default LandingPage;
