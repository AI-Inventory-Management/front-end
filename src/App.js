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
import Notifications from "./pages/Notifications";
import NotFound from "./pages/NotFound";
import toast from "react-hot-toast";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const currentRole = window.sessionStorage.getItem("role");

  const loginHandler = (loginState) => {
    // setIsLoginA-ctive(loginState);
    setIsLoggedIn(loginState);
  };

  const fetchNewNotifications = (newest_notification) => {
    if (!isLoggedIn) {
      return;
    }
    const NOTIFICATIONS_URL = `${process.env.REACT_APP_BACKEND_URL}/notification/getNewNotificationsCount?newest_notification=${newest_notification}`;
    fetch(NOTIFICATIONS_URL).then((response) => {
      if (response.status !== 200) {
        console.log("Something went wrong");
        return;
      }
      response.json().then((result) => {
        if (result.count > 0) {
          launchNotificationToast(result.count);
          fetchTheNewestNotification();
        }
      })
    })
  };

  const fetchUnreadNotifications = () => {
    if (!isLoggedIn) {
      return;
    }
    const NOTIFICATIONS_URL = `${process.env.REACT_APP_BACKEND_URL}/notification/getUnreadNotificationsCount`;
    fetch(NOTIFICATIONS_URL).then((response) => {
      if (response.status !== 200) {
        console.log("Something went wrong");
        return;
      }
      response.json().then((result) => {
        if (result.count > 0) {
          launchNotificationToast(result.count);
          fetchTheNewestNotification();
        }
      })
    })
  }; 

  const launchNotificationToast = (notificationCount) => {
    if (notificationCount > 1) {
      toast(`You have ${notificationCount} new notifications.`, {
        duration: 20000,
        position: 'top-right',
        icon: '🗞️'
      });
    }
    else {
      toast(`You have ${notificationCount} new notification.`, {
        duration: 20000,
        position: 'top-right',
        icon: '🗞️'
      });  
    }
  };

  const fetchTheNewestNotification = () => {
    const NOTIFICATIONS_URL = `${process.env.REACT_APP_BACKEND_URL}/notification/getTheNewestNotification`;
    fetch(NOTIFICATIONS_URL).then((response) => {
      if (response.status !== 200) {
        console.log("Something went wrong");
        return;
      }
      response.json().then((result) => {
        const newestId = result.id_notification;
        if (newestId > newest_notification) {
          newest_notification = result.id_notification;
          console.log("Newest notif id", newest_notification);
        }
      })
    })
  };

  const MINUTE_MS = 6000;

  let newest_notification = 0;

  useEffect(() => {
    const isLoggedInStorage = sessionStorage.getItem("isLoggedIn");

    if (isLoggedInStorage === "true") {
      setIsLoggedIn(true);
      fetchUnreadNotifications();
    } else {
      setIsLoggedIn(false);
    }

    const interval = setInterval(() => {
      console.log('Logs every minute');
      fetchNewNotifications(newest_notification);
    }, MINUTE_MS);
  
    return () => clearInterval(interval);
  }, [isLoggedIn, newest_notification]);

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
                currentRole === "SUPERVISOR" ? (
                  <Dashboard />
                ) : (
                  <Map />
                )
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
          <Route path="*" exact={true} element={<NotFound />} />

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
          <Route
            path="/notifications"
            exact={true}
            element={<Notifications />}
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
