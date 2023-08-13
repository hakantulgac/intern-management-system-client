/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import {  Button,Popconfirm, Popover, Space, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { CheckCircleOutlined, CloseCircleOutlined, FilterOutlined  } from '@ant-design/icons'
import axios from 'axios';
import { Spin } from 'antd';

interface DataType {
  key:number
  id: number;
  name: string;
  mail:string
  confirmed:boolean;
  school: string;
  grade: number;
  department: string;
  field:string
  completed : number; 
  tag: string;
  resume:string
}

const TableApplications : React.FC<{setHeader:React.Dispatch<React.SetStateAction<string>>}> = (props) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [data,setData] = useState<DataType[]>([])
  const [filter,setFilter] = useState<boolean|null>(null)
  const [key,setKey] = useState(Date.now())

  const columns: ColumnsType<DataType> = [
    {
      title: (
        <Popover
          placement="bottomLeft"
          content={
            <>
              <ol className='text-sm'>
                <li>
                  <Button
                    onClick={async()=>{
                      await setFilter(null)
                      await setKey(Date.now())
                      props.setHeader("Güncel Başvurular")
                    }} 
                    type='default' 
                    className='w-full mb-1'
                  >
                    Güncel Başvurular
                  </Button>
                </li>
                <li>
                  <Button 
                    onClick={async()=>{
                      await setFilter(true)
                      await setKey(Date.now())
                      props.setHeader("Onaylanan Başvurular")
                    }} 
                    type='default' 
                    className='w-full mb-1'
                  >
                    Onaylanan Başvurular
                  </Button>
                </li>
                <li>
                  <Button
                    onClick={async()=>{
                      await setFilter(false)
                      await setKey(Date.now())
                      props.setHeader("Reddedilen Başvurular")
                    }} 
                    type='default' 
                    className='w-full'
                  >
                    Reddedilen Başvurular
                  </Button>
                </li>
              </ol>
            </>
          }
          trigger={"click"}
        >
          <FilterOutlined 
          className='pl-3 mb-2 text-gray-400 hover:text-gray-200'
          />
        </Popover>
      ),
      dataIndex: 'key',
      key: 'key',
      align : "left",
      width : "50px",
      render: (text, record, index) => index + 1
    },
    {
      title: 'İsim',
      dataIndex: 'name',
      key: 'name',
      align : "left",
      width : "250px",
    },
    {
      title: 'Mail Adresi',
      dataIndex: 'mail',
      key: 'mail',
      align : "left",
      width : "250px",
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
      title: 'Kabul',
      key: 'action',
      align : "left",
      width : "100px",
      render: (_, record) => (
        <Space size="large" className='text-center cursor-pointer'>
          <Popconfirm
            title="Başvuru Kabul"
            description="Onaylıyor musunuz?"
            onConfirm={()=>Confirm(record)}
            onCancel={() => {}}
            okText="Evet"
            cancelText="İptal"
          >
            <CheckCircleOutlined className='pl-[10px] mb-1 text-2xl text-green-700 hover:text-green-400 duration-300'/>
          </Popconfirm>
        </Space>
      ),
    },
    {
      title: 'Ret',
      key: 'action',
      align : "left",
      width : "100px",
      render: (_, record) => (
        <Space size="large" className='text-center cursor-pointer'>
          <Popconfirm
            title="Başvuru İptal"
            description="Onaylıyor musunuz?"
            onConfirm={()=>Deny(record)}
            onCancel={() => {}}
            okText="Evet"
            cancelText="İptal"
          >
            <CloseCircleOutlined className='pl-[10px] mb-1 text-2xl text-red-700 hover:text-red-400 duration-300'/>
          </Popconfirm>
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
  
  const Confirm = (record:DataType)=>{
    const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("");
    let pass = "";
    for(let i=0;i<8;i++){
      var index = Math.floor(Math.random() * chars.length-2)+1;
      pass += chars[index];
    }
    const subject = "Staj İçin Yaptığınız Başvuru Onaylandı"
    const object = "Sisteme ilk giriş için şifreniz: "+pass
    axios.post(`../interns/sendmail`,{to:record.mail,subject:subject,object:object}).catch(err=>console.log(err))
    axios.post('../users',JSON.stringify({name:record.mail,password:pass,role:"intern",field:record.field}),
      {headers:{"Content-type":"Application/json"}}
    )
    axios.put(`../interns/${record.id}`, JSON.stringify({...record,confirmed:true}), {
      headers: { "Content-Type": "application/json" },
    }).catch(err=>console.log(err))
  }
  
  const Deny = (record:DataType)=>{
    axios.put(`../interns/${record.id}`, JSON.stringify({...record,confirmed:false}), {
      headers: { "Content-Type": "application/json" },
    }).catch(err=>console.log(err))
  }

  const fetchData = async()=>{
    let internArr:DataType[] = []
    await axios.get('../interns')
    .then(res=>{
      internArr =res.data
    }).catch(err=>{
      console.log(err)
    })
    
    setData(internArr)
  }

  useEffect(()=>{
    fetchData()
  },[])

  useEffect(() => {
    setLoading(false)
  }, [data]);

  return (
    <Spin spinning={loading}>
      <Table 
        key={key} 
        pagination={false} 
        className="ml-16 mt-28 mb-10" 
        columns={columns} 
        dataSource={data.filter(item=>item.confirmed===filter)} />
    </Spin>
  )
}

export default TableApplications
