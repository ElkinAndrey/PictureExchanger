import React from "react";

/** Объединить списко строк в строку */
const Join = ({ list, separator = "", before = "" }) => {
  if (list.length === 0) before = "";
  return <div>{before + list.join(`${separator}${before}`)}</div>;
};

export default Join;
