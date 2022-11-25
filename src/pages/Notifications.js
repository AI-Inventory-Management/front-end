import Navbar from "../components/Navbar";
import NotificationsContainer from "../components/NotificationsContainer";
import "../styles/Notifications.css";

function Notifications() {
  return (
    <div className="nt-container">
      <Navbar title="Notification center" />
      <div className="nt-grey-container">
        <NotificationsContainer />
      </div>
    </div>
  );
}

export default Notifications;
