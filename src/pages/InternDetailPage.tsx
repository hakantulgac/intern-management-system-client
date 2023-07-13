import HeaderSider from "../components/HeaderSider";
import InternInfo from "../components/InternInfo";
import TimeLine from "../components/TimeLine";
import { Chart } from "../components/Chart";
import { FloatButton, Modal } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useState } from "react";
import EditPlanModal from "../components/EditPlanModal";

const userImg: any = require("../images/user.png");

const InternDetailPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex">
      <div className="max-h-9">
        <Modal
          width={1000}
          title="Planı Düzenle"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <EditPlanModal />
        </Modal>
      </div>
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
                name="Ahmet Hakan Tulgaç"
                grade={3}
                school="Fırat Üniversitesi"
                department="Yazılım Mühendisliği"
                field="Full Stack, Mobil"
              />
            </div>
          </div>
          <div className="flex">
            <div className="mt-5 w-2/5">
              <p className="mb-5">Görevler:</p>
              <TimeLine />
            </div>
            <div className="mt-5 w-3/5 -ml-10">
              <p className="mb-5">Performans grafiği:</p>
              <Chart />
            </div>
          </div>
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
