import React from "react";

/** Отобразить содержимое, если в значении true */
const If = ({ value = true, children }) => {
  if (value) return children;
  return <></>;
};

export default If;
