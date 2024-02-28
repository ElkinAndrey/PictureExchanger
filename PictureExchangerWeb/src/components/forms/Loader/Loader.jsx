import React from "react";
import classes from "./Loader.module.css";

const Loader = ({ className, style, color = "#ffffff", width = "20px" }) => {
  return (
    <div className={className} style={style}>
      <div
        className={classes.customLoader}
        style={{
          background: `radial-gradient(farthest-side, ${color} 94%, #0000) top/2px 2px no-repeat, conic-gradient(#0000 30%, ${color})`,
          width: width,
          height: width,
        }}
      ></div>
    </div>
  );
};

export default Loader;
