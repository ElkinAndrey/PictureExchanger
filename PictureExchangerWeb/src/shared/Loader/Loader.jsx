import React from "react";
import classes from "./Loader.module.css";

/** ЗагрузкаF */
const Loader = ({
  color = "#ffffff",
  width = "20px",
  thickness = "2px",
  ...props
}) => {
  return (
    <div {...props}>
      <div
        className={classes.customLoader}
        style={{
          background: `radial-gradient(farthest-side, ${color} 94%, #0000) top/2px 2px no-repeat, conic-gradient(#0000 30%, ${color})`,
          width: width,
          height: width,
          WebkitMask: `radial-gradient(farthest-side, #0000 calc(100% - ${thickness}), #000 0)`,
          margin: thickness,
        }}
      ></div>
    </div>
  );
};

export default Loader;
