import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./layouts/Sidebar";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import Map from "./pages/Map";
import Stores from "./pages/Stores";
import User from "./pages/User";
import Filter from "./pages/Filter";
import StoreProvider from "./components/StoreProvider";
import Newproduct from "./pages/NewProduct";
import Products from "./pages/Products";
import Product from "./pages/Product";
import { useState } from "react";

function App() {

  const [isLoginActive, setIsLoginActive] = useState(true);

  const loginHandler = (loginState) => {
    setIsLoginActive(loginState);
  };

  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <Routes className="content">
          <Route path="/" exact={true} element={<Dashboard />} />
          <Route path="/usuario" exact={true} element={<User />} />
          <Route path="/mapa" exact={true} element={<Map />} />
          <Route path="/mapa/:id" element={<Map />} />
          {/* <Route path="/mapa/:id/refri" element={<Map />} /> */}
          <Route
            path="/tiendas"
            exact={true}
            element={
              <StoreProvider>
                <Stores />
              </StoreProvider>
            }
          />
          <Route path="*" exact={true} element={<Dashboard />} />
          <Route
            path="/filter"
            exact={true}
            element={
              <StoreProvider>
                <Filter />
              </StoreProvider>
            }
          />
          <Route path="/NewProduct" exat={true} element={<Newproduct />} />
          <Route
            path="/Products"
            exat={true}
            element={
              <StoreProvider>
                <Products />
              </StoreProvider>
            }
          />
          <Route path="/product" exact = {true} element={<StoreProvider><Product/></StoreProvider>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
