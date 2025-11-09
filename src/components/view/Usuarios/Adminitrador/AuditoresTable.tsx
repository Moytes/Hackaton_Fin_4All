import React from 'react';
import { Table, Tag } from 'antd';

const AuditoresTable: React.FC = () => {
  const data = [
    { id: 1, nombre: 'Luis Hernández', estado: 'Activo' },
    { id: 2, nombre: 'Ana Torres', estado: 'En revisión' },
        { id: 1, nombre: 'Luis Hernández', estado: 'Activo' },
    { id: 2, nombre: 'Ana Torres', estado: 'En revisión' },
        { id: 1, nombre: 'Luis Hernández', estado: 'Activo' },
    { id: 2, nombre: 'Ana Torres', estado: 'En revisión' },
        { id: 1, nombre: 'Luis Hernández', estado: 'Activo' },
    { id: 2, nombre: 'Ana Torres', estado: 'En revisión' },
        { id: 1, nombre: 'Luis Hernández', estado: 'Activo' },
    { id: 2, nombre: 'Ana Torres', estado: 'En revisión' },
  ];

  const columns = [
    { title: 'Nombre del Auditor', dataIndex: 'nombre', key: 'nombre' },
    {
      title: 'Estado',
      dataIndex: 'estado',
      key: 'estado',
      render: (estado: string) => (
        <Tag color={estado === 'Activo' ? 'green' : 'orange'}>{estado}</Tag>
      ),
    },
  ];

  return (
    <Table
      dataSource={data}
      columns={columns}
      pagination={{ pageSize: 5 }}
      rowKey="id"
    />
  );
};

export default AuditoresTable;
