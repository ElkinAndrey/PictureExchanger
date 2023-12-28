import React from "react";

const Join = ({ list, separator = "", before = "" }) => {
  if (list.length === 0) before = "";
  return <div>{before + list.join(`${separator}${before}`)}</div>;
};

export default Join;
