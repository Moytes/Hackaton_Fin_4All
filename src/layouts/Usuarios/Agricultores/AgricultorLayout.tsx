import React, { useState } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { Layout, Button, Typography, theme } from 'antd';
import {
  DashboardOutlined,
  LogoutOutlined,
  BlockOutlined,
  CalendarOutlined,
  MenuOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import { useAuth } from '../../../context/AuthContext';
import './AgricultorLayout.css';

const { Header, Content } = Layout;
const { Title } = Typography;

const AgricultorLayout: React.FC = () => {
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

  // Enlaces de navegación para el agricultor
  const navLinks = [
    { text: 'Panel Principal', href: '/agricultor', icon: <DashboardOutlined /> },
    { text: 'Mis Cultivos', href: '/agricultor/mis-cultivos', icon: <BlockOutlined /> },
    { text: 'Cosechas', href: '/agricultor/cosechas', icon: <CalendarOutlined /> },
  ];

  return (
    <div className="layout-puma agricultor-layout">
      {/* HEADER IDÉNTICO AL LANDING */}
      <header className="header-aguila">
        <nav className="nav-condor">
          <Link to="/agricultor" className="logo-jaguar">
            Panel Agricultor
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
              <Link to="/agricultor" className="logo-jaguar" onClick={closeMobileMenu}>
                Panel Agricultor
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

      {/* FOOTER (Opcional - puedes eliminarlo si no lo necesitas) */}
      <footer className="footer-ballena">
        <div className="footer-contenido-delfin">
          <div className="footer-copyright-tortuga">
            <p>&copy; {new Date().getFullYear()} Sistema Agrícola. Todos los derechos reservados.</p>
          </div>

          <div className="footer-links-lobo">
            <Link to="/agricultor" className="footer-link-koala">Panel Principal</Link>
            <Link to="/agricultor/mis-cultivos" className="footer-link-koala">Mis Cultivos</Link>
            <Link to="/agricultor/cosechas" className="footer-link-koala">Cosechas</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AgricultorLayout;