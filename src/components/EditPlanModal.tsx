/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Divider, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface DataType {
  key: React.Key;
  title: string;
  info: string;
  time: number;
}

const columns: ColumnsType<DataType> = [
  {
    title: 'Başlık',
    dataIndex: 'title',
    render: (text: string) => <a>{text}</a>,
  },
  {
    title: 'Bilgiler',
    dataIndex: 'info',
  },
  {
    title: 'Kalan Gün',
    dataIndex: 'time',
  },
];

const data: DataType[] = [
  {
    key: '1',
    title: 'React',
    info: 'React ile aryüz geliştirilmesi',
    time: 5,
  },
  {
    key: '2',
    title: 'React',
    info: 'React ile aryüz geliştirilmesi',
    time: 5,
  },
  {
    key: '3',
    title: 'React',
    info: 'React ile aryüz geliştirilmesi',
    time: 5,
  },
  {
    key: '4',
    title: 'React',
    info: 'React ile aryüz geliştirilmesi',
    time: 5,
  },
  {
    key: '5',
    title: 'React',
    info: 'React ile aryüz geliştirilmesi',
    time: 5,
  },
  {
    key: '6',
    title: 'React',
    info: 'React ile aryüz geliştirilmesi',
    time: 5,
  },
];

// rowSelection object indicates the need for row selection
const rowSelection = {
  onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  getCheckboxProps: (record: DataType) => ({
    disabled: record.title === 'Disabled User', // Column configuration not to be checked
    name: record.title,
  }),
};

const EditPlanModal: React.FC = () => {
  return (
    <div>
      <Divider />
      <Table
        pagination={false}
        rowSelection={{
          type: 'checkbox',
          ...rowSelection,
        }}
        columns={columns}
        dataSource={data}
      />
    </div>
  );
};

export default EditPlanModal;