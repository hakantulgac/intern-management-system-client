import { App } from "antd";
import Login from "./components/User/Login";

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