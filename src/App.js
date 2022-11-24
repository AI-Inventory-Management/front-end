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
import Login from "./pages/Login";
import { useState, useEffect } from "react";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const loginHandler = (loginState) => {
    // setIsLoginA-ctive(loginState);
    setIsLoggedIn(loginState);
  };

  useEffect(() => {
    const isLoggedInStorage = localStorage.getItem("isLoggedIn");

    if (isLoggedInStorage === "true") {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [isLoggedIn]);

  return (
    <Router>
      <div className="flex">
        {isLoggedIn && <Sidebar />}
        <Routes className="content">
          <Route
            path="/"
            exact={true}
            element={
              isLoggedIn ? (
                <Dashboard />
              ) : (
                <Login onChangeLogin={loginHandler} />
              )
            }
          />
          <Route
            path="/usuario"
            exact={true}
            element={<User onChangeLogin={loginHandler} />}
          />
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
          <Route
            path="/product"
            exact={true}
            element={
              <StoreProvider>
                <Product />
              </StoreProvider>
            }
          />
          {/* <Route
            path="/login"
            exact={true}
            element={<Login onChangeLogin={loginHandler} />}
          /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
