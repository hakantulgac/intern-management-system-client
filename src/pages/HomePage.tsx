/* eslint-disable jsx-a11y/anchor-is-valid */
import HeaderSider from "../components/HeaderSider";
import React, { useState } from "react";
import { FloatButton } from "antd";
import { UserAddOutlined } from "@ant-design/icons";
import TableIntern from "../components/TableIntern";
import CreateIntern from "../components/CreateIntern";

const HomePage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tableInternKey,setTableInternKey] = useState(Date.now())

  const showModal = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="flex">
      <CreateIntern
        isModalOpen={isModalOpen}
        showModal={showModal}
        setIsModalOpen={setIsModalOpen}
        setTableInternKey={setTableInternKey}
      />
      <HeaderSider />
      <div className="intern-table ml-56 mr-20 w-full">
        <p className="text-xl fixed z-50 bg-white w-full pt-6 pb-6 border-b">
          Stajyer Listesi:
        </p>
        <TableIntern key={tableInternKey}/>
      </div>
      <FloatButton
        className="shadow-md shadow-gray-700"
        icon={<UserAddOutlined />}
        type="primary"
        style={{ top: 20, right: 85 }}
        onClick={showModal}
      />
    </div>
  );
};

export default HomePage;
