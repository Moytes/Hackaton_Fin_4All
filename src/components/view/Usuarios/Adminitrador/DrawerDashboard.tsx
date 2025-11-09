import React from 'react';
import { Drawer, Menu } from 'antd';
import {
  SolutionOutlined,
  CarOutlined,
  TeamOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';

interface Props {
  open: boolean;
  onClose: () => void;
  onSelect: (key: string) => void;
}

const DrawerDashboard: React.FC<Props> = ({ open, onClose, onSelect }) => {
  return (
    <Drawer title="Panel de Control" placement="left" onClose={onClose} open={open}>
      <Menu
        mode="inline"
        onClick={({ key }) => onSelect(key)}
        items={[
          { key: 'agricultores', icon: <SolutionOutlined />, label: 'Agricultores' },
          { key: 'logistica', icon: <CarOutlined />, label: 'Logística' },
          { key: 'distribuidores', icon: <TeamOutlined />, label: 'Distribuidores' },
          { key: 'faltantes', icon: <ExclamationCircleOutlined />, label: 'Faltantes' },
        ]}
      />
    </Drawer>
  );
};

export default DrawerDashboard;
