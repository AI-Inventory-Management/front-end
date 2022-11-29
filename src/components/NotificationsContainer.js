import Notification from "./Notification";
import "../styles/Notifications.css";
import { useEffect } from "react";
import { useState } from "react";

const NotificationsContainer = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const NOTIFICATIONS_URL = `${process.env.REACT_APP_BACKEND_URL}/notification/getAllNotifications`;
    const READ_NOTIFICATION_URL = `${process.env.REACT_APP_BACKEND_URL}/notification/markAsRead`;
    fetch(NOTIFICATIONS_URL).then((response) => {
      if (response.status !== 200) {
        console.log("Something went wrong");
        return;
      }
      response.json().then((result) => {
        setNotifications(result);
        result.forEach((notification) => {
          if (notification.read === 0) {
            const body = {
              id_notification: notification.id_notification,
            };

            const headers = new Headers({ "Content-Type": "application/json" });
            const requestOptions = {
              method: "POST",
              body: JSON.stringify(body),
              headers: headers,
            };

            fetch(READ_NOTIFICATION_URL, requestOptions).then((response) => {
              if (response.status !== 200) {
                console.log("failed");
                return;
              }
            });
          }
        });
      });
    });
  }, []);

  const colors = {
    1: "green",
    2: "orange",
    3: "red",
  };

  return (
    <div>
      <p className="nt-info">No leídas</p>
      <div className="nt-top">
        <div>
          {notifications.map((notification) => {
            if (notification.read === 0) {
              return (
                <Notification
                  store={notification.name}
                  date={notification.timestamp}
                  color={colors[notification.new_status]}
                  read={notification.read}
                  key={notification.id_notification}
                />
              );
            } else {
              return null;
            }
          })}
        </div>
      </div>
      <p className="nt-info">Leídas</p>
      <div className="nt-top">
        <div>
          {notifications.map((notification) => {
            if (notification.read === 1) {
              return (
                <Notification
                  store={notification.name}
                  date={notification.timestamp}
                  color={colors[notification.new_status]}
                  read={notification.read}
                  key={notification.id_notification}
                />
              );
            } else {
              return null;
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default NotificationsContainer;
