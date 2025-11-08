import React from 'react';
// Importa el hook 'useNavigate' para la navegación
import { useNavigate } from 'react-router-dom';
// Importa los componentes de Ant Design
import { Button, Card, Typography, Space } from 'antd';

const { Title, Text } = Typography;

/**
 * Vista: src/view/landing/Inicio
 */
const Inicio: React.FC = () => {
  // Inicializa el hook de navegación
  const navigate = useNavigate();

  return (
    <Card>
      <Title level={2}>Inicio</Title>
      <Text type="secondary">Bienvenido a la página principal de la aplicación. hola</Text>
      <Space wrap className="mt-6">
        {/* Usa componentes de Ant Design */}
        <Button onClick={() => navigate('/sobre-nosotros')}>
          Sobre Nosotros
        </Button>
        <Button onClick={() => navigate('/contactos')}>
          Contactos
        </Button>
        <Button type="primary" onClick={() => navigate('/login')}>
          Iniciar Sesión
        </Button>
      </Space>
    </Card>
  );
};

export default Inicio;