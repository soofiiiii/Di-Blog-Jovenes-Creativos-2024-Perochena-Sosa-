import React, { useState, useRef } from 'react';
import styles from './Dashboard.module.css';

const Dashboard = () => {
    
  // Estado para la búsqueda
  const [searchTerm, setSearchTerm] = useState('');
  
  // Definir el estado del menú
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [mainImage, setMainImage] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);
  const [commentsEnabled, setCommentsEnabled] = useState(true);

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

        const file = event.target.files[0]; // Solo una imagen a la vez
        if (file) {
            const newImage = URL.createObjectURL(file);

            setGalleryImages((prevImages) => {
                if (prevImages.length < 4) {
                    return [...prevImages, newImage];
                }
                return prevImages;
            });
        }
    };

  const removeGalleryImage = (index) => {
    setGalleryImages(prevImages => prevImages.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description || !mainImage || galleryImages.length !== 4) {
      alert('Todos los campos son obligatorios, incluyendo las imágenes');
      return;
    }
    alert('Destino turístico creado con éxito');
  };
  
    return (
      <div>
        {/* Header */}
        <header className={styles.header}>
          <a href="/" className={styles.navTitle}>Di-Blog</a>
          <div className={styles.searchContainer}>
            <input
              type="text"
              className={styles.searchInput}
              placeholder="Buscar destinos, aventuras..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className={styles.searchButton}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
              </svg>
            </button>
          </div>
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
                    
                    {/* Sección para la Imagen Principal */}
                        <div className={styles.imageSection}>
                            {!mainImage && <p className={styles.imageInfo}>Imagen Principal 1800×800px</p>}
                            {mainImage ? (
                                <div className={styles.imagePreviewContainer}>
                                    <img src={mainImage} alt="Imagen Principal" className={styles.imagePreview} />
                                    <button
                                        type="button"
                                        className={styles.removeButton}
                                        onClick={() => setMainImage(null)}
                                    >
                                        ×
                                    </button>
                                </div>
                            ) : (
                                <button
                                    type="button"
                                    className={styles.fileButton}
                                    onClick={handleMainImageButtonClick}
                                >
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


                   {/* Sección para la Galería de Imágenes */}
                        <div className={styles.imageSection}>
                            {galleryImages.length === 0 && <p className={styles.imageInfo}>Galería de imágenes : 4 imágenes</p>}
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
                            
                            {/* Botón de selección visible solo si hay menos de 4 imágenes */}
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


                    <div className={styles.commentsSection}>
                        <label>SECCIÓN DE COMENTARIOS:</label>
                        <div className={styles.commentsOptions}>
                            <label>
                            <input
                                type="radio"
                                name="comments"
                                value="encendida"
                                checked={commentsEnabled}
                                onChange={() => setCommentsEnabled(true)}
                            />
                            Encendida
                            </label>
                            <label>
                            <input
                                type="radio"
                                name="comments"
                                value="apagada"
                                checked={!commentsEnabled}
                                onChange={() => setCommentsEnabled(false)}
                            />
                            Apagada
                            </label>
                        </div>
                        </div>
                </div>
                </div>

                <div className={styles.submitButtonContainer}>
                <button type="submit" className={styles.submitButton}>Crear Destino</button>
                </div>
            </form>
            </div>

    </div>
  );
};

export default Dashboard;