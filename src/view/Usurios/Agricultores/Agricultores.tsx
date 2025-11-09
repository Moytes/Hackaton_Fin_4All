import React from 'react';
// Importamos 'useAuth' para poder cerrar sesión
import { useAuth } from '../../../context/AuthContext';
// Importa los componentes de Ant Design
import { Button, Card, Typography, Space } from 'antd';

const { Title, Text } = Typography;

/**
 * Vista: src/view/Usuarios/Agricultores
 * Corregida para usar el AuthContext
 */
const Agricultores: React.FC = () => {
  // 1. Obtenemos la función 'logout' de nuestro contexto
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    // No necesitas navegar. ProtectedRoute
    // detectará el cambio y te enviará a /login.
  };

  return (
    <Card>
      <Title level={2}>Panel de Agricultor</Title>
      <Text type="secondary">Bienvenido a su panel de gestión.</Text>
      <Space wrap className="mt-6">
        {/* Quitamos el botón "Volver al Admin" porque este es el panel 
          principal del Agricultor. La navegación debe estar en el Layout.
        */}
        
        {/* 2. El botón ahora llama a handleLogout */}
        <Button danger onClick={handleLogout}>
          Cerrar Sesión
        </Button>
      </Space>
    </Card>
  );
};

export default Agricultores;