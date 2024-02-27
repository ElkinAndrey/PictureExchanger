import React from "react";
import Bool from "../Bool/Bool";
import { Link } from "react-router-dom";
import getDateTime from "../../utils/getDateTime";
import classes from "./UsersTable.module.css";
import UserCell from "../UserCell/UserCell";

const User = ({ user, index }) => {
  return (
    <div
      style={index === 0 ? { borderTop: "0px" } : {}}
      className={classes.userBody}
    >
      <UserCell
        name={user.name}
        role={user.role}
        date={getDateTime(user.registrationDate)}
        email={user.email}
      />
      <div className={classes.isBanned}>
        <Bool
          value={user.isBanned}
          trueText="Забанен"
          fasleText="Не забанен"
          className={classes.isBannedText}
        />
        <div className={classes.bannedDate}>{getDateTime(user.bannedDate)}</div>
      </div>
    </div>
  );
};

const UsersTable = ({ users }) => {
  return (
    <div className={classes.body}>
      <div className={classes.logo}>Пользователи</div>
      {users.map((user, index) => (
        <User user={user} key={index} index={index} />
      ))}
    </div>
  );
};

export default UsersTable;
