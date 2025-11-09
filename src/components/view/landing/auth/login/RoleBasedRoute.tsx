import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../../../../context/AuthContext';
import { UserRole } from '../../../../../types/user.types';
import { Typography } from 'antd';

const { Title, Text } = Typography;

interface RoleBasedRouteProps {
  allowedRoles: UserRole[];
}
export const RoleBasedRoute: React.FC<RoleBasedRouteProps> = ({
  allowedRoles,
}) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const hasPermission = allowedRoles.includes(user.role);

  if (hasPermission) {
    return <Outlet />;
  }

  return (
    <div style={{ padding: '2rem' }}>
      <Title level={2} type="danger">Acceso Denegado</Title>
      <Text>No tienes los permisos necesarios ({user.role}) para ver esta página.</Text>
    </div>
  );
};