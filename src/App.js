import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./layouts/Sidebar";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import Map from "./pages/Map";
import Stores from "./pages/Stores";
import User from "./pages/User";

function App() {
  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <Routes className="content">
          <Route path="/" exact={true} element={<Dashboard />} />
          <Route path="/usuario" exact={true} element={<User />} />
          <Route path="/mapa" exact={true} element={<Map />} />
          <Route path="/tiendas" exact={true} element={<Stores />} />
          <Route path="*" exact={true} element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
