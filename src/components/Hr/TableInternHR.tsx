/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import {  Button, Space, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Link } from "react-router-dom";
import axios from 'axios';
import { Spin } from 'antd';

interface DataType {
  key:number
  id: number;
  name: string;
  mail:string;
  confirmed:boolean;
  school: string;
  grade: number;
  department: string;
  completed : number;
  resume:string;
}

const columns: ColumnsType<DataType> = [
  {
    title: '',
    dataIndex: 'key',
    key: 'key',
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
    title: 'Email',
    dataIndex: 'mail',
    width : "100px",
    align : "left",
    key: 'mail',
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
    title: 'Cv',
    dataIndex: 'resume',
    width : "100px",
    align : "left",
    key: 'resume',
    render: (_, record) => (
      <Space size="large">
        <Button type='default' className='text-[#1677ff]' onClick={()=>{showCv(record.resume)}}>
          Görüntüle
        </Button>
      </Space>
    ),
  },
  {
    title: 'Detaylar',
    key: 'action',
    align : "left",
    width : "100px",
    render: (_, record) => (
      <Space size="large">
        <Link key={record.id} to={`../../hr/internDetail?id=${record.id}`}>
          <Button type='default' className='text-[#1677ff]' >Düzenle</Button>   
        </Link>
      </Space>
    ),
  },
];

const base64ToBlob = (base64: string) => {
  const byteCharacters = atob(base64.split(",")[1]);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  try {
    return new Blob([byteArray], { type: "application/pdf" });
  } catch (error) {
    console.error("Blob conversion error:", error);
    return null; // Blob dönüşümünde hata oluşursa null döndürme
  }
};

const showCv = (resume:string|undefined) => {
  if(resume){
    if(resume){
      let pdfUrl
      const pdfBlob = base64ToBlob(resume);
      if(pdfBlob){
        pdfUrl = URL.createObjectURL(pdfBlob);
      }
      window.open(pdfUrl, "_blank");
    }
  }else{
    alert("cv yüklenmemiş")
  }
  
};

const TableInternHR : React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [data,setData] = useState<DataType[]>([])
  const fetchData = async()=>{
    let internArr:DataType[] = []
    await axios.get('../interns')
    .then(res=>{
      internArr =res.data
    }).catch(err=>{
      console.log(err)
    })
    const sortedArr = internArr.filter(item=>item.confirmed).sort((a,b)=>a.id-b.id)
    for(let i=0;i<sortedArr.length;i++){
      sortedArr[i].key = i+1
    }
    setData(sortedArr.filter(item=>item.confirmed))
  }
  

  useEffect(()=>{
    fetchData()
  },[])

  useEffect(() => {
    setLoading(false)
    console.log(data)
  }, [data]);

  return (
    <Spin spinning={loading}>
      <Table pagination={false} className="ml-16 mt-28 mb-10" columns={columns} dataSource={data} />
    </Spin>
  )
}

export default TableInternHR