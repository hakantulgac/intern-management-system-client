/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import {  Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Link } from "react-router-dom";
import axios from 'axios';
import { Spin } from 'antd';

interface DataType {
  id: number;
  name: string;
  school: string;
  grade: number;
  department: string;
  completed : number; 
  tag: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: '',
    dataIndex: 'id',
    key: 'id',
    align : "left",
    width : "50px",
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'İsim',
    dataIndex: 'name',
    key: 'name',
    align : "left",
    width : "250px",
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Sınıf',
    dataIndex: 'grade',
    width : "100px",
    align : "left",
    key: 'grade',
  },
  {
    title: 'Okul',
    dataIndex: 'school',
    align : "left",
    width : "200px",
    key: 'school',
  },
  {
    title: 'Bölüm',
    dataIndex: 'department',
    align : "left",
    width : "200px",
    key: 'department',
  },
  {
    title: 'Alan',
    key: 'field',
    align : "left",
    width : "200px",
    dataIndex: 'field',
  },
  {
    title: 'Tamamlandı %',
    dataIndex: 'completed',
    width : "100px",
    align : "left",
    key: 'completed',
  },
  {
    title: 'Seçenekler',
    key: 'action',
    align : "left",
    width : "100px",
    render: (_, record) => (
      <Space size="large">
        <Link to='/internDetail'>Görüntüle</Link>
        <a className="hover:text-red-500 transition duration-150">Sil</a>
      </Space>
    ),
  },
];

const TableIntern : React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [data,setData] = useState<DataType[]>([])

  const fetchData = async()=>{
    await axios.get('interns').
    then(res=>{
      setData(res.data)
    }).catch(err=>{
      console.log(err)
    })
  }
  
  useEffect(()=>{
    fetchData()
  },[])

  useEffect(() => {
    setLoading(false)
  }, [data]);

  return (
    <Spin spinning={loading}>
      <Table pagination={false} className="mt-20 mb-10" columns={columns} dataSource={data} />
    </Spin>
  )
}

export default TableIntern