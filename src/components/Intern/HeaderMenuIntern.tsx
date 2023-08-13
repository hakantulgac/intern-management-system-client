import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, Popconfirm } from "antd";
import {
  ProjectOutlined,
  CalendarOutlined,
  LogoutOutlined,
  EditOutlined,
} from "@ant-design/icons";

const HeaderMenuHR = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(location.search);
  const internId = searchParams.get("id");
  return (
    <div className="text-center fixed h-full border-r border-[#518fe5] pr-[3px]">
      <div className="mt-[26px] text-[#7faae6] text-lg font-thin">
        Stajyer Paneli
      </div>
      <Menu
        className="w-48 ml-1 pt-14 text-left"
        theme="dark"
        defaultSelectedKeys={["/"]}
        mode="inline"
      >
        <Menu.Item key="/intern/works" icon={<ProjectOutlined />}>
          <Link to={"/intern/works?id="+internId}>Çalışmalar</Link>
        </Menu.Item>
        <Menu.Item key="/intern/attendance" icon={<CalendarOutlined />}>
          <Link to={"/intern/attendance?id="+internId}>Devamsızlık Durumu</Link>
        </Menu.Item>
        <Menu.Item key="infos" icon={<EditOutlined />}>
          <Link to={"/intern/infos?id="+internId}>Bilgileri Güncelle</Link>
        </Menu.Item>
      </Menu>
      <Popconfirm
        title="Çıkış Yap"
        description="Emin misiniz?"
        onConfirm={() => navigate("/")}
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
