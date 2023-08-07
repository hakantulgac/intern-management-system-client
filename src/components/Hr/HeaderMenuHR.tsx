import { Link, useNavigate } from "react-router-dom";
import { Menu, Popconfirm } from "antd";
import {
  HomeOutlined,
  LogoutOutlined,
  AlignLeftOutlined
} from "@ant-design/icons";

const HeaderMenuHR = () => {
  const navigate = useNavigate();
  return (
    <div className="text-center fixed h-full border-r border-[#518fe5] pr-[3px]">
      <div className="mt-[26px] text-[#7faae6] text-lg font-thin">İnsan Kaynakları Paneli</div>
      <Menu
        className="w-48 ml-1 pt-14 text-left"
        theme="dark"
        defaultSelectedKeys={["/"]}
        mode="inline"
      >
        <Menu.Item key="/hr/interns" icon={<AlignLeftOutlined />}>
          <Link to="/hr/interns">Stajyer Listesi</Link>
        </Menu.Item>
        <Menu.Item key="/hr/applications" icon={<AlignLeftOutlined />}>
          <Link to="/hr/applications">Başvurular</Link>
        </Menu.Item>
      </Menu>
      <Popconfirm
        title="Çıkış Yap"
        description="Emin misiniz?"
        onConfirm={()=>navigate("/login")}
        onCancel={() => {}}
        okText="Evet"
        cancelText="İptal"
      >
        <div
          className="
          absolute 
          left-14
          bottom-4 
          text-red-500 
          text-lg flex justify-center gap-[5px] cursor-pointer hover:text-red-400"
        >
          <div className="mb-3 text-base">
            <LogoutOutlined />
          </div>
          <div className="mt-[2px]">Çıkış</div>
        </div>
      </Popconfirm>
    </div>
  );
};

export default HeaderMenuHR;