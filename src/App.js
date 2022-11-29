import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
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
import Login from "./pages/Login";
import { useState, useEffect } from "react";
import NotFound from "./pages/NotFound";
import toast from "react-hot-toast";

function App() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoggedInStorage, setIsLoggedInStorage] = useState(
    window.sessionStorage.getItem("isLoggedIn")
  );
  const currentRole = window.sessionStorage.getItem("role");

  const loginHandler = (loginState) => {
    setIsLoggedInStorage(loginState);
    // setIsLoggedIn(loginState);
  };

  useEffect(() => {
    setIsLoggedInStorage(window.sessionStorage.getItem("isLoggedIn"));

    if (isLoggedInStorage === "true") {
      setIsLoggedIn(true);
    } else {
      // If isLoggedIn is false, navigate to login.
      setIsLoggedIn(false);
      navigate("/");
    }
  }, [isLoggedInStorage, navigate]);

  return (
    <div className="flex">
      {isLoggedIn && <Sidebar />}
      <Routes className="content">
        <Route
          path="/"
          exact={true}
          element={
            isLoggedIn ? (
              currentRole === "SUPERVISOR" ? (
                <Dashboard />
              ) : (
                <Map loggedIn={isLoggedIn}/>
              )
            ) : (
              <Login onChangeLogin={loginHandler} />
            )
          }
        />
        <Route
          path="/usuario"
          exact={true}
          element={<User onChangeLogin={loginHandler} loggedIn={isLoggedIn}/>}
        />
        <Route path="/mapa" exact={true} element={<Map loggedIn={isLoggedIn}/>} />
        <Route path="*" exact={true} element={<NotFound />} />

        <Route path="/mapa/:id" element={<Map loggedIn={isLoggedIn}/>} />
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

        <Route
          path="/filter"
          exact={true}
          element={
            <StoreProvider>
              <Filter />
            </StoreProvider>
          }
        />
        <Route path="/NewProduct" exact={true} element={<Newproduct />} />
        <Route
          path="/Products"
          exact={true}
          element={
            <StoreProvider>
              <Products loggedIn={isLoggedIn}/>
            </StoreProvider>
          }
        />
        <Route
          path="/product"
          exact={true}
          element={
            <StoreProvider>
              <Product loggedIn={isLoggedIn}/>
            </StoreProvider>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
