import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Typography, Space, Input, Form, Alert, Spin } from 'antd';
import { useAuth } from '../../../../context/AuthContext';
import { UserRole, ROLES } from '../../../../types/user.types';
import axios from 'axios';

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

  if (isAuthLoading) {
    return <Spin size="large" style={{ display: 'block', margin: '100px auto' }} />;
  }

  if (isAuthenticated) {
    return <Spin size="large" style={{ display: 'block', margin: '100px auto' }} />;
  }

  return (
    <Card style={{ maxWidth: 400, margin: 'auto' }}>
      <Title level={2}>Login</Title>
      <Text type="secondary">Ingrese sus credenciales para continuar.</Text>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleLogin}
        className="mt-6"
      >
        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: 'Por favor ingrese su email' },
            { type: 'email', message: 'Ingrese un email válido' },
          ]}
        >
          <Input placeholder="Email" />
        </Form.Item>

        <Form.Item
          name="contra"
          label="Contraseña"
          rules={[{ required: true, message: 'Por favor ingrese su contraseña' }]}
        >
          <Input.Password placeholder="Contraseña" />
        </Form.Item>

        {error && (
          <Form.Item>
            <Alert message={error} type="error" showIcon />
          </Form.Item>
        )}

        <Form.Item>
          <Space direction="vertical" style={{ width: '100%' }}>
            <Button
              type="primary"
              htmlType="submit"
              loading={isLoading}
              style={{ width: '100%' }}
            >
              Entrar
            </Button>
            <Button
              onClick={() => navigate('/register')}
              style={{ width: '100%' }}
            >
              ¿No tienes cuenta? Regístrate
            </Button>
          </Space>
        </Form.Item>
      </Form>

      <Button type="link" onClick={() => navigate('/')} className="mt-4 px-0">
        Volver a Inicio
      </Button>
    </Card>
  );
};

export default Login;