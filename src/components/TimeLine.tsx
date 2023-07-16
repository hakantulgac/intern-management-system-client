import React, { useEffect, useState } from 'react';
import { Timeline } from 'antd';

interface typePlan{
  id:number
  title:string
  description:string
  startDate:string
  endDate:string
}

interface typeDetail{
  intern:{
    id:number,
    name:string,
    grade:number,
    school:string,
    department:string,
    field:string,
    completed:number
  }
  plan:typePlan
  startDate:string
  endDate:string
  done:boolean
}

const TimeLine: React.FC<{ plan: typePlan[],detail: typeDetail[] }> = (props) => {
  const setColor=(key:number)=>{
    if(key<props.detail.length){
      return '#00CCFF'
    }
    else{
      return 'gray'
    }
  }
  
  const timeLineItems = props.plan.map((data,key)=>({
    children:(
      <>
        <p>{data.title}:</p>
        <p>{data.description}</p>
      </>
    ),
    color:setColor(key)
  }))
  return(
  <Timeline
    items={timeLineItems}
  />
)};

export default TimeLine;