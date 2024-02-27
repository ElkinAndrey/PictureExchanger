import React from "react";
import Bool from "../Bool/Bool";
import { Link } from "react-router-dom";
import getDateTime from "../../utils/getDateTime";
import classes from "./UsersTable.module.css";

const User = ({ user, index }) => {
  return (
    <div
      style={index === 0 ? { borderTop: "0px" } : {}}
      className={classes.userBody}
    >
      <Link className={classes.userInfo} to={`/users/${user.name}`}>
        <img src="/images/profile.png" alt="" className={classes.image} />
        <div>
          <div className={classes.name}>{`${user.name} (${user.role})`}</div>
          <div className={classes.dopInfo}>{`${getDateTime(
            user.registrationDate
          )} ${user.email}`}</div>
        </div>
      </Link>
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
      {users.map((user, index) => (
        <User user={user} key={index} index={index} />
      ))}
    </div>
  );
};

export default UsersTable;
