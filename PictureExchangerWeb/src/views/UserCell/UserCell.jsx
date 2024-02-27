import React from "react";
import { Link } from "react-router-dom";
import classes from "./UserCell.module.css";

const UserCell = ({
  name = null,
  email = null,
  role = null,
  date = null,
  ...props
}) => {
  return (
    <div {...props}>
      <Link
        className={classes.userInfo}
        to={name !== null ? `/users/${name}` : null}
      >
        <img src="/images/profile.png" alt="" className={classes.image} />
        <div>
          <div className={classes.name}>{`${name ?? ""}${
            role !== null ? ` (${role})` : ""
          }`}</div>
          <div className={classes.dopInfo}>{`${date} ${email ?? ""}`}</div>
        </div>
      </Link>
    </div>
  );
};

export default UserCell;
