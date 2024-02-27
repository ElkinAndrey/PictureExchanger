import React, { useEffect, useRef, useState } from "react";
import classes from "./DropDownMenu.module.css";

const DropDownMenu = ({ text, children }) => {
  const rootEl = useRef(null);
  const [isOpen, isOpenChange] = useState(false);

  const open = () => {
    isOpenChange(!isOpen);
  };

  const close = () => {
    isOpenChange(false);
  };

  useEffect(() => {
    const onClick = (e) => rootEl.current?.contains(e.target) || close();
    document.addEventListener("click", onClick);
  }, []);

  return (
    <div ref={rootEl} className={classes.body}>
      <button onClick={open} className={classes.button}>
        {text}
      </button>
      <div className={isOpen ? classes.menuOpen : classes.menuClose}>
        {children}
      </div>
    </div>
  );
};

export default DropDownMenu;
