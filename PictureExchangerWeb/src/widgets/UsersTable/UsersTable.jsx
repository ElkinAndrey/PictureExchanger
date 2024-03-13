import React from "react";
import getDateTime from "../../utils/getDateTime";
import classes from "./UsersTable.module.css";
import UserCell from "../UserCell/UserCell";
import Bool from "../../shared/Bool/Bool";
import getRoleName from "../../utils/getRoleName";

/** Пользователь в таблице */
const User = ({ user, index }) => {
  return (
    <div
      style={index === 0 ? { borderTop: "0px" } : {}}
      className={classes.userBody}
    >
      <UserCell
        name={user.name}
        role={getRoleName(user.role)}
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

/** Таблица с пользователями */
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
