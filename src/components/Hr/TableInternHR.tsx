/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import {  Button, Popconfirm, Space, Table, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { DownloadOutlined } from '@ant-design/icons'
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
  field:string
  completed : number;
  resume:string;
  isactive:boolean
}

const TableInternHR : React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [data,setData] = useState<DataType[]>([])
  const [messageApi, contextHolder] = message.useMessage();

  const success = () => {
    messageApi.open({
      type: "loading",
      duration:1.5,
      content: "Dosyalar indiriliyor...",
    });
  };

  const warning = () => {
    messageApi.open({
      type: "error",
      content: "Dosya bulunamadı.",
    });
  };

  function downloadBase64File(base64Data:string, fileName:string) {
    const link = document.createElement('a');
    link.href = base64Data;
    link.download = fileName;
    link.click();
  }
  
  const download =  (id:number,name:string)=>{
    axios.get("../docs/"+id)
    .then((res)=>{
        const accFormBase64 = res.data[0].accForm;
        downloadBase64File(accFormBase64, `${name}-kabul_form.pdf`);
        const criFormBase64 = res.data[0].criRecord;
        downloadBase64File(criFormBase64, `${name}-adli_sicil.pdf`);
        const educFormBase64 = res.data[0].educDoc;
        downloadBase64File(educFormBase64, `${name}-ogrenim_belgesi.pdf`);
        const idFormBase64 = res.data[0].idRegister;
        downloadBase64File(idFormBase64, `${name}-nufus_kayit.pdf`);
        success()
    }).catch(()=>{
      warning()
    })
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
    {
      title: 'Evraklar',
      key: 'action',
      align : "left",
      width : "100px",
      render: (_, record) => (
        <Space size="large">
          <Popconfirm
            title="Dosyalar İndirilecek"
            description="Onaylıyor musunuz?"
            onConfirm={()=>download(record.id,record.name)}
            onCancel={() => {}}
            okText="Evet"
            cancelText="İptal"
          >
            <Button type='default' className='text-[#1677ff]' >
              <div className='flex justify-center gap-1'>
                <div>İndir</div>
                <div className='-mt-1 text-blue-600 text-base'>
                  <DownloadOutlined/>
                </div>
              </div>
            </Button> 
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const fetchData = async()=>{
    let internArr:DataType[] = []
    await axios.get('../interns')
    .then(res=>{
      internArr =res.data
    }).catch(err=>{
      console.log(err)
    })
    const sortedArr = internArr.filter(item=>item.isactive).sort((a,b)=>a.id-b.id)
    for(let i=0;i<sortedArr.length;i++){
      sortedArr[i].key = i+1
    }
    setData(sortedArr.filter(item=>item.isactive))
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
      {contextHolder}
      <Table pagination={false} className="ml-16 mt-28 mb-10" columns={columns} dataSource={data} />
    </Spin>
  )
}

export default TableInternHR