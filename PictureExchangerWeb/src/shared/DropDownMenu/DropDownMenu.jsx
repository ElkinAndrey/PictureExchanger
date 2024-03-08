import React, { useEffect, useRef, useState } from "react";
import classes from "./DropDownMenu.module.css";
import LoadButton from "../LoadButton/LoadButton";

/** Выпадающее меню */
const DropDownMenu = ({ text, children, ...props }) => {
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
    <div {...props}>
      <div ref={rootEl} className={classes.body}>
        <LoadButton text={text} onClick={open} />
        <div className={isOpen ? classes.menuOpen : classes.menuClose}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default DropDownMenu;
