import React from 'react';
import { useNavigate } from 'react-router-dom';
// 1. Importamos 'useAuth' para poder cerrar sesión
import { useAuth } from '../../../context/AuthContext';
import { Button, Card, Typography, Space } from 'antd';

const { Title, Text } = Typography;

const Administradores: React.FC = () => {
  const navigate = useNavigate();
  // 2. Obtenemos la función 'logout' de nuestro contexto
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    // No necesitas 'navigate'. ProtectedRoute se encargará
    // de enviarte a /login automáticamente.
  };

  return (
    <Card>
      <Title level={2}>Panel de Administradores</Title>
      <Text type="secondary">Gestión de administradores del sistema.</Text>
      
      <Title level={5} className="mt-4">Navegar a otros paneles:</Title>
      <Space wrap>
        {/* 3. CORREGIMOS LAS RUTAS */}
        <Button onClick={() => navigate('/agricultor')}>
          Ver Agricultores
        </Button>
        <Button onClick={() => navigate('/auditor')}>
          Ver Auditores
        </Button>
        <Button onClick={() => navigate('/distribuidor')}>
          Ver Distribuidores
        </Button>
        <Button onClick={() => navigate('/logistica')}>
          Ver Logística
        </Button>
        
        {/* 4. CORREGIMOS EL CIERRE DE SESIÓN */}
        <Button danger onClick={handleLogout}>
          Cerrar Sesión
        </Button>
      </Space>
    </Card>
  );
};

export default Administradores;