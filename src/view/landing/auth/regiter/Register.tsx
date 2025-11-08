import React from 'react';
import { useNavigate } from 'react-router-dom';
// Importa los componentes de Ant Design
import { Button, Card, Typography, Space } from 'antd';

const { Title, Text } = Typography;

/**
 * Vista: src/view/landing/auth/Register
 */
const Register: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Card style={{ maxWidth: 400, margin: 'auto' }}>
      <Title level={2}>Registro</Title>
      <Text type="secondary">Cree una nueva cuenta para acceder.</Text>
      {/* Aquí iría un formulario de registro */}
      <Space wrap className="mt-6">
        <Button type="primary" onClick={() => navigate('/login')}>
          ¿Ya tienes cuenta? Inicia Sesión
        </Button>
      </Space>
    </Card>
  );
};

export default Register;