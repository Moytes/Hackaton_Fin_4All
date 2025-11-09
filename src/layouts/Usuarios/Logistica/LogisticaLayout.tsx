import React, { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { Layout, Menu, Button, Typography, theme } from 'antd';
import {
  TruckOutlined, // Ícono principal para Logística
  LogoutOutlined,
  EnvironmentOutlined, // Ícono para "Rutas"
  CarryOutOutlined, // Ícono para "Entregas"
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

/**
 * Layout: layouts/Usuarios/Logistica/LogisticaLayout.tsx
 * * Este es el layout principal para la sección de Logística.
 * Incluye el menú lateral (Sider) y el área de contenido (Content)
 * donde se renderizarán las vistas anidadas (usando <Outlet />).
 */
const LogisticaLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // Función para manejar el cierre de sesión
  const handleLogout = () => {
    // Aquí iría tu lógica de limpieza de tokens o estado de autenticación
    console.log('Cerrando sesión...');
    navigate('/login');
  };

  // Definición de los ítems del menú específicos para Logística
  const menuItems = [
    {
      key: '1',
      icon: <TruckOutlined />,
      label: <Link to="/logistica">Panel de Logística</Link>,
    },
    {
      key: '2',
      icon: <EnvironmentOutlined />,
      label: <Link to="/logistica/rutas">Gestión de Rutas</Link>, // Ruta de ejemplo
    },
    {
      key: '3',
      icon: <CarryOutOutlined />,
      label: <Link to="/logistica/entregas">Entregas Pendientes</Link>, // Ruta de ejemplo
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* --- MENÚ LATERAL (SIDER) --- */}
      <Sider 
        trigger={null} 
        collapsible 
        collapsed={collapsed}
        theme="dark"
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <div style={{ height: '32px', margin: '16px', background: 'rgba(255, 255, 255, 0.2)', borderRadius: '6px', textAlign: 'center', color: 'white' }}>
          {collapsed ? 'L' : 'Logística'}
        </div>
        
        <Menu 
          theme="dark" 
          mode="inline" 
          defaultSelectedKeys={['1']} 
          items={menuItems}
        />
        
        {/* Botón de Logout en el Sider */}
        <div style={{ position: 'absolute', bottom: '20px', width: '100%', padding: '0 24px' }}>
          <Button
            type="primary"
            danger
            icon={<LogoutOutlined />}
            onClick={handleLogout}
            style={{ width: '100%' }}
          >
            {!collapsed && 'Cerrar Sesión'}
          </Button>
        </div>
      </Sider>

      {/* --- ÁREA PRINCIPAL (DERECHA) --- */}
      <Layout style={{ marginLeft: collapsed ? 80 : 200, transition: 'margin-left 0.2s' }}>
        
        {/* Header */}
        <Header style={{ padding: '0 16px', background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
        
        {/* Contenido de la página */}
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            overflow: 'auto', // Permite scroll si el contenido es largo
          }}
        >
          {/* Aquí es donde React Router renderizará la vista (ej: Logistica.tsx) */}
          <Outlet />
        </Content>

      </Layout>
    </Layout>
  );
};

export default LogisticaLayout;