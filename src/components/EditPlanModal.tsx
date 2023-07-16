/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { Checkbox, Divider } from "antd";
import axios from "axios";

interface typePlan {
  id: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
}

interface typeDetail {
  intern: {
    id: number;
    name: string;
    grade: number;
    school: string;
    department: string;
    field: string;
    completed: number;
  };
  plan: typePlan;
  startDate: string;
  endDate: string;
  done: boolean;
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

const EditPlanModal: React.FC<{
  plan: typePlan[];
  detail: typeDetail[];
  internId: string;
}> = (props) => {
  const [intern, setIntern] = useState<typeIntern>();

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

  const disabled = (key: number) => {
    if (key < props.detail.length) {
      return true;
    } else {
      return false;
    }
  };

  const createDetail = (title: string, intern: string) => {
    axios.post("details",JSON.stringify({intern:intern,plan:title,startDate:"2023-02-07",endDate:"2023-02-15",done:true}),
    {headers: { 'Content-Type': 'application/json' }}
    )
  };

  const onChange = (title: string) => {
    createDetail(title, String(intern?.name));
  };

  return (
    <div className="mt-5">
      {props.plan.map((plan, key) => (
        <>
          <Checkbox
            children={plan.title}
            className="flex mb-5 bottom-1"
            disabled={disabled(key)}
            onChange={() => onChange(plan.title)}
          />
          <Divider />
        </>
      ))}

      {/*<Checkbox.Group options={plainOptions} defaultValue={['Apple']} onChange={onChange} />
      <Divider/>
      <Checkbox.Group options={options} defaultValue={['Pear']} onChange={onChange} />
      <Divider/>
      <Checkbox.Group
        options={optionsWithDisabled}
        disabled
        defaultValue={['Apple']}
        onChange={onChange}
      />*/}
    </div>
  );
};

export default EditPlanModal;
