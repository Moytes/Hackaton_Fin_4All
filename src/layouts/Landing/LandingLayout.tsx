import React, { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import {
  MenuOutlined,
  CloseOutlined,
  HomeOutlined,
  InfoCircleOutlined,
  MailOutlined,
  LoginOutlined,
  FacebookOutlined,
  TwitterOutlined,
  LinkedinOutlined,
  InstagramOutlined
} from '@ant-design/icons';

import './landing-layout-animales.css';

const LandingLayout: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { text: 'Inicio', href: '/', icon: <HomeOutlined /> },
    { text: 'Sobre Nosotros', href: '/sobre-nosotros', icon: <InfoCircleOutlined /> },
    { text: 'Contacto', href: '/contactos', icon: <MailOutlined /> }, 
    { text: 'Login', href: '/login', icon: <LoginOutlined /> } 
  ];

  return (
    <div className="layout-puma">
      <header className="header-aguila">
        <nav className="nav-condor">
          <Link to="/" className="logo-jaguar">
            TuLogo
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
          </div>
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

      {isMobileMenuOpen && (
        <div 
          className="menu-movil-overlay-buho" 
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
        >
          <div className="menu-movil-contenido-loro">
            <div className="menu-movil-header-tucan">
              <Link to="/" className="logo-jaguar" onClick={() => setIsMobileMenuOpen(false)}>
                TuLogo
              </Link>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
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
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="menu-movil-enlace-quetzal"
                >
                  {link.icon}
                  {link.text}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}

      <main className="main-contenido-oso">
        <div className="main-contenido-interno-tapir">
          <Outlet />
        </div>
      </main>

      <footer className="footer-ballena">
        <div className="footer-contenido-delfin">
          <div className="footer-copyright-tortuga">
            <p>&copy; {new Date().getFullYear()} Mi Aplicación. Todos los derechos reservados.</p>
          </div>

          <div className="footer-links-lobo">
            <Link to="/sobre-nosotros" className="footer-link-koala">Sobre Nosotros</Link>
            <Link to="/contactos" className="footer-link-koala">Contacto</Link>
            <Link to="/login" className="footer-link-koala">Login</Link>
            <Link to="/register" className="footer-link-koala">Registrarse</Link>
          </div>
          <div className="footer-social-pulpo">
            <a href="#" className="footer-social-enlace-estrella" aria-label="Facebook">
              <FacebookOutlined />
            </a>
            <a href="#" className="footer-social-enlace-estrella" aria-label="Twitter">
              <TwitterOutlined />
            </a>
            <a href="#" className="footer-social-enlace-estrella" aria-label="LinkedIn">
              <LinkedinOutlined />
            </a>
            <a href="#" className="footer-social-enlace-estrella" aria-label="Instagram">
              <InstagramOutlined />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingLayout;