import { BrowserRouter,Routes,Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import EditPlanPage from "./pages/EditPlanPage";
import InternDetailPage from "./pages/InternDetailPage";
import Login from "./pages/Login";
import Register from "./pages/Register";

const App: React.FC = () => {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<HomePage/>}/>
          <Route path="/edit" element={<EditPlanPage/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/internDetail" element={<InternDetailPage/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;