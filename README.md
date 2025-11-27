# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
# README - Fin4All Agricultural Marketplace Platform

## Descripción General

*Fin4All* es una plataforma web de comercio agrícola directo que conecta agricultores con consumidores bajo el lema "Del Campo a tu Mesa" [1](#0-0) . La plataforma elimina intermediarios para crear una cadena de suministro más eficiente [2](#0-1) .

## Stack Tecnológico

- *React 19.2.0* + *TypeScript 4.9.5* [3](#0-2) 
- *React Router DOM 7.9.5* para navegación [4](#0-3) 
- *Ant Design 5.28.0* para componentes UI [5](#0-4) 
- *Create React App* como herramienta de construcción [6](#0-5) 

## Estructura del Proyecto


src/
├── App.tsx                    # Configuración de rutas principal
├── layouts/
│   ├── Landing/              # Layout público (header/footer)
│   └── Usuarios/             # Layout admin (navegación autenticada)
└── view/
    ├── landing/              # Páginas públicas
    │   ├── Inicio/          # Landing page principal
    │   ├── auth/            # Login y registro
    │   ├── Sobrenosotros/   # Página "Sobre Nosotros"
    │   └── Contactos/       # Página de contacto
    └── Usurios/             # Paneles administrativos
        ├── Adminitradores/  # Hub de administración
        ├── Agricultores/    # Panel de agricultores
        ├── Auditores/       # Panel de auditores
        ├── Distribuidores/  # Panel de distribuidores
        └── Logistica/       # Panel de logística
 [7](#0-6) 

## Arquitectura de Rutas

### Rutas Públicas (Landing)
- / - Página principal [8](#0-7) 
- /sobre-nosotros - Información de la plataforma [9](#0-8) 
- /contactos - Formulario de contacto [10](#0-9) 
- /login - Autenticación [11](#0-10) 
- /register - Registro de usuarios [12](#0-11) 

### Rutas Administrativas (Autenticadas)
- /admin - Hub principal de administración [13](#0-12) 
- /admin/agricultores - Gestión de agricultores [14](#0-13) 
- /admin/auditores - Gestión de auditores [15](#0-14) 
- /admin/distribuidores - Gestión de distribuidores [16](#0-15) 
- /admin/logistica - Gestión de logística [17](#0-16) 

## Tipos de Usuario

La plataforma soporta cinco roles de usuario con paneles dedicados<cite />:

1. *Agricultores* - Publican y venden productos agrícolas
2. *Distribuidores* - Facilitan la distribución de productos
3. *Logística* - Gestionan transporte y entrega
4. *Auditores* - Supervisan calidad y cumplimiento
5. *Administradores* - Administración del sistema

## Comandos Disponibles

bash
npm start      # Servidor de desarrollo (localhost:3000)
npm build      # Build de producción
npm test       # Ejecutar tests
 [18](#0-17) 

## Características Principales

### Landing Page
- Hero section con animaciones CSS [19](#0-18) 
- Sección de características destacadas [20](#0-19) 
- Proceso de registro paso a paso [21](#0-20) 
- Call-to-action con navegación a /login [22](#0-21) 

### Sistema de Diseño
- Paleta de colores verde agrícola (#55A630, #AACC00, #80B918)<cite />
- Animaciones CSS personalizadas (float, pulse, shimmer)<cite />
- Diseño responsive con grid de Ant Design [23](#0-22) 

## Estado Actual

Este es un *prototipo frontend estático* sin integración de backend<cite />. Características actuales:
- Navegación completamente del lado del cliente
- Autenticación simulada (sin validación real)
- Sin gestión de estado global
- Datos estáticos definidos en componentes

## Instalación

bash
# Clonar el repositorio
git clone [URL_DEL_REPO]

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm start
 [24](#0-23) 

## Notas

- El proyecto usa Create React App como base [25](#0-24) 
- Existe un typo en la estructura de carpetas: Usurios en lugar de Usuarios [26](#0-25) 
- La aplicación requiere integración futura con backend para funcionalidad completa<cite />

Wiki pages you might want to explore:
- [Overview (Moytes/Hackaton_Fin_4All)](/wiki/Moytes/Hackaton_Fin_4All#1)
- [UI Component Library (Moytes/Hackaton_Fin_4All)](/wiki/Moytes/Hackaton_Fin_4All#3.3)

### Citations

*File:* src/view/landing/Inicio/Inicio.tsx (L3-3)
typescript
import { Button, Typography, Space, Row, Col } from 'antd';


*File:* src/view/landing/Inicio/Inicio.tsx (L29-109)
typescript
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


*File:* src/view/landing/Inicio/Inicio.tsx (L112-178)
typescript
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


*File:* src/view/landing/Inicio/Inicio.tsx (L181-218)
typescript
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


*File:* package.json (L14-14)
json
    "antd": "^5.28.0",


*File:* package.json (L15-19)
json
    "react": "^19.2.0",
    "react-dom": "^19.2.0",
    "react-router-dom": "^7.9.5",
    "react-scripts": "5.0.1",
    "typescript": "^4.9.5",


*File:* package.json (L22-26)
json
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"


*File:* src/App.tsx (L5-25)
typescript
// --- Importación de Layouts ---
// Estos componentes envolverán tus páginas
import LandingLayout from './layouts/Landing/LandingLayout';
import UsuariosLayout from './layouts/Usuarios/UsuariosLayout';

// --- Importación de Vistas (Landing) ---
import Inicio from './view/landing/Inicio/Inicio';
import SobreNosotros from './view/landing/Sobrenosotros/SobreNosotros';
import Contactos from './view/landing/Contactos/Contactos';

// --- Importación de Vistas (Auth) ---
import Login from './view/landing/auth/login/Login';
import Register from './view/landing/auth/regiter/Register';

// --- Importación de Vistas (Usuarios) ---
// Corregí los nombres de 'Usurios' a 'Usuarios' y 'Adminitradores' a 'Administradores' en la importación
import Administradores from './view/Usurios/Adminitradores/Administradores';
import Agricultores from './view/Usurios/Agricultores/Agricultores';
import Auditores from './view/Usurios/Auditores/Auditores';
import Distribuidores from './view/Usurios/Distribuidores/Distribuidores';
import Logistica from './view/Usurios/Logistica/Logistica';


*File:* src/App.tsx (L47-47)
typescript
          <Route index element={<Inicio />} /> 


*File:* src/App.tsx (L50-50)
typescript
          <Route path="sobre-nosotros" element={<SobreNosotros />} />


*File:* src/App.tsx (L51-51)
typescript
          <Route path="contactos" element={<Contactos />} />


*File:* src/App.tsx (L52-52)
typescript
          <Route path="login" element={<Login />} />


*File:* src/App.tsx (L53-53)
typescript
          <Route path="register" element={<Register />} />


*File:* src/App.tsx (L63-63)
typescript
          <Route index element={<Administradores />} />


*File:* src/App.tsx (L66-66)
typescript
          <Route path="agricultores" element={<Agricultores />} />


*File:* src/App.tsx (L67-67)
typescript
          <Route path="auditores" element={<Auditores />} />


*File:* src/App.tsx (L68-68)
typescript
          <Route path="distribuidores" element={<Distribuidores />} />


*File:* src/App.tsx (L69-69)
typescript
          <Route path="logistica" element={<Logistica />} />


*File:* README.md (L1-3)
markdown
# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).


*File:* README.md (L9-12)
markdown
### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
