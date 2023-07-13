import React, { useState } from 'react';
import { Layout, Menu} from 'antd';
import { Link } from 'react-router-dom';

const { Sider } = Layout;


const HeaderSider: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  

  return (
    <div className="flex w-31/12 fixed">
      <Layout style={{ minHeight: '100vh'}}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <Menu className='mt-10' theme="dark"mode="inline"> 
          <Menu.Item key="1" className='flex justify-center items-center'><Link to="/home">Ana Sayfa</Link></Menu.Item>  
          <Menu.Item key="2" className='flex justify-center items-center'><Link to="/edit">Çalışma Planı</Link></Menu.Item>  
        </Menu>
      </Sider>
    </Layout>
    </div>
  );
};

export default HeaderSider;