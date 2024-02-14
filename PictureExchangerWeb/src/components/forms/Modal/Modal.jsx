import React from "react";
import classes from "./Modal.module.css";

const Modal = ({ active, setActive, children, style }) => {
  return (
    <div
      className={
        active ? classes.modal + " " + classes.modal__active : classes.modal
      }
      onMouseDown={() => setActive(false)}
    >
      <div className={classes.second}>
        <div
          style={style}
          className={
            active
              ? classes.modal__content + " " + classes.modal__content__active
              : classes.modal__content
          }
          onMouseDown={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
