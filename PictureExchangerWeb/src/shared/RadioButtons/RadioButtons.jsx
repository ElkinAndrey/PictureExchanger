import React, { useEffect, useState } from "react";
import classes from "./RadioButtons.module.css";
import { useRef } from "react";

/** Радиокнопка. Позволяет пользователю выбрать одну опцию из предопределённого набора. */
const RadioButtons = ({ text, values = [], setValue }) => {
  const rootEl = useRef(null);
  const baseSelected = { value: "", text: "" };
  const [isOpen, isOpenChange] = useState(false);
  const [selected, selectedChange] = useState(baseSelected);

  const setSelected = (v) => {
    setValue(v.value);
    selectedChange(v);
    close();
  };

  const open = () => isOpenChange(!isOpen);
  const close = () => isOpenChange(false);

  useEffect(() => {
    const onClick = (e) => rootEl.current?.contains(e.target) || close();
    document.addEventListener("click", onClick);
  }, []);

  useEffect(() => {
    if (values.length === 0) selectedChange(baseSelected);
    else selectedChange(values[0]);
  }, [values]);

  return (
    <div ref={rootEl} className={classes.body}>
      <div className={classes.logo}>{text}</div>
      <div>
        <button className={classes.selectedButton} onClick={open}>
          <div className={classes.selectedButtonText}>{selected.text}</div>
          <div className={classes.selectedButtonTriangle}></div>
        </button>
      </div>
      <div
        className={[
          classes.values,
          isOpen ? classes.valuesOpen : classes.valuesClose,
        ].join(" ")}
      >
        {values.map((v, index) => (
          <div key={index}>
            <button
              className={[
                classes.value,
                v.value === selected.value && classes.selectedValue,
              ].join(" ")}
              onClick={() => setSelected(v)}
            >
              <div>{v.text}</div>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RadioButtons;
