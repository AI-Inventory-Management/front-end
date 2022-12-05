/*
Autores:
- Benjamín Ruiz

Componente que contiene las notificaciones leídas y no leídas. Aquí se realizan las peticiones
al backend necesarias para la página de notificaciones.
*/

import Notification from "./Notification";
import "../styles/Notifications.css";
import { useEffect } from "react";
import { useState } from "react";

const NotificationsContainer = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const myHeadersToken = new Headers();
    myHeadersToken.append("Content-Type", "application/json");
    myHeadersToken.append(
      "Authorization",
      `Bearer ${window.sessionStorage.getItem("bearerToken")}`
    );

    const requestOptionsGET = {
      method: "GET",
      headers: myHeadersToken,
    };
    const NOTIFICATIONS_URL = `${process.env.REACT_APP_BACKEND_URL}/notification/getAllNotifications`;
    const READ_NOTIFICATION_URL = `${process.env.REACT_APP_BACKEND_URL}/notification/markAsRead`;

    // Traer todas las notificaciones del backend
    fetch(NOTIFICATIONS_URL, requestOptionsGET).then((response) => {
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

            const requestOptions = {
              method: "POST",
              body: JSON.stringify(body),
              headers: myHeadersToken,
            };

            // Marcar las notificaciones no leídas que se muestren en pantalla como leídas
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

  // Mapeo de colores dependiendo del estatus de la tienda
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
