import { Table } from 'antd'
import axios from 'axios';
import React, { useState,useEffect } from 'react'


interface typeDetail {
  id: number;
  intern: {
    id: number;
    name: string;
    grade: number;
    school: string;
    department: string;
    field: string;
    completed: number;
  };
  plan: {
    id: number;
    title: string;
    description: string;
    days: number;
  };
  startDate: string;
  endDate: string;
  done: boolean;
  point: number;
}

const columns = [
    {
      title: "",
      dataIndex:"key",
      key:"key"
    },
    {
      title: 'Çalışma',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Süre',
      dataIndex: 'days',
      key: 'days',
    },
    {
      title: 'Başlangıç',
      dataIndex: 'startDate',
      key: 'startDate',
    },
    {
      title: 'Bitiş',
      dataIndex: 'endDate',
      key: 'endDate',
    },
    {
      title: 'Puan',
      dataIndex: 'point',
      key: 'point',
    },
];

const TableWorks:React.FC<{internId:string}> = (props) => {
  const [data,setData] = useState<typeDetail[]>([])

  const fetchDetail = async () => {
    await axios
    .get("../../details/" + props.internId)
    .then((res) => {
      setData(res.data);
      console.log(res.data)
    })
    .catch((err) => {});
   
  };
  
  useEffect(()=>{
    fetchDetail()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const updatedDataSource = data.sort((a,b)=>a.id-b.id).map((item,index) => {
    if(item.startDate!==""){
      return{
      key: (index+1).toString(), 
      title: item.plan.title,
      days: item.plan.days + " gün", 
      startDate: item.startDate,
      endDate: item.endDate === "" ? "Devam ediyor":item.endDate,
      point: item.endDate === "" ? "-":item.point,
      }
    }
    return{}
  });

  return (
    <div>
        <Table pagination={false} dataSource={updatedDataSource} columns={columns} />
    </div>
  )
}

export default TableWorks