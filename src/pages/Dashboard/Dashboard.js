import React, { useState, useRef, useContext } from 'react';
import styles from './Dashboard.module.css';
import AuthContext from '../../context/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

const Dashboard = () => {
  const { isAuth, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation(); 

  // Estados inicializados con datos de `location.state` si están presentes
  const [title, setTitle] = useState(location.state?.title || '');
  const [description, setDescription] = useState(location.state?.description || '');
  const [mainImage, setMainImage] = useState(location.state?.mainImage || null);
  const [galleryImages, setGalleryImages] = useState(location.state?.galleryImages || []);
  const [commentsEnabled, setCommentsEnabled] = useState(location.state?.commentsEnabled || true);
  const [showModal, setShowModal] = useState(false);

  const mainImageInputRef = useRef(null);
  const galleryImagesInputRef = useRef(null);

  const isEditing = location.state?.id !== undefined;

  // Función para convertir a Base64
  const toBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

  // Funciones para manejar imágenes
  const handleMainImageButtonClick = () => {
    mainImageInputRef.current.click();
  };

  const handleMainImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const base64Image = await toBase64(file);
      setMainImage(base64Image);
    }
  };

  const handleGalleryImageButtonClick = () => {
    galleryImagesInputRef.current.click();
  };

  const handleGalleryImageChange = async (event) => {
    if (galleryImages.length >= 4) {
      alert('No puedes agregar más de 4 imágenes.');
      return;
    }

   const file = event.target.files[0];
  if (file) {
    const base64Image = await toBase64(file);
    setGalleryImages((prevImages) => [...prevImages, base64Image]);
  }
  };

  const removeGalleryImage = (index) => {
    setGalleryImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  // Guardar o actualizar destino
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !description || !mainImage || galleryImages.length !== 4) {
      alert('Todos los campos son obligatorios, incluyendo las imágenes');
      return;
    }

    const newDestination = {
      id: isEditing ? location.state.id : Date.now(),
      title,
      description,
      mainImage,
      galleryImages,
      commentsEnabled,
      userId: user?.id,
    };

    const destinations = JSON.parse(localStorage.getItem('destinations')) || [];
    if (isEditing) {
      // Actualizar el destino existente
      const updatedDestinations = destinations.map(dest => dest.id === newDestination.id ? newDestination : dest);
      localStorage.setItem('destinations', JSON.stringify(updatedDestinations));
    } else {
      // Añadir un nuevo destino
      destinations.push(newDestination);
      localStorage.setItem('destinations', JSON.stringify(destinations));
    }

    alert(isEditing ? 'Destino actualizado con éxito' : 'Destino creado con éxito');
    navigate('/mis-destinos');
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  return (
    <div>
      <Header />
      <div className={styles.container}>
        <h2 className={styles.heading}>{isEditing ? 'Editar Destino' : 'Crear Destino'}</h2>
        <p className={styles.subheading}>crea y comparte tu historia</p>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formRow}>
            <div className={styles.formGroupLeft}>
              <label>TÍTULO DEL DESTINO:</label>
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
              <label>SORPRÉNDENOS CON TU EXPERIENCIA:</label>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
            </div>
            <div className={styles.formGroupRight}>
              <label>MUÉSTRANOS SOBRE TU VIAJE:</label>
              <div className={styles.imageSection}>
                {!mainImage && <p className={styles.imageInfo}>Imagen Principal 1800×800px</p>}
                {mainImage && (
                  <div className={styles.imagePreviewContainer}>
                    <img src={mainImage} alt="Imagen Principal" className={styles.imagePreview} />
                    <button type="button" className={styles.removeButton} onClick={() => setMainImage(null)}>×</button>
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

              {/* Galería de imágenes */}
              <div className={styles.imageSection}>
                {galleryImages.length === 0 && <p className={styles.imageInfo}>Galería de imágenes: 4 imágenes</p>}
                {galleryImages.length > 0 && (
                  <div className={styles.galleryContainer}>
                    {galleryImages.map((image, index) => (
                      <div key={index} className={styles.imagePreviewContainer}>
                        <img src={image} alt={`Galería ${index + 1}`} className={styles.imagePreview} />
                        <button type="button" className={styles.removeButton} onClick={() => removeGalleryImage(index)}>×</button>
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
          <button type="submit" className={styles.submitButton}>
            {isEditing ? 'Actualizar Destino' : 'Crear Destino'}
          </button>
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
      {/* Footer Importado */}
    <Footer />
    </div>
  );
};

export default Dashboard;
