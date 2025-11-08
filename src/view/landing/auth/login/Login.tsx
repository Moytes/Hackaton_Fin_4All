import React from 'react';
import { useNavigate } from 'react-router-dom';
// Importa los componentes de Ant Design
import { Button, Card, Typography, Space, Input } from 'antd';

const { Title, Text } = Typography;

/**
 * Vista: src/view/landing/auth/Login
 */
const Login: React.FC = () => {
  const navigate = useNavigate();

  // Simula un login exitoso
  const handleLogin = () => {
    // Aquí iría tu lógica de autenticación...
    // al ser exitoso, navegas al panel de admin
    navigate('/admin');
  };

  return (
    <Card style={{ maxWidth: 400, margin: 'auto' }}>
      <Title level={2}>Login</Title>
      <Text type="secondary">Ingrese sus credenciales para continuar.</Text>
      <Space direction="vertical" style={{ width: '100%' }} className="mt-6">
        <Input placeholder="Email" />
        <Input.Password placeholder="Contraseña" />
      </Space>
      <Space wrap className="mt-6">
        <Button type="primary" onClick={handleLogin}>
          Entrar (Simulado)
        </Button>
        <Button onClick={() => navigate('/register')}>
          ¿No tienes cuenta? Regístrate
        </Button>
      </Space>
      <Button type="link" onClick={() => navigate('/')} className="mt-4 px-0">
        Volver a Inicio
      </Button>
    </Card>
  );
};

export default Login;