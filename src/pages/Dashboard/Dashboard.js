import React, { useState, useRef, useContext } from 'react';
import styles from './Dashboard.module.css';
import AuthContext from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';

const Dashboard = () => {
  const { isAuth, user } = useContext(AuthContext); // Obtener el usuario
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [mainImage, setMainImage] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);
  const [commentsEnabled, setCommentsEnabled] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const mainImageInputRef = useRef(null);
  const galleryImagesInputRef = useRef(null);

  const handleMainImageButtonClick = () => {
    mainImageInputRef.current.click();
  };

  const handleMainImageChange = (event) => {
    setMainImage(URL.createObjectURL(event.target.files[0]));
  };

  const handleGalleryImageButtonClick = () => {
    galleryImagesInputRef.current.click();
  };

  const handleGalleryImageChange = (event) => {
    if (galleryImages.length >= 4) {
      alert('No puedes agregar más de 4 imágenes.');
      return;
    }

    const file = event.target.files[0];
    if (file) {
      const newImage = URL.createObjectURL(file);
      setGalleryImages((prevImages) => [...prevImages, newImage]);
    }
  };

  const removeGalleryImage = (index) => {
    setGalleryImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isAuth) {
      setShowModal(true);
      return;
    }
    if (!title || !description || !mainImage || galleryImages.length !== 4) {
      alert('Todos los campos son obligatorios, incluyendo las imágenes');
      return;
    }
  
    // Crear el destino con la estructura correcta
    const newDestination = {
      id: Date.now(),
      userId: user.id, // El ID del usuario autenticado
      title,
      description,
      mainImage,
      galleryImages,
    };
  
    // Obtener destinos almacenados y agregar el nuevo destino
    const storedDestinations = JSON.parse(localStorage.getItem('destinations')) || [];
    storedDestinations.push(newDestination);
    localStorage.setItem('destinations', JSON.stringify(storedDestinations));
  
    // Resetear el formulario
    setTitle('');
    setDescription('');
    setMainImage(null);
    setGalleryImages([]);
    alert('Destino turístico creado con éxito');
    navigate('/mis-destinos');
  };
  

  const handleModalClose = () => {
    setShowModal(false);
  };

  return (
    <div>
      {/* Header Importado */}
      <Header />
  
      {/* Formulario */}
      <div className={styles.container}>
        <h2 className={styles.heading}>¡CUÉNTANOS TU EXPERIENCIA!</h2>
        <p className={styles.subheading}>crea y comparte tu historia</p>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formRow}>
            <div className={styles.formGroupLeft}>
              <label>TÍTULO DEL DESTINO:</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              <label>SORPRÉNDENOS CON TU EXPERIENCIA:</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              ></textarea>
            </div>
            <div className={styles.formGroupRight}>
              <label>MUÉSTRANOS SOBRE TU VIAJE:</label>
              <div className={styles.imageSection}>
                {!mainImage && <p className={styles.imageInfo}>Imagen Principal 1800×800px</p>}
                {mainImage && (
                  <div className={styles.imagePreviewContainer}>
                    <img src={mainImage} alt="Imagen Principal" className={styles.imagePreview} />
                    <button type="button" className={styles.removeButton} onClick={() => setMainImage(null)}>
                      ×
                    </button>
                  </div>
                )}
                {!mainImage && (
                  <button type="button" className={styles.fileButton} onClick={handleMainImageButtonClick}>
                    Seleccionar archivo
                  </button>
                )}
                <input
                  type="file"
                  accept="image/*"
                  ref={mainImageInputRef}
                  onChange={handleMainImageChange}
                  style={{ display: 'none' }}
                />
              </div>

              <div className={styles.imageSection}>
                {galleryImages.length === 0 && <p className={styles.imageInfo}>Galería de imágenes: 4 imágenes</p>}
                {galleryImages.length > 0 && (
                  <div className={styles.galleryContainer}>
                    {galleryImages.map((image, index) => (
                      <div key={index} className={styles.imagePreviewContainer}>
                        <img src={image} alt={`Galería ${index + 1}`} className={styles.imagePreview} />
                        <button type="button" className={styles.removeButton} onClick={() => removeGalleryImage(index)}>
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                {galleryImages.length < 4 && (
                  <button type="button" className={styles.fileButton} onClick={handleGalleryImageButtonClick}>
                    Seleccionar archivo
                  </button>
                )}
                <input
                  type="file"
                  accept="image/*"
                  ref={galleryImagesInputRef}
                  onChange={handleGalleryImageChange}
                  style={{ display: 'none' }}
                />
              </div>
            </div>
          </div>
          <button type="submit" className={styles.submitButton}>Crear Destino</button>
        </form>
      </div>

      {/* Modal para usuarios no autenticados */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>¡Espera!</h2>
            <p>Debes registrarte o iniciar sesión para crear un destino.</p>
            <button onClick={() => navigate('/login')}>Iniciar Sesión</button>
            <button onClick={() => navigate('/register')}>Registrarse</button>
            <button onClick={handleModalClose}>Volver al sitio</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
