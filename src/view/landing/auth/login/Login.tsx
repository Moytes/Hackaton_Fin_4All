import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// Importa los componentes de Ant Design
import { Button, Card, Typography, Space, Input, Form, message } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
// Importa el CSS
import './CSS/Login.css';

const { Title, Text } = Typography;

/**
 * Vista: src/view/landing/auth/login/Login.tsx
 */
const Login: React.FC = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  // Simula un login exitoso
  const handleLogin = async (values: { email: string; password: string }) => {
    setLoading(true);

    try {
      // Aquí iría tu lógica de autenticación...
      console.log('Login con:', values);

      // Simular delay de autenticación
      await new Promise(resolve => setTimeout(resolve, 1000));

      message.success('¡Inicio de sesión exitoso!');
      // al ser exitoso, navegas al panel de admin
      navigate('/admin');
    } catch (error) {
      message.error('Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <Card>
        {/* Espacio para el logo */}
        <div className="logo-container">
          {/* Aquí irá el logo */}
          <div className="logo-placeholder">
            <Text type="secondary">Logo</Text>
          </div>
        </div>

            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <Title level={2}>¡Bienvenido!</Title>
              <Text type="secondary">Ingrese sus credenciales para continuar.</Text>
            </div>
        <Form
          form={form}
          onFinish={handleLogin}
          layout="vertical"
          className="mt-6"
          requiredMark={false}
        >
          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'Por favor ingrese su correo electrónico' },
              { type: 'email', message: 'Por favor ingrese un correo válido' },
              {
                pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                message: 'Formato de correo inválido'
              }
            ]}
          >
            <Input
              prefix={<MailOutlined />}
              placeholder="correo@ejemplo.com"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              { required: true, message: 'Por favor ingrese su contraseña' },
              { min: 8, message: 'La contraseña debe tener al menos 8 caracteres' },
              {
                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                message: 'Debe contener mayúsculas, minúsculas y números'
              }
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Contraseña"
              size="large"
            />
          </Form.Item>

          <Form.Item className="mt-6">
            <Button
              type="primary"
              htmlType="submit"
              block
              size="large"
              loading={loading}
              className="btn-login"
            >
              Iniciar Sesión
            </Button>
          </Form.Item>

          <Form.Item>
            <Button
              block
              size="large"
              onClick={() => navigate('/register')}
              className="btn-register"
            >
              ¿No tienes cuenta? Regístrate
            </Button>
          </Form.Item>
        </Form>

        <Button
          type="link"
          onClick={() => navigate('/')}
          className="btn-back"
          block
        >
          Volver a Inicio
        </Button>
      </Card>
    </div>
  );
};

export default Login;