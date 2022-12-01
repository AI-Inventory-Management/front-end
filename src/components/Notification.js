import { Fragment } from "react";
import "../styles/Notifications.css";

const Notification = (props) => {
  const changeColor = (status) => {
    if (props.color === "green") {
      return "#AFE1AF";
    } else if (props.color === "orange") {
      return "#FED8B1";
    } else {
      return "#ff9999";
    }
  };

  const changeOpacity = (read) => {
    if (props.read === 1) {
      return 0.5;
    } else {
      return 1;
    }
  };

  return (
    <Fragment>
      <div
        className={"nt-notification-row"}
        style={{
          backgroundColor: changeColor(props.status),
          opacity: changeOpacity(props.read),
        }}
      >
        <div className="nt-column">
          <p>{props.store}</p>
        </div>
        <div className="nt-column">
          <p>{props.date.substring(0, 10)}</p>
        </div>
        <div className="nt-column">
          <p>{props.date.substring(11, 16)}</p>
        </div>
      </div>
    </Fragment>
  );
};

export default Notification;
