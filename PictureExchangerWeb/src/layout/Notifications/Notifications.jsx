import React from "react";
import classes from "./Notifications.module.css";
import notificationStatus from "../../constants/notificationStatus";

const errorStyle = {
  border: "2px solid #ff3347",
};

const messageStyle = {
  border: "2px solid #e7e8ec",
};

const Notifications = ({ notifications, notificationsChange }) => {
  const del = (notification) => {
    const newNotifications = notifications.filter((n) => n !== notification);
    notificationsChange(newNotifications);
  };

  return (
    <div className={classes.body}>
      {notifications.map((notification) => (
        <div
          className={classes.notification}
          key={notification.id}
          style={
            notification.status === notificationStatus.error
              ? errorStyle
              : messageStyle
          }
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
