import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { colors } from '../../../themes/Colores';

// ¡CORRECCIÓN!
// Importamos los iconos directamente de @ant-design/icons,
// que viene con la librería 'antd' que ya tienes instalada.
import {
  DashboardOutlined,
  UsergroupAddOutlined,
  BarChartOutlined,
  SettingOutlined,
} from '@ant-design/icons';

/**
 * Estilos CSS en-línea para el layout.
 * Usamos los colores de tu archivo Colores.ts
 */
const styles: { [key: string]: React.CSSProperties } = {
  adminLayout: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    fontFamily: "'Inter', sans-serif", // Una fuente limpia
  },
  header: {
    backgroundColor: colors.greenDarkest,
    color: '#FFFFFF',
    padding: '1rem 2rem',
    fontSize: '1.5rem',
    fontWeight: 'bold',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  mainContainer: {
    display: 'flex',
    flex: 1, // Ocupa el espacio restante
  },
  sidebar: {
    width: '250px',
    backgroundColor: colors.greenMedium,
    padding: '1.5rem',
    color: '#FFFFFF',
    boxShadow: '2px 0 5px rgba(0, 0, 0, 0.1)',
  },
  sidebarNav: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  navLink: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    color: '#FFFFFF',
    textDecoration: 'none',
    padding: '0.75rem 1rem',
    borderRadius: '8px',
    marginBottom: '0.5rem',
    fontSize: '1rem',
    transition: 'background-color 0.3s ease',
  },
  navLinkHover: { // Simulación de hover para aplicar
    backgroundColor: colors.greenDark, // Un verde más oscuro al pasar el ratón
  },
  content: {
    flex: 1,
    padding: '2rem',
    backgroundColor: '#f4f7f6', // Un fondo muy claro
  },
  footer: {
    backgroundColor: colors.yellowDark,
    color: colors.greenDarkest,
    textAlign: 'center',
    padding: '1rem',
    fontWeight: 'bold',
  },
};

/**
 * AdminLayout (Corregido con iconos de Ant Design)
 * Este layout envuelve las vistas privadas del Administrador.
 */
const AdminLayout: React.FC = () => {
  // Función para manejar el hover en los enlaces
  const handleMouseOver = (e: React.MouseEvent<HTMLAnchorElement>) => {
    Object.assign(e.currentTarget.style, styles.navLinkHover);
  };
  const handleMouseOut = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.backgroundColor = 'transparent';
  };

  return (
    <div style={styles.adminLayout}>
      {/* 1. Cabecera */}
      <header style={styles.header}>
        Panel de Administrador
      </header>

      <div style={styles.mainContainer}>
        {/* 2. Menú Lateral */}
        <aside style={styles.sidebar}>
          <nav>
            <ul style={styles.sidebarNav}>
              <li>
                <Link
                  to="/admin" // Enlace a la raíz de admin
                  style={styles.navLink}
                  onMouseOver={handleMouseOver}
                  onMouseOut={handleMouseOut}
                >
                  {/* ¡ICONO CORRECTO! */}
                  <DashboardOutlined />
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/gestionar-usuarios" // Ruta de ejemplo
                  style={styles.navLink}
                  onMouseOver={handleMouseOver}
                  onMouseOut={handleMouseOut}
                >
                  {/* ¡ICONO CORRECTO! */}
                  <UsergroupAddOutlined />
                  Usuarios
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/reportes" // Ruta de ejemplo
                  style={styles.navLink}
                  onMouseOver={handleMouseOver}
                  onMouseOut={handleMouseOut}
                >
                  {/* ¡ICONO CORRECTO! */}
                  <BarChartOutlined />
                  Reportes
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/configuracion" // Ruta de ejemplo
                  style={styles.navLink}
                  onMouseOver={handleMouseOver}
                  onMouseOut={handleMouseOut}
                >
                  {/* ¡ICONO CORRECTO! */}
                  <SettingOutlined />
                  Configuración
                </Link>
              </li>
            </ul>
          </nav>
        </aside>

        {/* 3. Contenido Principal de la Página */}
        <main style={styles.content}>
          <Outlet /> {/* Aquí se renderizan las vistas (ej. <Administradores />) */}
        </main>
      </div>

      {/* 4. Pie de Página */}
      <footer style={styles.footer}>
        © 2025 - Plataforma de Trazabilidad
      </footer>
    </div>
  );
};

export default AdminLayout;