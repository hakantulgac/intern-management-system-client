import { App } from "antd";
import Login from "./pages/User/Login";

const routesConfig = [
    {
      path: "/",
      element: (
        <>
          <App />
          <Login />
        </>
      ),
      children: [
        { path: "/", element: <App/> },
        { path: "/login", element: <Login /> },
      ],
    },
  ];
  
  export default routesConfig;