import React from "react";

const Join = ({ list, separator = "", before = "" }) => {
  return <div>{before + list.join(`${separator}${before}`)}</div>;
};

export default Join;
