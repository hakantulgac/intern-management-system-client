import { Descriptions } from 'antd'
import dayjs, { Dayjs } from "dayjs";
import React, { useEffect, useState } from "react";
import { CircularProgressbar } from 'react-circular-progressbar';

const userImg: any = require("../../images/user.png");

interface typeIntern {
    id: number;
    name: string;
    mail:string
    grade: number;
    school: string;
    department: string;
    field: string;
    completed: number;
    image: string;
    resume: string;
    startdate:string;
    enddate:string;
}

const InternInfoHR:React.FC<{intern:typeIntern|undefined}> = (props) => {
  const [image,setImage] = useState<any>()
  const [completed,setCompleted] = useState(0)

  useEffect(()=>{
    if(props.intern?.image){
      setImage(props.intern.image)
    }else{
      setImage(userImg)
    }
    const startDate = props.intern?.startdate
    const endDate = props.intern?.enddate
    const toDay = dayjs(Date.now()).format('YYYY-MM-DD')

    const start = dayjs(startDate)
    const end = dayjs(endDate)
    const now = dayjs(toDay)
    
    const diffInternship = end.diff(start,'day')
    const diffNow = now.diff(start,'day')

    setCompleted(
      100/diffInternship*diffNow
    )

  },[props.intern])

  return (
    <div className="flex justify-between gap-20 ">
      <img
        src={String(image)}
        className="w-full h-48"
        alt=""
      />
      <Descriptions title="Genel Bilgiler:" layout="vertical">
        <Descriptions.Item label="İsim">{props.intern?.name}</Descriptions.Item>
        <Descriptions.Item label="Email">{props.intern?.mail}</Descriptions.Item>
        <Descriptions.Item label="Sınıf">{props.intern?.grade}</Descriptions.Item>
        <Descriptions.Item label="Okul">{props.intern?.school}</Descriptions.Item>
        <Descriptions.Item label="Bölüm">
          {props.intern?.department}
        </Descriptions.Item>
        <Descriptions.Item label="Alan">{props.intern?.field}</Descriptions.Item>
        <Descriptions.Item label="Başlangıç Tarihi">{props.intern?.startdate}</Descriptions.Item>
        <Descriptions.Item label="Bitiş Tarihi">{props.intern?.enddate}</Descriptions.Item>
        <Descriptions.Item className="flex items-center" label="Tamamlandı %">
          <CircularProgressbar
            value={(completed)}
            maxValue={100}
            text={`${Math.floor(completed) || 0}%`}
            className="text-black h-24"
          />
        </Descriptions.Item>
      </Descriptions>
    </div>
  )
}

export default InternInfoHR