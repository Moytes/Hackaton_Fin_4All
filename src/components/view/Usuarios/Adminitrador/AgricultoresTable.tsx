import React from 'react';
import { Table, Button, Tag } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { agricultoresData } from '../../../../view/Usurios/Adminitradores/data/mockData';

const AgricultoresTable: React.FC = () => {
  const columns = [
    {
      title: 'Nombre del Agricultor',
      dataIndex: 'nombre',
      key: 'nombre',
      responsive: ['xs' as const, 'sm' as const, 'md' as const, 'lg' as const],
    },
    {
      title: 'Constancia Fiscal',
      dataIndex: 'constanciaFiscal',
      key: 'constanciaFiscal',
      render: (file: string) => (
        <Button type="link" icon={<DownloadOutlined />}>
          {file}
        </Button>
      ),
    },
    {
      title: 'Títulos de Cultivo',
      dataIndex: 'titulosCultivo',
      key: 'titulosCultivo',
      render: (file: string) => (
        <Button type="link" icon={<DownloadOutlined />}>
          {file}
        </Button>
      ),
    },
    {
      title: 'NOMs',
      dataIndex: 'noms',
      key: 'noms',
      render: (noms: string[]) => (
        <>
          {noms.map((nom, index) => (
            <Tag color="green" key={index}>
              {nom}
            </Tag>
          ))}
        </>
      ),
    },
  ];

  return (
    <div className="table-container">
      <Table
        dataSource={agricultoresData}
        columns={columns}
        pagination={{ pageSize: 5 }}
        rowKey="id"
        scroll={{ x: 'max-content' }}
      />
    </div>
  );
};

export default AgricultoresTable;
