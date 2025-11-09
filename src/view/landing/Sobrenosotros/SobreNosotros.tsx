import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Typography, Space, Drawer, Row, Col, Divider, Tag, Image } from 'antd';
import {
  UserOutlined,
  SafetyOutlined,
  CarOutlined,
  CheckCircleOutlined,
  CrownOutlined,
  ShoppingOutlined,
  FileProtectOutlined,
  DollarOutlined,
  TeamOutlined,
  ArrowLeftOutlined
} from '@ant-design/icons';
import './CSS/SobreNosotros.css';

// Importar imágenes
import agricultoresFelices1 from './imagesSobreNosotros/agricultoresfelices1.jpg';
import agricultoresFelices2 from './imagesSobreNosotros/agricultoresfelices2.jpg';
import agricultoresImage from './imagesSobreNosotros/agricultoresImage.jpg';
import distribuidoresImage from './imagesSobreNosotros/distribuidoresImage.jpg';
import logisticaImage from './imagesSobreNosotros/logisticaImage.jpg';
import auditoresImage from './imagesSobreNosotros/auditoresImage.jpg';

const { Title, Text, Paragraph } = Typography;

const SobreNosotros: React.FC = () => {
  const navigate = useNavigate();
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [drawerContent, setDrawerContent] = useState<{title: string; content: React.ReactElement} | null>(null);

  const showDrawer = (title: string, content: React.ReactElement) => {
    setDrawerContent({ title, content });
    setDrawerVisible(true);
  };

  const userTypes = [
    {
      icon: <UserOutlined />,
      title: 'Agricultores',
      description: 'Vendedores directos de mercancía agrícola',
      color: '#2b9348',
      image: agricultoresImage,
      detail: (
        <>
          <div style={{ marginBottom: 20 }}>
            <Image
              src={agricultoresImage}
              alt="Agricultores trabajando en el campo"
              style={{
                width: '100%',
                height: '200px',
                objectFit: 'cover',
                borderRadius: '8px'
              }}
              preview={false}
            />
          </div>
          <Paragraph>
            Los agricultores son el corazón de nuestra plataforma. Pueden ofrecer su mercancía de manera anónima y segura, evitando intermediarios que reducen sus ganancias.
          </Paragraph>
          <Paragraph strong>Requisitos para registro:</Paragraph>
          <ul>
            <li>Cumplimiento con la <strong>Ley Federal de Sanidad Vegetal</strong></li>
            <li>Certificación en <strong>Buenas Prácticas Agrícolas (BPA)</strong></li>
            <li>Aplicación de técnicas según <strong>NTC 5400 de México</strong></li>
          </ul>
          <Paragraph>
            Esto garantiza que solo productos de calidad ingresen al mercado, protegiendo tanto a productores como a consumidores.
          </Paragraph>
        </>
      )
    },
    {
      icon: <ShoppingOutlined />,
      title: 'Distribuidores',
      description: 'Compradores y comercializadores',
      color: '#55a630',
      image: distribuidoresImage,
      detail: (
        <>
          <div style={{ marginBottom: 20 }}>
            <Image
              src={distribuidoresImage}
              alt="Distribuidores gestionando productos agrícolas"
              style={{
                width: '100%',
                height: '200px',
                objectFit: 'cover',
                borderRadius: '8px'
              }}
              preview={false}
            />
          </div>
          <Paragraph>
            Los distribuidores tienen acceso directo a productos agrícolas de calidad certificada. Pueden conectar con agricultores sin necesidad de intermediarios.
          </Paragraph>
          <Paragraph>
            <strong>Beneficios:</strong>
          </Paragraph>
          <ul>
            <li>Acceso a productos certificados</li>
            <li>Negociación directa con productores</li>
            <li>Trazabilidad completa de productos</li>
            <li>Precios justos sin sobrecostos</li>
          </ul>
        </>
      )
    },
    {
      icon: <CarOutlined />,
      title: 'Logística',
      description: 'Empresas de transporte y trailers',
      color: '#80b918',
      image: logisticaImage,
      detail: (
        <>
          <div style={{ marginBottom: 20 }}>
            <Image
              src={logisticaImage}
              alt="Servicios de logística y transporte"
              style={{
                width: '100%',
                height: '200px',
                objectFit: 'cover',
                borderRadius: '8px'
              }}
              preview={false}
            />
          </div>
          <Paragraph>
            Las empresas de logística son fundamentales para conectar a agricultores con distribuidores. Ofrecen servicios de transporte confiables y seguros.
          </Paragraph>
          <Paragraph strong>Servicios disponibles:</Paragraph>
          <ul>
            <li>Transporte refrigerado</li>
            <li>Rutas optimizadas</li>
            <li>Seguimiento en tiempo real</li>
            <li>Manejo especializado de productos agrícolas</li>
          </ul>
        </>
      )
    },
    {
      icon: <CheckCircleOutlined />,
      title: 'Auditores',
      description: 'Validadores de perfiles y cumplimiento',
      color: '#aacc00',
      image: auditoresImage,
      detail: (
        <>
          <div style={{ marginBottom: 20 }}>
            <Image
              src={auditoresImage}
              alt="Auditores verificando calidad y cumplimiento"
              style={{
                width: '100%',
                height: '200px',
                objectFit: 'cover',
                borderRadius: '8px'
              }}
              preview={false}
            />
          </div>
          <Paragraph>
            Los auditores garantizan la integridad de la plataforma, validando que todos los usuarios cumplan con los requisitos legales y de calidad establecidos.
          </Paragraph>
          <Paragraph strong>Responsabilidades:</Paragraph>
          <ul>
            <li>Verificación de certificaciones</li>
            <li>Auditoría de cumplimiento normativo</li>
            <li>Validación de identidad de usuarios</li>
            <li>Resolución de disputas</li>
          </ul>
        </>
      )
    },
    {
      icon: <CrownOutlined />,
      title: 'Administradores',
      description: 'Gestión de la plataforma',
      color: '#007f5f',
      image: agricultoresFelices1, // Usando una imagen existente para administradores
      detail: (
        <>
          <div style={{ marginBottom: 20 }}>
            <Image
              src={agricultoresFelices1}
              alt="Administradores gestionando la plataforma"
              style={{
                width: '100%',
                height: '200px',
                objectFit: 'cover',
                borderRadius: '8px'
              }}
              preview={false}
            />
          </div>
          <Paragraph>
            Los administradores supervisan el funcionamiento general de la plataforma, asegurando un ambiente seguro y eficiente para todos los usuarios.
          </Paragraph>
          <Paragraph strong>Funciones principales:</Paragraph>
          <ul>
            <li>Gestión de usuarios y perfiles</li>
            <li>Monitoreo de transacciones</li>
            <li>Soporte técnico y atención al usuario</li>
            <li>Análisis de datos y reportes</li>
          </ul>
        </>
      )
    }
  ];

  const features = [
    {
      icon: <SafetyOutlined />,
      title: 'Protección contra extorsión',
      content: 'Eliminamos intermediarios abusivos que cobran "piso" o comisiones excesivas. Los agricultores venden directamente su producto.'
    },
    {
      icon: <FileProtectOutlined />,
      title: 'Control de calidad certificado',
      content: 'Todos los productos cumplen con BPA y normativas NTC 5400, garantizando estándares de calidad sin desperdicios. Incluso la merma se comercializa.'
    },
    {
      icon: <DollarOutlined />,
      title: 'Opciones de financiamiento',
      content: 'Para agricultores con recursos limitados, ofrecemos créditos y préstamos a través de empresas privadas confiables, evitando el coyotaje.'
    },
    {
      icon: <TeamOutlined />,
      title: 'Comercio justo y transparente',
      content: 'Una plataforma tipo LinkedIn agrícola donde todos los actores se conectan de manera segura, anónima cuando sea necesario, y transparente.'
    }
  ];

  return (
    <div className="sobrenosotros-container">
      <Card className="main-card">
        {/* Hero Section con imagen */}
        <div className="hero-section">
          <div className="hero-image-container">
            <img
              src={agricultoresFelices1}
              alt="Agricultores felices trabajando en el campo"
              className="hero-image"
            />
          </div>
          <Title level={1}>Sobre Nosotros</Title>
          <Paragraph className="hero-subtitle">
            Revolucionando el comercio agrícola en México
          </Paragraph>
        </div>

        <Divider />

        {/* Misión con imagen */}
        <section className="mission-section">
          <Row gutter={[32, 32]} align="middle">
            <Col xs={24} md={12}>
              <div className="mission-image-container">
                <img
                  src={agricultoresFelices2}
                  alt="Agricultores mostrando sus productos"
                  className="mission-image"
                />
              </div>
            </Col>
            <Col xs={24} md={12}>
              <Title level={2}>
                <SafetyOutlined /> Nuestra Misión
              </Title>
              <Paragraph className="mission-text">
                Creamos una plataforma para mejorar el <strong>trabajo decente, innovación e infraestructura, producción y consumo responsable </strong> donde los agricultores pueden
                ofrecer su mercancía de manera <strong>anónima y segura</strong>, conectándose directamente con
                distribuidores, empresas de logística y auditores certificados.
              </Paragraph>
              <Paragraph className="mission-text">
                Nuestro objetivo es <strong>eliminar las extorsiones</strong> que enfrentan
                los productores, permitiéndoles
                vender su propio producto sin intermediarios abusivos.
              </Paragraph>
            </Col>
          </Row>
        </section>

        <Divider />

        {/* Tipos de Usuario */}
        <section className="users-section">
          <Title level={2}>
            <TeamOutlined /> Tipos de Usuario
          </Title>
          <Row gutter={[24, 24]} className="user-cards">
            {userTypes.map((user, index) => (
              <Col xs={24} sm={12} lg={8} key={index}>
                <Card
                  hoverable
                  className="user-card"
                  onClick={() => showDrawer(user.title, user.detail)}
                >
                  <div className="user-icon" style={{ color: user.color }}>
                    {user.icon}
                  </div>
                  <Title level={4}>{user.title}</Title>
                  <Text type="secondary">{user.description}</Text>
                  <div className="card-footer">
                    <Text className="learn-more">Ver más →</Text>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </section>

        <Divider />

        {/* Características principales con imágenes */}
        <section className="features-section">
          <Title level={2}>¿Cómo lo logramos?</Title>
          <Row gutter={[24, 24]}>
            {features.map((feature, index) => (
              <Col xs={24} md={12} key={index}>
                <Card className="feature-card">
                  <div className="feature-image-container">
                    <img
                      src={index % 2 === 0 ? agricultoresFelices1 : agricultoresFelices2}
                      alt={feature.title}
                      className="feature-image"
                    />
                  </div>
                  <div className="feature-icon">{feature.icon}</div>
                  <Title level={4}>{feature.title}</Title>
                  <Paragraph>{feature.content}</Paragraph>
                </Card>
              </Col>
            ))}
          </Row>
        </section>

        <Divider />

        {/* Regulación y Calidad con banner */}
        <section className="regulation-section">
          <div className="regulation-banner">
            <img
              src={agricultoresFelices1}
              alt="Normativas y certificaciones agrícolas"
              className="regulation-banner-image"
            />
          </div>
          <Title level={3}>
            <FileProtectOutlined /> Cumplimiento Normativo
          </Title>
          <Paragraph>
            Para garantizar la calidad y seguridad, todos los agricultores deben cumplir con:
          </Paragraph>
          <Row gutter={[16, 16]}>
            <Col xs={24} md={8}>
              <Card className="regulation-card">
                <div className="regulation-icon-container">
                  <FileProtectOutlined style={{ fontSize: '48px', color: '#52c41a' }} />
                </div>
                <Tag color="green" className="regulation-tag">Obligatorio</Tag>
                <Title level={5}>Ley Federal de Sanidad Vegetal</Title>
                <Text>Regulación de producción primaria</Text>
              </Card>
            </Col>
            <Col xs={24} md={8}>
              <Card className="regulation-card">
                <div className="regulation-icon-container">
                  <CheckCircleOutlined style={{ fontSize: '48px', color: '#52c41a' }} />
                </div>
                <Tag color="green" className="regulation-tag">Obligatorio</Tag>
                <Title level={5}>BPA - Buenas Prácticas Agrícolas</Title>
                <Text>Estándares de calidad en producción</Text>
              </Card>
            </Col>
            <Col xs={24} md={8}>
              <Card className="regulation-card">
                <div className="regulation-icon-container">
                  <SafetyOutlined style={{ fontSize: '48px', color: '#52c41a' }} />
                </div>
                <Tag color="green" className="regulation-tag">Obligatorio</Tag>
                <Title level={5}>NTC 5400 de México</Title>
                <Text>Técnicas y normativas específicas</Text>
              </Card>
            </Col>
          </Row>
        </section>

        <Divider />

        {/* Call to Action */}
        <div className="cta-section">
          <Title level={3}>¿Listo para unirte?</Title>
          <Paragraph>
            Forma parte de la revolución agrícola que está transformando México
          </Paragraph>
          <Space size="large" wrap className="cta-buttons">
            <Button
              type="primary"
              size="large"
              onClick={() => navigate('/register')}
            >
              Registrarse Ahora
            </Button>
            <Button
              size="large"
              icon={<ArrowLeftOutlined />}
              onClick={() => navigate('/')}
            >
              Volver a Inicio
            </Button>
          </Space>
        </div>
      </Card>

      {/* Drawer para detalles */}
      <Drawer
        title={drawerContent?.title}
        placement="right"
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
        width={window.innerWidth < 768 ? '100%' : 600}
        className="user-drawer"
      >
        {drawerContent?.content}
      </Drawer>
    </div>
  );
};

export default SobreNosotros;