/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { Checkbox, Divider,Input } from "antd";
import axios from "axios";
import dayjs from "dayjs";

interface typePlan {
  id: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
}
interface typeIntern {
  id: number;
  name: string;
  grade: number;
  school: string;
  department: string;
  field: string;
  completed: number;
}
interface typeDetail {
  id: number;
  intern: typeIntern;
  plan: typePlan;
  startDate: string;
  endDate: string;
  done: boolean;
  point:number
}

const EditPlanModal: React.FC<{
  detail: typeDetail[];
  internId: string;
}> = (props) => {

  const putDetail = (item: typeDetail, updatedDetail: typeDetail) => {
    axios
      .put(`details/${item.id}`, JSON.stringify(updatedDetail), {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onChange = (detail: typeDetail, key: number) => {
    
    const now = dayjs().format("YYYY-MM-DD");
    if (!detail.done) {
      if (detail.endDate !== "-") {
        alert("Çalışma henüz başlamadı")

      } else {
        putDetail(detail, { ...detail, endDate: now, done: true });
        let foundedNext = true;
        props.detail.map((item, index) => {
          if (index !== key) {
            if ((item.endDate == "-" || item.endDate == "") && foundedNext) {
              putDetail(item, { ...item, startDate: now, endDate: "-" });
              foundedNext = false;
            }
          }
        });
      }
    } else {
      putDetail(detail, { ...detail, endDate: "-", done: false });
      props.detail.slice(key + 1).map((item) => {
        if (item.endDate == "-") {
          putDetail(item, { ...item, endDate: "", done: false });
        }
      });
    }
  };

  return (
    <div className="mt-5">
      {props.detail
        .sort((a, b) => a.id - b.id)
        .map((detail, key) => (
          <>
            <div className="flex justify-start gap-10">
              <Checkbox
                key={key}
                children={detail.plan.title}
                className="flex mb-5 bottom-1"
                defaultChecked={detail.done}
                onChange={() => onChange(detail, key)}
              />
            </div>
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
