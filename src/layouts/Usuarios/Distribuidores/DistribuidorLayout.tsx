import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import {
  Layout,
  Menu,
  Button,
  theme,
  Avatar,
  Typography,
  Space,
} from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DashboardOutlined,
  TeamOutlined,
  LogoutOutlined,
  ShopOutlined,
  ContainerOutlined,
} from '@ant-design/icons';

const { Header, Sider, Content, Footer } = Layout;
const { Title, Text } = Typography;

/**
 * Layout: layouts/Usuarios/Distribuidores/DistribuidorLayout.tsx
 * Este es el layout principal para los usuarios del rol Distribuidor.
 * Proporciona un menú lateral (Sider) y un área de contenido (Content)
 * donde se renderizarán las vistas secundarias (usando <Outlet />).
 */
const DistribuidorLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // Función para manejar clics en el menú y navegar
  // Tambien maneja la lógica de cerrar sesión
  const handleMenuClick = ({ key }: { key: string }) => {
    if (key === 'logout') {
      // Aquí iría tu lógica para limpiar tokens/estado de autenticación
      console.log('Cerrando sesión...');
      navigate('/login');
    } else {
      // Navega a la ruta correspondiente
      navigate(key);
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        width={250}
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
          background: colorBgContainer,
          borderRight: '1px solid #f0f0f0',
        }}
      >
        {/* Logo o Título del Sider */}
        <div
          style={{
            height: 64,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px',
            borderBottom: '1px solid #f0f0f0',
          }}
        >
          <Space>
            <Avatar
              shape="square"
              size="large"
              icon={<ShopOutlined />}
              style={{ backgroundColor: '#1890ff' }}
            />
            {!collapsed && (
              <Title level={4} style={{ margin: 0, whiteSpace: 'nowrap' }}>
                Distribuidor
              </Title>
            )}
          </Space>
        </div>

        {/* Menú de Navegación */}
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={['/distribuidor']}
          onClick={handleMenuClick}
          style={{ borderRight: 0, paddingTop: '16px' }}
          items={[
            {
              key: '/distribuidor',
              icon: <DashboardOutlined />,
              label: 'Panel Distribución',
            },
            {
              key: '/distribuidor/pedidos',
              icon: <ContainerOutlined />,
              label: 'Gestión de Pedidos',
            },
            {
              key: '/distribuidor/inventario',
              icon: <TeamOutlined />,
              label: 'Inventario y Stock',
            },
            {
              type: 'divider',
            },
            {
              key: 'logout',
              icon: <LogoutOutlined />,
              label: 'Cerrar Sesión',
              danger: true,
            },
          ]}
        />
      </Sider>

      {/* Contenido Principal */}
      <Layout style={{ marginLeft: collapsed ? 80 : 250, transition: 'all 0.2s' }}>
        <Header style={{ padding: '0 24px', background: colorBgContainer, display: 'flex', alignItems: 'center', borderBottom: '1px solid #f0f0f0' }}>
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
          <Text style={{ fontSize: '16px', marginLeft: '16px' }}>
            Portal de Distribuidores
          </Text>
        </Header>

        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {/* Aquí se renderizarán las vistas (Agricultores, MisCultivos, etc.) */}
          <Outlet />
        </Content>

        <Footer style={{ textAlign: 'center' }}>
          Plataforma de Trazabilidad ©{new Date().getFullYear()}
        </Footer>
      </Layout>
    </Layout>
  );
};

export default DistribuidorLayout;