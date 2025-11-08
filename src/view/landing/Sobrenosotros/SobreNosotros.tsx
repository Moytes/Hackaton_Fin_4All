import React from 'react';
import { useNavigate } from 'react-router-dom';
// Importa los componentes de Ant Design
import { Button, Card, Typography, Space } from 'antd';

const { Title, Text } = Typography;

/**
 * Vista: src/view/landing/Sobrenosotros
 */
const SobreNosotros: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Card>
      <Title level={2}>Sobre Nosotros</Title>
      <Text type="secondary">Esta es la página de "Sobre Nosotros". Aquí puedes describir tu proyecto o empresa.</Text>
      <Space wrap className="mt-6">
        <Button onClick={() => navigate('/')}>
          Volver a Inicio
        </Button>
      </Space>
    </Card>
  );
};

export default SobreNosotros;