import React, { useEffect, useState, useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import styles from './MyDestinations.module.css';
import Header from '../../components/Header/Header';

const MyDestinations = () => {
  const { user } = useContext(AuthContext);
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    if (user && user.id) {  // Verificación para asegurarse de que `user` y `user.id` existen
      // Obtén todos los destinos desde el localStorage
      const storedDestinations = JSON.parse(localStorage.getItem('destinations')) || [];

      // Filtra los destinos que pertenecen al usuario actual
      const userDestinations = storedDestinations.filter(
        (destination) => destination.userId === user.id
      );

      setDestinations(userDestinations);
    }
  }, [user]);

  return (
    <div className={styles.container}>
     {/* Header Importado */}
     <Header />
        <div className={styles.content}>
            <h2>Mis Destinos</h2>
            <div className={styles.destinationsGrid}>
                {destinations.length > 0 ? (
                destinations.map((destination, index) => (
                    <div key={index} className={styles.destinationCard}>
                    <img src={destination.mainImage} alt={destination.title} className={styles.mainImage} />
                    <h3>{destination.title}</h3>
                    <p>{destination.description}</p>
                    <div className={styles.gallery}>
                        {destination.galleryImages.map((image, idx) => (
                        <img key={idx} src={image} alt={`Galería ${idx + 1}`} className={styles.galleryImage} />
                        ))}
                    </div>
                    </div>
                ))
                ) : (
                <p>No has creado ningún destino todavía.</p>
                )}
            </div>
        </div>
    </div>
  );
};

export default MyDestinations;
