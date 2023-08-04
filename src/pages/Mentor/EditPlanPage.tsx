import React, { useState } from 'react';
import { FloatButton, Space} from "antd"
import CreatePlan from "../../components/Mentor/CreatePlan";
import { PlusOutlined } from '@ant-design/icons';
import PlanTabs from '../../components/Mentor/PlanTabs';


const EditPlanPage : React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [counter,setCounter] = useState(0)
  const [tabKey,setTabKey] = useState(Date.now())

  const showModal = () => {
    setIsModalOpen(true);
  };

  
  return (
    <div className="flex">
        <div className="">
          <p className="pl-10 text-xl fixed z-50 bg-white w-full pt-6 pb-6 border-b">Çalışma Planı:</p>
          <div className="mt-24 w-full">
            <Space className='w-full' direction="vertical" size={12}>
              <div className="ml-5 w-full">
                <CreatePlan 
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