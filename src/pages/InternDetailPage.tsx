import HeaderSider from "../components/HeaderSider";
import InternInfo from "../components/InternInfo";
import TimeLine from "../components/TimeLine";
import { Chart } from "../components/Chart";
import { FloatButton, Modal } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import EditPlanModal from "../components/EditPlanModal";
import axios from "axios";
import { useLocation } from "react-router-dom";


const userImg: any = require("../images/user.png");
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
  plan:{
    id:number,
    title:string,
    startDate:string,
    endDate:string,
    description:string
  }
  startDate:string
  endDate:string
  done:boolean
}

interface typePlan{
  id:number
  title:string
  description:string
  startDate:string
  endDate:string
}

const InternDetailPage: React.FC = () => {
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const internId = searchParams.get('id')
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [detail,setDetail] = useState<typeDetail[]>([])
  const [plan,setPlan] = useState<typePlan[]>([])

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const fetchPlan = async()=>{
    await axios.get("plans").
    then(res=>{
      setPlan(res.data)
    }).catch(err=>{
      console.log(err)
    }
    )
  }

  const fetchDetail = async()=>{
    await axios.get("details/"+internId).
    then(res=>{
      setDetail(res.data)
    }).catch(err=>{
     
    })
  }

  useEffect(()=>{
    fetchDetail()
    fetchPlan()
  },[])

  useEffect(()=>{
    console.log(detail)
  },[detail])

  useEffect(()=>{
    console.log(plan)
  },[plan])

  return (
    <div className="flex">
      <HeaderSider />
      <div className="intern-table ml-60 mr-20 w-full">
        <p className="text-xl fixed z-50 bg-white w-full pt-6 pb-6 border-b">
          Stajyer Detayları:
        </p>
        <div className="mt-24">
          <div className="introduce flex flex-row justify-start mt-5 mb-20">
            <img src={userImg} className="w-48 h-48 object-cover" alt="" />
            <div className="ml-10 flex flex-col gap-2">
              <InternInfo
                internId={String(internId)}
              />
            </div>
          </div>
          <div className="flex">
            <div className="mt-5 w-2/5">
              <p className="mb-5">Görevler:</p>
              <TimeLine plan={plan} detail={detail}/>
            </div>
            <div className="mt-5 w-3/5 -ml-10 mb-10">
              <p className="mb-5">Performans grafiği:</p>
              <Chart />
            </div>
          </div>
        </div>
        <div className="max-h-9">
        <Modal
          width={1000}
          title="Planı Düzenle"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <EditPlanModal plan={plan} detail={detail} internId={String(internId)}/>
        </Modal>
      </div>
      </div>
      <FloatButton
        icon={<EditOutlined />}
        type="primary"
        className="shadow-md shadow-gray-700"
        style={{ top: 20, right: 140 }}
        onClick={showModal}
      />
      <FloatButton
        icon={<DeleteOutlined />}
        type="default"
        className="bg-red-500 shadow-red-700 shadow-md"
        style={{ top: 20, right: 85 }}
      />
    </div>
  );
};

export default InternDetailPage;
