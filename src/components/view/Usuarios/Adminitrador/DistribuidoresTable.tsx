import React from 'react';
import { Table, Button } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { distribuidoresData } from '../../../../view/Usurios/Adminitradores/data/mockData';

const DistribuidoresTable: React.FC = () => {
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
      title: 'Licencia / Alta SAT',
      dataIndex: 'licenciaSAT',
      key: 'licenciaSAT',
      render: (file: string) => (
        <Button type="link" icon={<DownloadOutlined />}>
          {file}
        </Button>
      ),
    },
    {
      title: 'NOM',
      dataIndex: 'nom',
      key: 'nom',
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
        dataSource={distribuidoresData}
        columns={columns}
        pagination={{ pageSize: 5 }}
        rowKey="id"
        scroll={{ x: 'max-content' }}
      />
    </div>
  );
};

export default DistribuidoresTable;
