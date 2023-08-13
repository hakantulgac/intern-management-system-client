import React, { useEffect, useState } from "react";
import {
  Calendar,
  Card,
  Col,
  Popover,
  Row,
  Spin,
  message,
} from "antd";
import { CheckSquareOutlined, CloseSquareOutlined, DeleteOutlined } from "@ant-design/icons";
import dayjs, { Dayjs } from "dayjs";
import axios from "axios";
import { useLocation } from "react-router-dom";
import InternInfoHR from "../../components/Hr/InternInfoHR";

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
interface typeAttendances {
  id: number;
  internId: number;
  date: string;
  value: boolean;
}

const AttendanceEdit: React.FC = () => {
  const [intern, setIntern] = useState<typeIntern>();
  const [attendances, setAttendances] = useState<typeAttendances[]>();
  const [date, setDate] = useState(() => dayjs(Date.now()));
  const [key,setKey] = useState(Date.now())
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const internId = searchParams.get("id");

  const success = (msg:string) => {
    let result = ""
    if(msg==="delete") result = "İşaret Kaldırıldı"
    if(msg==="here") result = "Katıldı olarak işaretlendi"
    if(msg==="notHere") result = "Katılmadı olarak işaretlendi"
    messageApi.open({
      type: 'success',
      content: result,
    });
  };
  const warning = (err:any) => {
    messageApi.open({
      type: 'warning',
      content: err,
    });
  };

  const onSelect = (newValue: Dayjs) => {
    setDate(newValue);
  };

  const fetchDetail = async () => {
    await axios
      .get("../interns/" + internId)
      .then((res) => {
        setIntern(res.data);
      })
      .catch((err) => console.log('detail'+err));
  };

  const fetchAttendance = () => {
    axios.get("../attendances/intern/" + internId)
      .then((res) => {
        setAttendances(res.data);
      }).then(()=>{
        setKey(Date.now())
      }).catch((err) => console.log('attendance'+err)
      ).finally(()=>setLoading(false))
  };

  useEffect(() => {
    fetchDetail();
    fetchAttendance();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  

  const internIsHere= async(date:string) =>{
    await setLoading(true)
    await axios.post("../attendances", JSON.stringify({internid:internId,date:date,value:true}), {
      headers: { "Content-Type": "application/json" },
    }).then(()=>{
      success("here")
      fetchAttendance()
    }).catch(err=>{
      setTimeout(()=>warning(err),1000)
    })

    
  }

  const internNotIsHere= (date:string) =>{
    setLoading(true)
    axios.post("../attendances", JSON.stringify({internid:internId,date:date,value:false}), {
      headers: { "Content-Type": "application/json" },
    }).then(()=>{
      setTimeout(()=>success("notHere"),1000)
      fetchAttendance()
    }).catch(err=>{
      setTimeout(()=>warning(err),1000)
    })
  }

  const deleteRecord = (date:string)=>{
    setLoading(true)
    axios.delete('../attendances/'+internId+"/"+date)
    .then((res)=>{
      if(res.data[1]) setTimeout(()=>success("delete"),1000)
      fetchAttendance()
    }).catch(err=>{
      setTimeout(()=>warning(err),1000)
    })
  }

  const cellRender = (value: Dayjs) => {
    const dateStr = value.format("YYYY-MM-DD");
    if (dateStr === date.format("YYYY-MM-DD")) {
      return (
        <Spin spinning={loading}>
          <div className="flex justify-center gap-2">
            <Popover content={<>Katıldı olarak işaretle</>}>
              <CheckSquareOutlined
                className="text-2xl text-green-700 hover:text-green-400"
                onClick={()=>internIsHere(dateStr)}
              />
            </Popover>
            <Popover content={<>Katılmadı olarak işaretle</>}>
              <CloseSquareOutlined className="text-2xl text-yellow-700 hover:text-yellow-400"
                onClick={()=>internNotIsHere(dateStr)}
              />
            </Popover>
            <Popover content={<>İşareti Kaldır</>}>
              <DeleteOutlined 
                className="text-2xl text-red-700 hover:text-red-400"
                onClick={()=>deleteRecord(dateStr)}
              />
            </Popover>
          </div>
        </Spin>
      );
    }
    if (attendances) {
      for (let i = 0; i < attendances?.length; i++) {
        if (attendances[i].date === dateStr) {
          if (attendances[i].value) {
            return (
              <div className="text-end">
                <Popover content={<>Katıldı</>}>
                  <CheckSquareOutlined className="text-2xl text-green-700" />
                </Popover>
              </div>
            );
          } else {
            return (
              <div className="text-end">
                <Popover content={<>Katılmadı</>}>
                  <CloseSquareOutlined className="text-2xl text-red-700" />
                </Popover>
              </div>
            );
          }
        }
      }
    }
  };

  return (
    <div>
      {contextHolder}
      <p className="mb-5 pl-16 text-xl fixed z-50 text-white bg-[#001529] w-full pt-6 pb-6">
        Stajyer Bilgileri
      </p>
      <div className="mb-24 pt-32 pl-20">
        <InternInfoHR intern={intern} />
      </div>
      <p className="pl-20 text-xl mb-10 text-[#001529]">
        Devamsızlık Bilgileri:
      </p>
      <div key={key} className="px-20 pb-32 text-center">
        <div className="mb-10">
          <Row gutter={16}>
            <Col span={8}>
              <Card title="Stajda geçen gün" bordered={false}>
                {attendances?.length}
              </Card>
            </Col>
            <Col span={8}>
              <Card title="Katıldığı Günler" bordered={false}>
                {attendances?.filter((item) => item.value)?.length}
              </Card>
            </Col>
            <Col span={8}>
              <Card title="Katılmadığı Günler" bordered={false}>
                {attendances?.filter((item) => !item.value)?.length}
              </Card>
            </Col>
          </Row>
        </div>
        <div className="text-start mt-20">
          <p className="text-xl mb-10 text-[#001529]">Yoklama Girişi:</p>
        </div>
        <div className="mt-5 px-5 py-5 w-[78%] ml-[11%] mb-40 h-[35%]">
          <Calendar
            value={date}
            cellRender={cellRender}
            onSelect={onSelect}
            className="p-3"
          />
        </div>
      </div>
    </div>
  );
};

export default AttendanceEdit;
