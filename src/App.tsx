import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Layout } from "antd";
import EditPlanPage from "./pages/Mentor/EditPlanPage";
import InternsPage from "./pages/Mentor/InternsPage";
import InternDetailPage from "./pages/Mentor/InternDetailPage";
import HeaderMenu from "./components/Mentor/HeaderMenu";
import HeaderMenuHR from "./components/Hr/HeaderMenuHR";
import { InternshipApplications } from "./pages/Hr/InternshipApplications";
import HomePage from "./pages/User/HomePage";
import InternsPageHR from "./pages/Hr/InternsPageHR";

const { Content,  Footer, Sider } = Layout;

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/*"
          element={
            <Layout style={{ minHeight: "100vh" }}>
              <Sider>
                <HeaderMenu />
              </Sider>
              <Layout>
                <Content>
                  <Routes>
                    <Route path="/interns" element={<InternsPage />} />
                    <Route path="/edit" element={<EditPlanPage />} />
                    <Route path="/internDetail" element={<InternDetailPage />} />
                  </Routes>
                </Content>
                <Footer style={{ textAlign: "center" }}>
                  Ant Design ©2023 Created by Ant UED
                </Footer>
              </Layout>
            </Layout>
          }
        />
        <Route
          path="/hr/*"
          element={
            <Layout style={{ minHeight: "100vh" }}>
              <Sider className="fixed z-50">
                <HeaderMenuHR />
              </Sider>
              <Layout>
                <Content>
                  <Routes>
                    <Route path="/applications" element={<InternshipApplications />} />
                    <Route path="/interns" element={<InternsPageHR />} />
                  </Routes>
                </Content>
                <Footer style={{ textAlign: "center" }}>
                  Ant Design ©2023 Created by Ant UED
                </Footer>
              </Layout>
            </Layout>   
          }
        />
      </Routes>
    </Router>
  );
};

export default App;