import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Typography, Space, Input, Form, Alert, Spin, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useAuth } from '../../../../context/AuthContext';
import { UserRole, ROLES } from '../../../../types/user.types';
import axios from 'axios';
import './Login.css'; // Asegúrate de que el CSS esté en el mismo directorio

const { Title, Text } = Typography;

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated, isLoading: isAuthLoading, user } = useAuth();
  const [form] = Form.useForm();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const redirectToPanel = (role: UserRole) => {
    switch (role) {
      case ROLES.ADMIN:
        navigate('/admin');
        break;
      case ROLES.AGRICULTOR:
        navigate('/agricultor');
        break;
      case ROLES.LOGISTICA:
        navigate('/logistica');
        break;
      case ROLES.AUDITOR:
        navigate('/auditor');
        break;
      case ROLES.DISTRIBUIDOR:
        navigate('/distribuidor');
        break;
      case ROLES.MEDIADOR:
        console.warn('Rol "Mediador" no tiene una ruta de panel definida. Enviando a Inicio.');
        navigate('/');
        break;
      default:
        console.error('Rol desconocido, no se puede redirigir:', role);
        navigate('/');
    }
  };

  useEffect(() => {
    if (isAuthenticated && !isAuthLoading && user) {
      redirectToPanel(user.role);
    }
  }, [isAuthenticated, isAuthLoading, user, navigate]);

  const handleLogin = async (values: any) => {
    setIsLoading(true);
    setError(null);
    try {
      await login(values.email, values.contra);
    } catch (err: any) {
      console.error("Error detallado de login:", err);
      setIsLoading(false);

      if (axios.isAxiosError(err)) {
        if (err.response) {
          const status = err.response.status;
          const data = err.response.data;
          
          if (status === 400) { 
            let msg = Array.isArray(data.message) ? data.message.join(', ') : data.message;
            setError(`Error 400 (Datos Inválidos): ${msg}`);
          } else if (status === 401 || status === 403) {
            setError(`Error ${status}: ${data.message}`);
          } else if (status === 404) { 
            setError(`Error 404: No se encontró el endpoint. (URL: ${err.config?.url})`);
          } else if (status === 500) { 
            setError('Error 500: Error interno del servidor.');
          } else {
            setError(`Error ${status}: ${data.message || 'Error inesperado'}`);
          }
        } else if (err.request) { 
          setError('Error de red: No se pudo conectar al servidor.');
        } else {
          setError(`Error: ${err.message}`);
        }
      } else {
        setError('Ha ocurrido un error inesperado.');
      }
    }
  };

  if (isAuthLoading || isAuthenticated) {
    return <Spin size="large" style={{ display: 'block', margin: '100px auto' }} />;
  }

  return (
    <div className="login-container">
      <Card className="login-card">
        <div className="logo-container">
          <Title level={2} className="logo-text">AGRO</Title>
        </div>

        <Title level={3} className="login-title">Iniciar Sesión</Title>
        <Text type="secondary" className="login-subtitle">
          Ingresa tus credenciales para acceder al sistema.
        </Text>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleLogin}
          className="login-form"
        >
          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'Por favor ingresa tu email' },
              { type: 'email', message: 'Ingresa un email válido' },
            ]}
          >
            <Input
              prefix={<UserOutlined className="input-prefix-icon" />}
              placeholder="Email"
              className="custom-input"
            />
          </Form.Item>

          <Form.Item
            name="contra"
            rules={[{ required: true, message: 'Por favor ingresa tu contraseña' }]}
          >
            <Input.Password
              prefix={<LockOutlined className="input-prefix-icon" />}
              placeholder="Contraseña"
              className="custom-input"
            />
          </Form.Item>

          <Form.Item className="remember-forgot">
            <Checkbox>Recordarme</Checkbox>
            <Button type="link" className="forgot-link" onClick={() => navigate('/forgot-password')}>
              ¿Olvidaste tu contraseña?
            </Button>
          </Form.Item>

          {error && (
            <Form.Item>
              <Alert message={error} type="error" showIcon />
            </Form.Item>
          )}

          <Form.Item>
            <Space direction="vertical" style={{ width: '100%' }} size={12}>
              <Button
                type="primary"
                htmlType="submit"
                loading={isLoading}
                className="btn-login"
              >
                Entrar
              </Button>
              <Button
                onClick={() => navigate('/register')}
                className="btn-register"
              >
                ¿No tienes cuenta? Regístrate
              </Button>
            </Space>
          </Form.Item>
        </Form>

        <Button type="link" onClick={() => navigate('/')} className="btn-back">
          ← Volver al Inicio
        </Button>
      </Card>
    </div>
  );
};

export default Login;