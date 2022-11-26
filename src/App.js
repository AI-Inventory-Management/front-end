import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./layouts/Sidebar";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import Map from "./pages/Map";
import Stores from "./pages/Stores";
import User from "./pages/User";
import Filter from "./pages/Filter";
import StoreProvider from "./components/StoreProvider";
import PrivateRoute from "./components/PrivateRoute";
import Newproduct from "./pages/NewProduct";
import Products from "./pages/Products";
import Product from "./pages/Product";
import Login from "./pages/Login";
import { useState, useEffect } from "react";
import NotFound from "./pages/NotFound";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const currentRole = window.sessionStorage.getItem("role");

  const loginHandler = (loginState) => {
    // setIsLoginA-ctive(loginState);
    setIsLoggedIn(loginState);
  };

  useEffect(() => {
    const isLoggedInStorage = sessionStorage.getItem("isLoggedIn");

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
                currentRole === "SUPERVISOR" ?
                <Dashboard/>
                : (<Map/>)
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
          <Route path="/mapa" exact={true} element={<Map />}/>
          <Route path="*" exact={true} element={<NotFound/>}  />
          
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
        </Routes>
      </div>
    </Router>
  );
}

export default App;
