import React, { useState } from 'react';
import { FloatButton, Space} from "antd"
import HeaderSider from "../components/HeaderSider"
import CreatePlan from "../components/CreatePlan";
import { PlusOutlined } from '@ant-design/icons';
import PlanTabs from '../components/PlanTabs';


const EditPlanPage : React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [counter,setCounter] = useState(0)

  const showModal = () => {
    setIsModalOpen(true);
  };

  
  return (
    <div className="flex">
        <HeaderSider/>
        <div className="ml-56">
          <p className="text-xl fixed z-50 bg-white w-full pt-6 pb-6 border-b">Çalışma Planı:</p>
          <div className="mt-24">
            <Space direction="vertical" size={12}>
              <div className="ml-5">
                <CreatePlan 
                  counter={counter}
                  isModalOpen={isModalOpen} 
                  showModal={showModal}
                  setIsModalOpen={setIsModalOpen}
                />
                <PlanTabs setCounter={setCounter} />
              </div>
            </Space>
          </div>
        </div>
        <FloatButton icon={<PlusOutlined />} type="primary" className="shadow-md shadow-gray-700" style={{top: 20, right: 85}} onClick={showModal}/>
    </div>
  )
}

export default EditPlanPage