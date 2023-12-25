import React from "react";

const Img = ({ src, hidden = false }) => {
  return <img src={src} alt="" style={{ width: "100px" }} hidden={hidden} />;
};

export default Img;
