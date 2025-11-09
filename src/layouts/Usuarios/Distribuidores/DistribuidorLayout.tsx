import React, { useState } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { Layout, Button, Typography, theme } from 'antd';
import {
  DashboardOutlined,
  LogoutOutlined,
  TeamOutlined,
  ShopOutlined,
  ContainerOutlined,
  MenuOutlined,
  CloseOutlined,
  SafetyCertificateOutlined, // <-- ICONO AÑADIDO
} from '@ant-design/icons';
import { useAuth } from '../../../context/AuthContext';
import './DistribuidorLayout.css';

const { Header, Content } = Layout;
const { Title } = Typography;

const DistribuidorLayout: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleLogout = () => {
    logout();
  };

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  // Enlaces de navegación para el distribuidor
  const navLinks = [
    { text: 'Panel Distribución', href: '/distribuidor', icon: <DashboardOutlined /> },
    { text: 'Gestión de Pedidos', href: '/distribuidor/pedidos', icon: <ContainerOutlined /> },
    { text: 'Inventario y Stock', href: '/distribuidor/inventario', icon: <TeamOutlined /> },
    { text: 'Validación', href: '/distribuidor/validacion', icon: <SafetyCertificateOutlined /> }, // <-- ENLACE AÑADIDO
  ];

  return (
    <div className="layout-puma distribuidor-layout">
      {/* HEADER IDÉNTICO AL LANDING */}
      <header className="header-aguila">
        <nav className="nav-condor">
          <Link to="/distribuidor" className="logo-jaguar">
            Panel Distribuidor
          </Link>
          
          <div className="nav-escritorio-gacela">
            {navLinks.map((link) => (
              <Link
                key={link.text}
                to={link.href}
                className="nav-enlace-colibri"
              >
                {link.icon}
                <span>{link.text}</span>
              </Link>
            ))}
            
            {/* Botón Cerrar Sesión en desktop */}
            <Button
              type="primary"
              danger
              icon={<LogoutOutlined />}
              onClick={handleLogout}
              className="nav-enlace-colibri logout-btn"
            >
              Cerrar Sesión
            </Button>
          </div>

          {/* Botón menú móvil */}
          <div className="nav-boton-movil-contenedor">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="nav-boton-movil-halcon"
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen}
            >
              <span className="sr-only">Abrir menú principal</span>
              {isMobileMenuOpen ? <CloseOutlined className="h-6 w-6" /> : <MenuOutlined className="h-6 w-6" />}
            </button>
          </div>
        </nav>
      </header>

      {/* MENÚ MÓVIL OVERLAY */}
      {isMobileMenuOpen && (
        <div 
          className="menu-movil-overlay-buho" 
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
        >
          <div className="menu-movil-contenido-loro">
            <div className="menu-movil-header-tucan">
              <Link to="/distribuidor" className="logo-jaguar" onClick={closeMobileMenu}>
                Panel Distribuidor
              </Link>
              <button
                onClick={closeMobileMenu}
                className="nav-boton-movil-halcon"
              >
                <span className="sr-only">Cerrar menú</span>
                <CloseOutlined className="h-6 w-6" />
              </button>
            </div>

            <nav className="menu-movil-nav-pelicano">
              {navLinks.map((link) => (
                <Link
                  key={link.text}
                  to={link.href}
                  onClick={closeMobileMenu}
                  className="menu-movil-enlace-quetzal"
                >
                  {link.icon}
                  {link.text}
                </Link>
              ))}
              
              {/* Botón Cerrar Sesión en móvil */}
              <Button
                type="primary"
                danger
                icon={<LogoutOutlined />}
                onClick={() => {
                  closeMobileMenu();
                  handleLogout();
                }}
                className="menu-movil-enlace-quetzal logout-btn-mobile"
              >
                Cerrar Sesión
              </Button>
            </nav>
          </div>
        </div>
      )}

      {/* CONTENIDO PRINCIPAL */}
      <main className="main-contenido-oso">
        <div className="main-contenido-interno-tapir">
          <Outlet />
        </div>
      </main>

      {/* FOOTER */}
      <footer className="footer-ballena">
        <div className="footer-contenido-delfin">
          <div className="footer-copyright-tortuga">
            <p>&copy; {new Date().getFullYear()} Plataforma de Distribución. Todos los derechos reservados.</p>
          </div>

          <div className="footer-links-lobo">
            {/* Actualizamos también los links del footer */}
            <Link to="/distribuidor" className="footer-link-koala">Panel Distribución</Link>
            <Link to="/distribuidor/pedidos" className="footer-link-koala">Gestión de Pedidos</Link>
            <Link to="/distribuidor/inventario" className="footer-link-koala">Inventario</Link>
            <Link to="/distribuidor/validacion" className="footer-link-koala">Validación</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DistribuidorLayout;