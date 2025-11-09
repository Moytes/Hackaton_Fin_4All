// src/view/Usurios/Adminitradores/Administradores.tsx (Limpio)
import React from 'react';
import { Card, Typography, Tabs } from 'antd';
import {
  UserAddOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
// Importamos la tabla de faltantes, que ahora será la principal
// Importamos el nuevo formulario que crearemos
import CrearUsuarioForm from '../../../components/view/Usuarios/Adminitrador/CrearUsuarioForm'; 
import './css/Administradores.css';

const { Title, Text } = Typography;

const Administradores: React.FC = () => {
  return (
    <div className="admin-panel-container">
      <div className="bg-animation">
        <div className="circle circle-1"></div>
        <div className="circle circle-2"></div>
        <div className="circle circle-3"></div>
      </div>

      <Card className="admin-card" variant="borderless">
        <Title level={2} className="admin-title">
          Panel de Administradores
        </Title>
        <Text className="admin-subtitle">
          Gestión de usuarios del sistema.
        </Text>

        <Tabs
          defaultActiveKey="crear"
          centered
          className="admin-tabs"
          items={[
            {
              key: 'crear',
              label: (
                <span>
                  <UserAddOutlined /> Crear Nuevo Usuario
                </span>
              ),
              children: <CrearUsuarioForm />,
            },
            {
              key: 'validar',
              label: (
                <span>
                  <ExclamationCircleOutlined /> Usuarios Pendientes (No disponible)
                </span>
              ),
              children: (
                <div style={{ textAlign: 'center', padding: '40px', color: '#999' }}>
                  <ExclamationCircleOutlined style={{ fontSize: 48, color: '#ff4d4f' }} />
                  <Title level={4}>Funcionalidad no disponible</Title>
                  <Text>
                    El backend no tiene el endpoint para listar usuarios pendientes.<br />
                    Solo se permite crear nuevos usuarios.
                  </Text>
                </div>
              ),
              disabled: true, // ← Deshabilitamos la pestaña
            },
          ]}
        />
      </Card>
    </div>
  );
};

export default Administradores;