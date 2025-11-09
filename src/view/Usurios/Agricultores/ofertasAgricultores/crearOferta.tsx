import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Select, InputNumber, message, Typography, Spin, Modal, Card, Row, Col, Divider } from 'antd';
import { SaveOutlined, CloseOutlined, FileTextOutlined, ExclamationCircleOutlined, UserOutlined, IdcardOutlined, CalendarOutlined } from '@ant-design/icons';
import api from '../../../../services/view/landing/auth/login/api';
import { useAuth } from '../../../../context/AuthContext';
import './crearOferta.css';

const { Option } = Select;
const { Title, Text } = Typography;

interface CrearOfertaProps {
  onClose?: () => void;
  onAddOferta?: (data: any) => void;
}

interface Cultivo {
  id: number;
  nombre: string;
}

const CrearOferta: React.FC<CrearOfertaProps> = ({ onClose, onAddOferta }) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [loading, setLoading] = useState(false);
  const [cultivos, setCultivos] = useState<Cultivo[]>([]);
  const [cultivosLoading, setCultivosLoading] = useState(true);

  const currentDate = new Date().toLocaleString('es-MX', {
    dateStyle: 'full',
    timeStyle: 'short',
  });

  // Función para verificar y renovar token
  const checkAndRefreshToken = async (): Promise<boolean> => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        throw new Error('No token found');
      }

      // Verificar si el token está expirado
      const tokenPayload = JSON.parse(atob(token.split('.')[1]));
      const expirationTime = tokenPayload.exp * 1000;
      const currentTime = Date.now();

      if (currentTime >= expirationTime - 300000) {
        console.warn('Token expirado o próximo a expirar');
        
        Modal.confirm({
          title: 'Sesión Expirada',
          icon: <ExclamationCircleOutlined />,
          content: 'Tu sesión ha expirado. Por favor, inicia sesión nuevamente.',
          okText: 'Iniciar Sesión',
          cancelText: 'Cancelar',
          onOk() {
            logout();
            navigate('/login');
          },
          onCancel() {
            if (onClose) onClose();
          }
        });
        return false;
      }
      return true;
    } catch (error) {
      console.error('Error verificando token:', error);
      return false;
    }
  };

  // Cargar lista de cultivos disponibles
  useEffect(() => {
    const fetchCultivos = async () => {
      try {
        const tokenValid = await checkAndRefreshToken();
        if (!tokenValid) return;

        const cultivosSimulados: Cultivo[] = [
          { id: 1, nombre: 'Maíz' },
          { id: 2, nombre: 'Aguacate' },
        ];
        
        setCultivos(cultivosSimulados);
      } catch (error) {
        console.error('Error al cargar cultivos:', error);
        message.error('Error al cargar la lista de cultivos');
      } finally {
        setCultivosLoading(false);
      }
    };

    fetchCultivos();
  }, []);

  const handleFinish = async (values: any) => {
    setLoading(true);
    
    try {
      const tokenValid = await checkAndRefreshToken();
      if (!tokenValid) {
        setLoading(false);
        return;
      }

      console.log('Enviando datos al backend:', values);
      console.log('Usuario actual:', user);

      if (user?.role !== 'agricultor') {
        message.error('Solo los agricultores pueden crear ofertas');
        setLoading(false);
        return;
      }

      const ofertaData = {
        id_cultivo: Number(values.id_cultivo),
        cantidad_disponible: Number(values.cantidad_disponible),
        precio_tonelada: Number(values.precio_tonelada),
        entidad_federativa: values.entidad_federativa.trim(),
      };

      console.log('Datos enviados al backend:', ofertaData);

      const token = localStorage.getItem('accessToken');
      console.log('Token disponible:', !!token);

      const response = await api.post('/oferta-cultivo', ofertaData);
      
      console.log('Respuesta del backend:', response.data);

      message.success('✅ Oferta creada exitosamente');
      
      if (onAddOferta) {
        onAddOferta(response.data);
      }

      if (onClose) {
        onClose();
      }

      navigate('/agricultor/ofertas');

    } catch (error: any) {
      console.error('❌ Error al crear oferta:', error);
      
      let errorMessage = 'Error al crear la oferta';
      let showRelogin = false;
      
      if (error.response) {
        const status = error.response.status;
        const data = error.response.data;
        
        console.error('Status:', status);
        console.error('Datos del error:', data);
        console.error('Headers:', error.response.headers);
        
        if (status === 401) {
          if (data.message === 'Access token expired') {
            errorMessage = 'Tu sesión ha expirado. Por favor, inicia sesión nuevamente.';
            showRelogin = true;
          } else {
            errorMessage = 'No autorizado. Debes ser un agricultor para crear ofertas.';
          }
        } else if (status === 400) {
          errorMessage = data.message || 'Datos inválidos. Verifica la información ingresada.';
        } else if (status === 403) {
          errorMessage = 'No tienes permisos para realizar esta acción.';
        } else if (data.message) {
          errorMessage = data.message;
        }
      } else if (error.request) {
        console.error('Request:', error.request);
        errorMessage = 'No se pudo conectar con el servidor. Verifica tu conexión a internet.';
      } else {
        console.error('Error config:', error.message);
        errorMessage = error.message || 'Error de configuración en la petición.';
      }
      
      message.error(errorMessage);
      
      if (showRelogin) {
        setTimeout(() => {
          Modal.confirm({
            title: 'Sesión Expirada',
            icon: <ExclamationCircleOutlined />,
            content: 'Tu sesión ha expirado. ¿Deseas iniciar sesión nuevamente?',
            okText: 'Iniciar Sesión',
            cancelText: 'Más Tarde',
            onOk() {
              logout();
              navigate('/login');
            }
          });
        }, 1000);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (onClose) {
      onClose();
    }
  };

  if (user && user.role !== 'agricultor') {
    return (
      <div className="crear-oferta-container">
        <Card className="access-denied-card">
          <div className="access-denied-content">
            <ExclamationCircleOutlined className="error-icon" />
            <Title level={3} className="error-title">Acceso Denegado</Title>
            <Text className="error-description">
              Esta función solo está disponible para agricultores registrados en el sistema.
            </Text>
            <Button type="primary" onClick={handleCancel} className="error-button">
              Cerrar
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="crear-oferta-container">
      <Card className="crear-oferta-card">
        {/* Header */}
        <div className="crear-oferta-header">
          <div className="header-content">
            <div className="header-icon-container">
              <FileTextOutlined className="crear-oferta-icon" />
            </div>
            <div className="header-text">
              <Title level={3} className="crear-oferta-title">Nueva Oferta de Cultivo</Title>
              <Text className="crear-oferta-subtitle">
                Complete el formulario para publicar una nueva oferta en el mercado
              </Text>
            </div>
          </div>
        </div>

        <Divider className="section-divider" />

        {cultivosLoading ? (
          <div className="crear-oferta-loading">
            <Spin size="large" />
            <Text className="loading-text">Cargando cultivos disponibles...</Text>
          </div>
        ) : (
          <Form
            form={form}
            layout="vertical"
            onFinish={handleFinish}
            className="crear-oferta-form"
            disabled={loading}
          >
            {/* Información del usuario */}
            <Card className="user-info-card" size="small">
              <div className="user-info-content">
                <div className="user-info-item">
                  <UserOutlined className="user-info-icon" />
                  <div className="user-info-text">
                    <Text strong className="user-info-label">Agricultor:</Text>
                    <Text className="user-info-value">{user?.username}</Text>
                  </div>
                </div>
                <div className="user-info-item">
                  <IdcardOutlined className="user-info-icon" />
                  <div className="user-info-text">
                    <Text strong className="user-info-label">ID:</Text>
                    <Text className="user-info-value">{user?.id}</Text>
                  </div>
                </div>
                <div className="user-info-item">
                  <CalendarOutlined className="user-info-icon" />
                  <div className="user-info-text">
                    <Text strong className="user-info-label">Fecha:</Text>
                    <Text className="user-info-value">{currentDate}</Text>
                  </div>
                </div>
              </div>
            </Card>

            <div className="form-grid">
              <Row gutter={[16, 16]}>
                <Col xs={24} md={12}>
                  {/* Cultivo */}
                  <Form.Item
                    name="id_cultivo"
                    label="Tipo de Cultivo"
                    rules={[{ required: true, message: 'Selecciona el tipo de cultivo' }]}
                    className="form-item"
                  >
                    <Select 
                      placeholder="Selecciona un cultivo"
                      loading={cultivosLoading}
                      size="large"
                      className="form-select"
                    >
                      {cultivos.map((cultivo) => (
                        <Option key={cultivo.id} value={cultivo.id}>
                          {cultivo.nombre}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>

                <Col xs={24} md={12}>
                  {/* Entidad Federativa */}
                  <Form.Item
                    name="entidad_federativa"
                    label="Entidad Federativa"
                    rules={[
                      { required: true, message: 'Ingresa la entidad federativa' },
                      { min: 2, message: 'La entidad federativa debe tener al menos 2 caracteres' }
                    ]}
                    className="form-item"
                  >
                    <Input 
                      placeholder="Ejemplo: Jalisco, Michoacán, Puebla..." 
                      maxLength={100}
                      size="large"
                      className="form-input"
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={[16, 16]}>
                <Col xs={24} md={12}>
                  {/* Cantidad Disponible */}
                  <Form.Item
                    name="cantidad_disponible"
                    label="Cantidad Disponible (toneladas)"
                    rules={[
                      { required: true, message: 'Ingresa la cantidad disponible' },
                      { type: 'number', min: 0.01, message: 'La cantidad debe ser mayor a 0' }
                    ]}
                    className="form-item"
                  >
                    <InputNumber
                      style={{ width: '100%' }}
                      min={0.01}
                      step={0.01}
                      placeholder="Ejemplo: 45.50"
                      precision={2}
                      size="large"
                      className="form-input-number"
                    />
                  </Form.Item>
                </Col>

                <Col xs={24} md={12}>
                  {/* Precio por Tonelada */}
                  <Form.Item
                    name="precio_tonelada"
                    label="Precio por Tonelada (MXN)"
                    rules={[
                      { required: true, message: 'Ingresa el precio por tonelada' },
                      { type: 'number', min: 0.01, message: 'El precio debe ser mayor a 0' }
                    ]}
                    className="form-item"
                  >
                    <InputNumber
                      style={{ width: '100%' }}
                      min={0.01}
                      step={0.01}
                      placeholder="Ejemplo: 12000.00"
                      precision={2}
                      size="large"
                      formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                      parser={value => value?.replace(/\$\s?|(,*)/g, '') as any}
                      className="form-input-number"
                    />
                  </Form.Item>
                </Col>
              </Row>
            </div>

            {/* Información adicional */}
            <Card className="info-card" size="small">
              <div className="info-content">
                <Text className="info-icon">📝</Text>
                <div className="info-text">
                  <Text strong>Nota importante: </Text>
                  <Text>La oferta será revisada y publicada en el sistema. Asegúrese de que toda la información sea correcta.</Text>
                </div>
              </div>
            </Card>

            {/* Botones */}
            <div className="crear-oferta-buttons">
              <Button 
                type="primary" 
                htmlType="submit" 
                icon={<SaveOutlined />}
                loading={loading}
                className="submit-button"
                size="large"
              >
                {loading ? 'Creando Oferta...' : 'Publicar Oferta'}
              </Button>
              <Button 
                onClick={handleCancel} 
                icon={<CloseOutlined />} 
                disabled={loading}
                className="cancel-button"
                size="large"
              >
                Cancelar
              </Button>
            </div>
          </Form>
        )}
      </Card>
    </div>
  );
};

export default CrearOferta;