  import React from 'react';
import { Table, Button } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { logisticaData } from '../../../../view/Usurios/Adminitradores/data/mockData';

const LogisticaTable: React.FC = () => {
  const columns = [
    { title: 'Empresa', dataIndex: 'empresa', key: 'empresa' },
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
      title: 'Permiso SCT',
      dataIndex: 'permisoSCT',
      key: 'permisoSCT',
      render: (file: string) => (
        <Button type="link" icon={<DownloadOutlined />}>
          {file}
        </Button>
      ),
    },
    {
      title: 'Certificación NOM',
      dataIndex: 'certificacionNOM',
      key: 'certificacionNOM',
      render: (file: string) => (
        <Button type="link" icon={<DownloadOutlined />}>
          {file}
        </Button>
      ),
    },
  ];

  return (
    <div className="table-container">
      <Table
        dataSource={logisticaData}
        columns={columns}
        pagination={{ pageSize: 5 }}
        rowKey="id"
        scroll={{ x: 'max-content' }}
      />
    </div>
  );
};

export default LogisticaTable;
