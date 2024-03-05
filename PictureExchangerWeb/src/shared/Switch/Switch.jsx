import React from "react";
import classes from "./Switch.module.css";
import If from "../../shared/If/If";
import Empty from "../../shared/Empty/Empty";
import Loader from "../Loader/Loader";

/** Переключатель */
const Switch = ({ value = null, setValue, load = false }) => {
  const click = () => {
    setValue(!value);
  };

  if (value === null) return <Empty />;

  return (
    <button
      className={[
        classes.body,
        value ? classes.bodyTrue : classes.bodyFalse,
      ].join(" ")}
      onClick={click}
    >
      <div
        className={[
          classes.lever,
          value ? classes.leverTrue : classes.leverFalse,
        ].join(" ")}
      >
        <If value={load}>
          <Loader
            color={value ? "#40a7e3" : "#8a8a8a"}
            width="11px"
            border="2px"
          />
        </If>
      </div>
    </button>
  );
};

export default Switch;
