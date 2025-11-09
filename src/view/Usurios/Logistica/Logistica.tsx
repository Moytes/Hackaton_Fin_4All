import React from 'react';
// 1. Importamos 'useAuth' para poder cerrar sesión
import { useAuth } from '../../../context/AuthContext';
// Importa los componentes de Ant Design
import { Button, Card, Typography, Space } from 'antd';

const { Title, Text } = Typography;

/**
 * Vista: src/view/Usuarios/Logistica
 * Corregida para usar el AuthContext
 */
const Logistica: React.FC = () => {
  // 2. Obtenemos la función 'logout' de nuestro contexto
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    // No necesitas 'navigate'. ProtectedRoute se encargará
    // de enviarte a /login automáticamente.
  };

  return (
    <Card>
      <Title level={2}>Panel de Logística</Title>
      <Text type="secondary">Bienvenido a su panel de gestión.</Text>
      <Space wrap className="mt-6">
        {/* Quitamos el botón "Volver al Panel Admin".
          Este es el panel principal de Logística.
          La navegación principal debe estar en el LogisticaLayout.
        */}
        
        {/* 3. El botón ahora llama a handleLogout */}
        <Button danger onClick={handleLogout}>
          Cerrar Sesión
        </Button>
      </Space>
    </Card>
  );
};

export default Logistica;