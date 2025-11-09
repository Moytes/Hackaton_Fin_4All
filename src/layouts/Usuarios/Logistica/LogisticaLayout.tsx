import React, { useState } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { Layout, Menu, Button, Typography, Grid, theme } from 'antd';
import {
  TruckOutlined, // Ícono principal para Logística
  LogoutOutlined,
  EnvironmentOutlined, // Ícono para "Rutas"
  CarryOutOutlined, // Ícono para "Entregas"
  MenuOutlined, // Ícono para el menú móvil
} from '@ant-design/icons';
// 1. Importa el hook 'useAuth' para cerrar sesión
import { useAuth } from '../../../context/AuthContext';
// 2. Importa el archivo CSS
import './LogisticaLayout.css';

const { Header, Sider, Content } = Layout;
const { useBreakpoint } = Grid;

const LogisticaLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const screens = useBreakpoint(); // Hook para detectar el tamaño de pantalla
  
  // 3. Obtén la función 'logout' del contexto
  const { logout } = useAuth();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // 4. Corrige la función 'handleLogout'
  const handleLogout = () => {
    logout();
    // No necesitas 'navigate'. El ProtectedRoute se encargará
    // de redirigir a /login automáticamente.
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
    <Layout className="logistica-layout">
      {/* --- MENÚ LATERAL (SIDER) --- */}
      <Sider
        // Se colapsa automáticamente en pantallas menores a 'lg' (992px)
        breakpoint="lg"
        // En pantallas 'xs' (móvil), se oculta por completo (width 0)
        collapsedWidth={screens.xs ? 0 : 80}
        // No mostramos el trigger nativo en móvil
        trigger={screens.xs ? null : undefined}
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        theme="dark"
        className="layout-sider"
      >
        <div className="layout-sider-logo">
          {collapsed ? 'L' : 'Logística'}
        </div>
        
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={menuItems}
        />
        
        {/* Botón de Logout en el Sider */}
        <div className="layout-sider-logout">
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
      <Layout>
        
        {/* Header */}
        <Header className="layout-header" style={{ background: colorBgContainer }}>
          {/* Solo muestra el botón de menú en pantallas móviles/tablets */}
          {!screens.lg && (
            <Button
              type="text"
              icon={<MenuOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              className="menu-trigger-mobile"
            />
          )}
          <Typography.Title level={4} style={{ margin: 0, marginLeft: screens.lg ? 0 : 16 }}>
            Panel de Logística
          </Typography.Title>
        </Header>
        
        {/* Contenido de la página */}
        <Content
          className="layout-content"
          style={{
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
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