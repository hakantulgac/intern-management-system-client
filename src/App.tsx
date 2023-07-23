import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Layout } from "antd";
import HomePage from "./pages/HomePage";
import EditPlanPage from "./pages/EditPlanPage";
import InternDetailPage from "./pages/InternDetailPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import HeaderMenu from "./components/HeaderMenu";

const { Content,  Footer, Sider } = Layout;

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
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
                    <Route path="/home" element={<HomePage />} />
                    <Route path="/edit" element={<EditPlanPage />} />
                    <Route path="/internDetail" element={<InternDetailPage />} />
                  </Routes>
                </Content>
                <Footer style={{ textAlign: "center" }}>
                  Stajyer Takip Sistemi ©2023
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