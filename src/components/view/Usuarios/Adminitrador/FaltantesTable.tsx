import React, { useState } from 'react';
import { Table, Tag, Button, Space, Tooltip, message } from 'antd';
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  FilePdfOutlined,
  DownloadOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import type { Breakpoint } from 'antd/es/_util/responsiveObserver'; // 👈 Import importante

interface Documento {
  nombre: string;
  archivo?: string;
}

interface UsuarioFaltante {
  id: number;
  tipo: 'Agricultor' | 'Logística' | 'Distribuidor';
  nombre: string;
  documentos: Documento[];
  estado: 'Pendiente' | 'Aprobado' | 'Rechazado';
}

const FaltantesTable: React.FC = () => {
  const [usuarios, setUsuarios] = useState<UsuarioFaltante[]>([
    {
      id: 1,
      tipo: 'Agricultor',
      nombre: 'Carlos Díaz',
      documentos: [
        { nombre: 'Constancia de situación fiscal', archivo: 'carlos_fiscal.pdf' },
        { nombre: 'Títulos de propiedad de cultivos', archivo: undefined },
        { nombre: 'NOMs (máx 2)', archivo: 'NOM-037-FITO-1995.pdf' },
      ],
      estado: 'Pendiente',
    },
    {
      id: 2,
      tipo: 'Logística',
      nombre: 'Camino Verde S.A.',
      documentos: [
        { nombre: 'Constancia de situación fiscal', archivo: 'camino_fiscal.pdf' },
        { nombre: 'Permiso SCT', archivo: 'permiso_sct.pdf' },
        { nombre: 'Certificación NOM-068', archivo: undefined },
      ],
      estado: 'Pendiente',
    },
    {
      id: 3,
      tipo: 'Distribuidor',
      nombre: 'AgroDistribuciones MX',
      documentos: [
        { nombre: 'Constancia fiscal', archivo: 'agro_fiscal.pdf' },
        { nombre: 'Licencia SAT', archivo: 'licencia_sat.pdf' },
        { nombre: 'NOM-003-SAGARPA-2016', archivo: 'NOM-003.pdf' },
      ],
      estado: 'Pendiente',
    },
  ]);

  const handleDescargar = (file: string) => {
    const link = document.createElement('a');
    link.href = `/archivos/${file}`;
    link.download = file;
    link.click();
    message.info(`Descargando: ${file}`);
  };

  const handleAprobar = (id: number) => {
    setUsuarios(prev =>
      prev.map(u => (u.id === id ? { ...u, estado: 'Aprobado' } : u))
    );
    message.success('Usuario aprobado correctamente ✅');
  };

  const handleRechazar = (id: number) => {
    setUsuarios(prev =>
      prev.map(u => (u.id === id ? { ...u, estado: 'Rechazado' } : u))
    );
    message.error('Usuario rechazado ❌');
  };

  const columns: ColumnsType<UsuarioFaltante> = [
    {
      title: 'Tipo de Usuario',
      dataIndex: 'tipo',
      key: 'tipo',
      render: (tipo: string) => <Tag color="blue">{tipo}</Tag>,
      responsive: ['xs', 'sm', 'md', 'lg'] as Breakpoint[],
    },
    {
      title: 'Nombre / Empresa',
      dataIndex: 'nombre',
      key: 'nombre',
      render: (nombre: string) => <b>{nombre}</b>,
      responsive: ['xs', 'sm', 'md', 'lg'] as Breakpoint[],
    },
    {
      title: 'Documentos',
      key: 'documentos',
      render: (_: any, record: UsuarioFaltante) => (
        <div className="docs-list">
          {record.documentos.map((doc, i) => (
            <div key={i} style={{ marginBottom: 6 }}>
              <Tag color={doc.archivo ? 'green' : 'red'}>
                <FilePdfOutlined /> {doc.nombre}
              </Tag>
              {doc.archivo ? (
                <Button
                  type="link"
                  icon={<DownloadOutlined />}
                  onClick={() => handleDescargar(doc.archivo!)}
                >
                  {doc.archivo}
                </Button>
              ) : (
                <Tag color="volcano">Faltante</Tag>
              )}
            </div>
          ))}
        </div>
      ),
      responsive: ['xs', 'sm', 'md', 'lg'] as Breakpoint[],
    },
    {
      title: 'Estado',
      dataIndex: 'estado',
      key: 'estado',
      render: (estado: string) => {
        const color =
          estado === 'Aprobado' ? 'green' : estado === 'Rechazado' ? 'volcano' : 'orange';
        return <Tag color={color}>{estado}</Tag>;
      },
      responsive: ['xs', 'sm', 'md', 'lg'] as Breakpoint[],
    },
    {
      title: 'Acciones',
      key: 'acciones',
      render: (_: any, record: UsuarioFaltante) => (
        <Space>
          <Tooltip title="Aprobar usuario">
            <Button
              type="primary"
              icon={<CheckCircleOutlined />}
              onClick={() => handleAprobar(record.id)}
              disabled={record.estado !== 'Pendiente'}
            >
              Aceptar
            </Button>
          </Tooltip>
          <Tooltip title="Rechazar usuario">
            <Button
              danger
              icon={<CloseCircleOutlined />}
              onClick={() => handleRechazar(record.id)}
              disabled={record.estado !== 'Pendiente'}
            >
              Denegar
            </Button>
          </Tooltip>
        </Space>
      ),
      responsive: ['xs', 'sm', 'md', 'lg'] as Breakpoint[],
    },
  ];

  return (
    <div className="table-container">
      <Table
        dataSource={usuarios}
        columns={columns}
        pagination={{ pageSize: 5 }}
        rowKey="id"
        scroll={{ x: 'max-content' }}
        bordered
      />
    </div>
  );
};

export default FaltantesTable;
