import React from 'react';
import { useNavigate } from 'react-router-dom';
// Importa los componentes de Ant Design
import { Button, Card, Typography, Space } from 'antd';

const { Title, Text } = Typography;

/**
 * Vista: src/view/landing/Contactos
 */
const Contactos: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Card>
      <Title level={2}>Contactos</Title>
      <Text type="secondary">Información de contacto, formulario, etc.</Text>
      <Space wrap className="mt-6">
        <Button onClick={() => navigate('/')}>
          Volver a Inicio
        </Button>
      </Space>
    </Card>
  );
};

export default Contactos;