import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Typography, Space, Row, Col } from 'antd';
import './inicio.css';

const { Title, Text } = Typography;

/**
 * Vista: src/view/landing/Inicio
 */
const Inicio: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      {/* Animated Background Elements */}
      <div className="bg-animation">
        <div className="floating-element leaf-1">🌿</div>
        <div className="floating-element leaf-2">🍃</div>
        <div className="floating-element leaf-3">🌾</div>
        <div className="floating-element leaf-4">🌱</div>
        <div className="floating-element leaf-5">🌿</div>
        <div className="circle circle-1"></div>
        <div className="circle circle-2"></div>
        <div className="circle circle-3"></div>
      </div>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-grid">
          <div className="hero-content">
            <div className="badge-wrapper">
              <span className="animated-badge">🚀 Sin Intermediarios</span>
            </div>
            <Title level={1} className="hero-title">
              Del <span className="highlight-text">Campo</span> a tu
              <span className="typed-text"> Mesa</span>
            </Title>
            <Text className="hero-subtitle">
              Conecta directamente con agricultores locales. Compra fresco,
              vende justo. Una plataforma diseñada para revolucionar el
              comercio agrícola.
            </Text>
            
            <Space size="large" className="hero-buttons">
              <Button 
                type="primary" 
                size="large" 
                className="btn-primary pulse-button"
                onClick={() => navigate('/login')}
              >
                <span>Empezar Ahora</span>
                <span className="button-arrow">→</span>
              </Button>
              <Button 
                size="large" 
                className="btn-glass"
                onClick={() => navigate('/sobre-nosotros')}
              >
                <span>Descubre Más</span>
              </Button>
            </Space>

            <div className="stats-row">
              <div className="stat-item">
                <div className="stat-number">500+</div>
                <div className="stat-label">Agricultores</div>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <div className="stat-number">1000+</div>
                <div className="stat-label">Productos</div>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <div className="stat-number">100%</div>
                <div className="stat-label">Directo</div>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="visual-card card-1">
              <div className="card-emoji">🌽</div>
              <div className="card-text">Maíz Orgánico</div>
              <div className="card-price">$45/kg</div>
            </div>
            <div className="visual-card card-2">
              <div className="card-emoji">🥕</div>
              <div className="card-text">Zanahorias Frescas</div>
              <div className="card-price">$30/kg</div>
            </div>
            <div className="visual-card card-3">
              <div className="card-emoji">🍅</div>
              <div className="card-text">Tomates Premium</div>
              <div className="card-price">$55/kg</div>
            </div>
            <div className="connection-line line-1"></div>
            <div className="connection-line line-2"></div>
          </div>
        </div>

        <div className="scroll-indicator">
          <div className="mouse">
            <div className="wheel"></div>
          </div>
          <div className="arrow-down">↓</div>
        </div>
      </section>

      {/* Interactive Features Section */}
      <section className="features-section">
        <div className="section-header">
          <span className="section-badge">Beneficios</span>
          <Title level={2} className="section-title">
            ¿Por Qué Somos <span className="gradient-text">Diferentes</span>?
          </Title>
        </div>

        <Row gutter={[32, 32]} className="features-grid">
          <Col xs={24} md={8}>
            <div className="feature-card feature-card-1">
              <div className="card-glow"></div>
              <div className="feature-icon-wrapper">
                <div className="feature-icon">🌾</div>
              </div>
              <Title level={3} className="feature-title">Comercio Directo</Title>
              <Text className="feature-text">
                Elimina intermediarios y obtén mejores precios. 
                Beneficia tanto a productores como a consumidores.
              </Text>
              <div className="feature-decoration">
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
              </div>
            </div>
          </Col>
          
          <Col xs={24} md={8}>
            <div className="feature-card feature-card-2">
              <div className="card-glow"></div>
              <div className="feature-icon-wrapper">
                <div className="feature-icon">⚡</div>
              </div>
              <Title level={3} className="feature-title">Ultra Rápido</Title>
              <Text className="feature-text">
                Publicaciones instantáneas. Contacto directo con clientes.
                Sin complicaciones, solo resultados.
              </Text>
              <div className="feature-decoration">
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
              </div>
            </div>
          </Col>
          
          <Col xs={24} md={8}>
            <div className="feature-card feature-card-3">
              <div className="card-glow"></div>
              <div className="feature-icon-wrapper">
                <div className="feature-icon">💚</div>
              </div>
              <Title level={3} className="feature-title">Comunidad Real</Title>
              <Text className="feature-text">
                Construye relaciones duraderas. Apoya lo local.
                Juntos creamos un futuro sostenible.
              </Text>
              <div className="feature-decoration">
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
              </div>
            </div>
          </Col>
        </Row>
      </section>

      {/* How It Works Section */}
      <section className="process-section">
        <Title level={2} className="section-title-dark">
          Así de <span className="highlight-green">Fácil</span> es Comenzar
        </Title>
        
        <div className="process-timeline">
          <div className="process-step">
            <div className="step-number">1</div>
            <div className="step-content">
              <Title level={4} className="step-title">Regístrate Gratis</Title>
              <Text className="step-text">Crea tu cuenta en segundos</Text>
            </div>
            <div className="step-icon">📝</div>
          </div>

          <div className="timeline-connector"></div>

          <div className="process-step">
            <div className="step-number">2</div>
            <div className="step-content">
              <Title level={4} className="step-title">Publica Productos</Title>
              <Text className="step-text">Lista lo que tienes para ofrecer</Text>
            </div>
            <div className="step-icon">📸</div>
          </div>

          <div className="timeline-connector"></div>

          <div className="process-step">
            <div className="step-number">3</div>
            <div className="step-content">
              <Title level={4} className="step-title">Conecta y Vende</Title>
              <Text className="step-text">Cierra tratos directamente</Text>
            </div>
            <div className="step-icon">🤝</div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <div className="cta-badge">🎉 Únete Hoy</div>
          <Title level={2} className="cta-title">
            Transforma tu Forma de
            <span className="cta-highlight"> Comprar y Vender</span>
          </Title>
          <Text className="cta-text">
            Más de 500 agricultores ya confían en nosotros. 
            Sé parte de la revolución agrícola digital.
          </Text>
          
          <Space size="large" className="cta-buttons">
            <Button 
              type="primary" 
              size="large" 
              className="btn-primary-cta"
              onClick={() => navigate('/login')}
            >
              Comenzar Gratis
            </Button>
            <Button 
              size="large" 
              className="btn-outline-cta"
              onClick={() => navigate('/contactos')}
            >
              Hablar con Nosotros
            </Button>
          </Space>

          <div className="trust-badges">
            <span className="trust-badge">✓ 100% Gratis</span>
            <span className="trust-badge">✓ Sin Comisiones</span>
            <span className="trust-badge">✓ Soporte 24/7</span>
          </div>
        </div>

        <div className="cta-decoration">
          <div className="deco-circle"></div>
          <div className="deco-circle"></div>
          <div className="deco-circle"></div>
        </div>
      </section>
    </div>
  );
};

export default Inicio;