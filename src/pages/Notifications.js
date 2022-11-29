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
