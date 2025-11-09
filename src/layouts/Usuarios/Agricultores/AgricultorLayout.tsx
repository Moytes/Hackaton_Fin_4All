import React, { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Layout, Button, Typography, theme } from 'antd';
import {
  DashboardOutlined,
  LogoutOutlined,
  BlockOutlined,
  CalendarOutlined,
  MenuOutlined,
  CloseOutlined,
  ShoppingCartOutlined,
  FileDoneOutlined,
  FileProtectOutlined,
} from '@ant-design/icons';
import { useAuth } from '../../../context/AuthContext';
import './AgricultorLayout.css';

const { Header } = Layout;
const { Title } = Typography;

const AgricultorLayout: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { logout } = useAuth();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleLogout = () => {
    logout();
  };

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  // MENÚ COMPLETO
  const navLinks = [
    { text: 'Panel Principal', href: '/agricultor', icon: <DashboardOutlined /> },
    { text: 'Crear Oferta',    href: '/agricultor/crear-oferta', icon: <ShoppingCartOutlined /> },
    { text: 'Mis Ofertas',     href: '/agricultor/ofertas',      icon: <FileDoneOutlined /> },
    { text: 'Validación',      href: '/agricultor/validacion',   icon: <FileProtectOutlined /> },
  ];

  return (
    <div className="layout-puma agricultor-layout">

      {/* HEADER */}
      <header className="header-aguila">
        <nav className="nav-condor">
          <Link to="/agricultor" className="logo-jaguar">
            Panel Agricultor
          </Link>

          {/* ESCRITORIO */}
          <div className="nav-escritorio-gacela">
            {navLinks.map((link) => (
              <Link key={link.text} to={link.href} className="nav-enlace-colibri">
                {link.icon}
                <span>{link.text}</span>
              </Link>
            ))}

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

          {/* MÓVIL */}
          <div className="nav-boton-movil-contenedor">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="nav-boton-movil-halcon"
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen}
            >
              <span className="sr-only">Menú</span>
              {isMobileMenuOpen ? <CloseOutlined /> : <MenuOutlined />}
            </button>
          </div>
        </nav>
      </header>

      {/* MENÚ MÓVIL */}
      {isMobileMenuOpen && (
        <div className="menu-movil-overlay-buho" id="mobile-menu" role="dialog">
          <div className="menu-movil-contenido-loro">
            <div className="menu-movil-header-tucan">
              <Link to="/agricultor" className="logo-jaguar" onClick={closeMobileMenu}>
                Panel Agricultor
              </Link>
              <button onClick={closeMobileMenu} className="nav-boton-movil-halcon">
                <CloseOutlined />
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

              <Button
                type="primary"
                danger
                icon={<LogoutOutlined />}
                onClick={() => { closeMobileMenu(); handleLogout(); }}
                className="menu-movil-enlace-quetzal logout-btn-mobile"
              >
                Cerrar Sesión
              </Button>
            </nav>
          </div>
        </div>
      )}

      {/* CONTENIDO */}
      <main className="main-contenido-oso">
        <div className="main-contenido-interno-tapir">
          <Outlet />
        </div>
      </main>

      {/* FOOTER */}
      <footer className="footer-ballena">
        <div className="footer-contenido-delfin">
          <div className="footer-copyright-tortuga">
            <p>&copy; {new Date().getFullYear()} Sistema Agrícola. Todos los derechos reservados.</p>
          </div>

          <div className="footer-links-lobo">
            {navLinks.map((link) => (
              <Link key={link.text} to={link.href} className="footer-link-koala">
                {link.text}
              </Link>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AgricultorLayout;