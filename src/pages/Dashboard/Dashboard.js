import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem('userId');

    // Si no hay un usuario autenticado, redirige a la página de inicio de sesión
    if (!userId) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div>
      <h1>Bienvenido al Dashboard</h1>
      <p>Esta es una página protegida</p>
    </div>
  );
};

export default Dashboard;
