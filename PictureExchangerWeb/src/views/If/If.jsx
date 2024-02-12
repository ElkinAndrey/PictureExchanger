import React from "react";

const If = ({ value = true, children }) => {
  if (value) return children;
  return <></>;
};

export default If;
