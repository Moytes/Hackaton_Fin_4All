import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Typography, Space } from 'antd';

const { Title, Text } = Typography;

const Administradores: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Card>
      <Title level={2}>Panel de Administradores</Title>
      <Text type="secondary">Gestión de administradores del sistema.</Text>
      
      <Title level={5} className="mt-4">Navegar a otros paneles:</Title>
      <Space wrap>
        <Button onClick={() => navigate('/admin/agricultores')}>
          Ver Agricultores
        </Button>
        <Button onClick={() => navigate('/admin/auditores')}>
          Ver Auditores
        </Button>
        <Button onClick={() => navigate('/admin/distribuidores')}>
          Ver Distribuidores
        </Button>
        <Button onClick={() => navigate('/admin/logistica')}>
          Ver Logística
        </Button>
        <Button danger onClick={() => navigate('/login')}>
          Cerrar Sesión
        </Button>
      </Space>
    </Card>
  );
};

export default Administradores;