// src/layouts/Usuarios/UsuariosLayout.tsx (Corregido)
import React, { useState } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { Layout, Button, Typography, theme } from 'antd';
import {
  DashboardOutlined,
  LogoutOutlined,
  MenuOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import { useAuth } from '../../context/AuthContext';
import './AdminLayout.css'; // Asegúrate que la ruta al CSS sea correcta

const { Header, Content } = Layout;
const { Title } = Typography;

const AdminLayout: React.FC = () => {
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

  // ENLACES AJUSTADOS: Solo lo que el backend soporta
  const navLinks = [
    { text: 'Dashboard', href: '/admin', icon: <DashboardOutlined /> },
  ];

  return (
    <div className="layout-puma admin-layout">
      {/* HEADER */}
      <header className="header-aguila">
        <nav className="nav-condor">
          <Link to="/admin" className="logo-jaguar">
            Panel Administrador
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

      {/* MENÚ MÓVIL OVERLAY (Ajustado) */}
      {isMobileMenuOpen && (
        <div 
          className="menu-movil-overlay-buho" 
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
        >
          <div className="menu-movil-contenido-loro">
            <div className="menu-movil-header-tucan">
              <Link to="/admin" className="logo-jaguar" onClick={closeMobileMenu}>
                Panel Administrador
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

      {/* FOOTER (simplificado) */}
      <footer className="footer-ballena">
        <div className="footer-contenido-delfin">
          <div className="footer-copyright-tortuga">
            <p>&copy; {new Date().getFullYear()} Sistema Agrícola. Todos los derechos reservados.</p>
          </div>
          <div className="footer-links-lobo">
            <Link to="/admin" className="footer-link-koala">Dashboard</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AdminLayout;