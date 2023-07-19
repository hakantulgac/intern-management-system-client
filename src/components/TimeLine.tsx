import React, { useEffect, useState } from "react";
import { Timeline } from "antd";

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
    startDate: string;
    endDate: string;
  };
  startDate: string;
  endDate: string;
  done: boolean;
}

const isDone = (data:typeDetail)=>{
  if(data.done){
    return 'green'
  }else{
    if(data.endDate=="-"){
      return 'blue'
    }else{
      return 'gray'
    }
  }
}

const TimeLine: React.FC<{detail:typeDetail[]}> = (
  props
) => {

  const timeLineItems = props.detail.sort((a,b)=>a.id-b.id).map((data)=> ({
    children: (
      <>
        <p>{data.plan.title}:</p>
        <p>{data.plan.description}</p>
      </>
    ),
    color: isDone(data),
  }));
  return <Timeline items={timeLineItems}/>;
};

export default TimeLine;
