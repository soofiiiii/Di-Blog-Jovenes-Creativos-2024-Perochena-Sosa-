import React, { useContext, useEffect, useState } from 'react';
import { createAvatar } from '@dicebear/core';
import { micah } from '@dicebear/collection';
import AuthContext from '../../context/AuthContext';

const UserAvatar = ({ onClick }) => {
  const { user } = useContext(AuthContext);
  const seed = user?.name || user?.id || 'guest'; // Usar el nombre o ID del usuario como semilla
  const [avatarDataUri, setAvatarDataUri] = useState('');

  useEffect(() => {
    // Genera el avatar usando el estilo `micah`
    const avatar = createAvatar(micah, {
      seed: seed,
      size: 64,
      backgroundColor: ['#f0f0f0', '#ffd5dc', '#d0ffce'], // Colores de fondo amigables
      mood: ['happy', 'surprised'], // Expresiones amigables
    });

    // Convierte el avatar SVG en un URI de datos
    setAvatarDataUri(`data:image/svg+xml;utf8,${encodeURIComponent(avatar.toString())}`);
  }, [seed]); // Solo recalcular si cambia la semilla

  return (
    <img
      src={avatarDataUri}
      alt="Avatar"
      onClick={onClick} // Agrega un evento de clic si es necesario
      style={{ width: 50, height: 50, borderRadius: '50%', cursor: 'pointer' }}
    />
  );
};

export default UserAvatar;