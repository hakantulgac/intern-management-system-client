import React, { useState, useEffect } from 'react';
import { FloatButton, Space} from "antd"
import CreatePlan from "../../components/Mentor/CreatePlan";
import { PlusOutlined } from '@ant-design/icons';
import PlanTabs from '../../components/Mentor/PlanTabs';
import axios from 'axios';


const EditPlanPage : React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user,setUser] = useState<{field:string,id:string}>({field:"",id:""})
  const [counter,setCounter] = useState(0)
  const [tabKey,setTabKey] = useState(Date.now())

  const showModal = () => {
    setIsModalOpen(true);
  };
  
  useEffect(()=>{
    axios.get("users/auth")
    .then(res=>setUser(res.data))
  },[])

  return (
    <div className="flex">
        <div className="">
        <p className="text-white pl-16 text-xl fixed z-5 w-full pt-6 pb-6 border-b bg-[#001529]">
          Çalışma Planı
        </p>
          <div className="mt-24 w-full">
            <Space className='w-full' direction="vertical" size={12}>
              <div className="ml-5 w-full">
                <CreatePlan
                  user = {user} 
                  counter={counter}
                  isModalOpen={isModalOpen} 
                  showModal={showModal}
                  setIsModalOpen={setIsModalOpen}
                  setTabKey={setTabKey}
                />
                <PlanTabs setTabKey={setTabKey} key={tabKey} setCounter={setCounter} />
              </div>
            </Space>
          </div>
        </div>
        <FloatButton icon={<PlusOutlined />} type="primary" className="shadow-md shadow-gray-700" style={{top: 20, right: 85}} onClick={showModal}/>
    </div>
  )
}

export default EditPlanPage