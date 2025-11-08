import React from 'react';
import { useNavigate } from 'react-router-dom';
// Importa los componentes de Ant Design
import { Button, Card, Typography, Space } from 'antd';

const { Title, Text } = Typography;

/**
 * Vista: src/view/Usuarios/Logistica
 */
const Logistica: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Card>
      <Title level={2}>Panel de Logística</Title>
      <Text type="secondary">Gestión de logística.</Text>
      <Space wrap className="mt-6">
        <Button onClick={() => navigate('/admin')}>
          Volver al Panel Admin
        </Button>
        <Button danger onClick={() => navigate('/login')}>
          Cerrar Sesión
        </Button>
      </Space>
    </Card>
  );
};

export default Logistica;