/*
Autores:
- Benjamín Ruiz

Página de notificaciones. Depende de los componentes Notification.js y NotificationsContainer.js
*/

import Navbar from "../components/Navbar";
import NotificationsContainer from "../components/NotificationsContainer";
import "../styles/Notifications.css";

function Notifications() {
  return (
    <div className="nt-container">
      <Navbar title="Notification center" />
      <NotificationsContainer />
    </div>
  );
}

export default Notifications;
