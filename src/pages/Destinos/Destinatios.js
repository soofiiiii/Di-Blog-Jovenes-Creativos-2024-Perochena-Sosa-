// src/pages/Destinations.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Destinations.module.css'; 
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

const Destinations = () => {
  const [publicDestinations, setPublicDestinations] = useState([]);

  useEffect(() => {
    // Obtén todos los destinos desde localStorage
    const storedDestinations = JSON.parse(localStorage.getItem('destinations')) || [];
    // Filtra solo los destinos publicados
    const publishedDestinations = storedDestinations.filter(destination => destination.published);
    setPublicDestinations(publishedDestinations);
  }, []);

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
                <Link to={`/destination/${destination.id}`}>
                  <button className={styles.learnButton}>Leer Más</button>
                </Link>
                <div className={styles.gallery}>
                  {destination.galleryImages.slice(0, 4).map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Galería ${index + 1}`}
                      className={styles.galleryImage}
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
      {/* Footer Importado */}
    <Footer />
    </div>

  );
};

export default Destinations;
