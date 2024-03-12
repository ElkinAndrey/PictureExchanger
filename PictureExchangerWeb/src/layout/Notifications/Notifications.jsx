import React from "react";
import classes from "./Notifications.module.css";
import notificationStatus from "../../constants/notificationStatus";

const errorStyle = {
  border: "2px solid #ff3347",
};

const messageStyle = {
  border: "2px solid #e7e8ec",
};

const successfulStyle = {
  border: "2px solid #49cc90",
};

const Notifications = ({ notifications, notificationsChange }) => {
  const del = (notification) => {
    const newNotifications = notifications.filter((n) => n !== notification);
    notificationsChange(newNotifications);
  };

  const getStyle = (status) => {
    if (status === notificationStatus.error) return errorStyle;
    if (status === notificationStatus.successful) return successfulStyle;
    return messageStyle;
  };

  return (
    <div className={classes.body}>
      {notifications.map((notification) => (
        <div
          className={classes.notification}
          key={notification.id}
          style={getStyle(notification.status)}
        >
          <div className={classes.content}>
            <div className={classes.title}>{notification.title}</div>
            <div className={classes.text}>{notification.text}</div>
          </div>
          <button onClick={() => del(notification)} className={classes.button}>
            ✖
          </button>
        </div>
      ))}
    </div>
  );
};

export default Notifications;
