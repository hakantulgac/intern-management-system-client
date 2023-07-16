import React, { useEffect, useState } from 'react';
import { Descriptions } from 'antd';
import axios from 'axios';

interface infoProps {
  internId:string
}

interface typeIntern{
  id:number
  name:string
  grade:number
  school:string
  department:string
  field:string
  completed:number
}

const App: React.FC<infoProps> = (props) => {
  const [intern,setIntern] = useState<typeIntern>()

  const fetchIntern=async ()=>{
    await axios.get("interns/"+props.internId).
    then(res=>{
      setIntern(res.data)
    }).catch(err=>{
      console.log(err)
    })
  }

  useEffect(()=>{
    fetchIntern()
  },[])

  return (
    <>
    <Descriptions title="Genel Bilgiler:" layout="vertical">
      <Descriptions.Item label="İsim">{intern?.name}</Descriptions.Item>
      <Descriptions.Item label="Sınıf">{intern?.grade}</Descriptions.Item>
      <Descriptions.Item label="Okul">{intern?.school}</Descriptions.Item>
      <Descriptions.Item label="Bölüm">{intern?.department}</Descriptions.Item>
      <Descriptions.Item label="Alan">{intern?.field}</Descriptions.Item>
    </Descriptions>
    </>
  )
};

export default App;

                  