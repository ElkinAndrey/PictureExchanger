import React from "react";

const Bool = ({ value, trueText, fasleText }) => {
  return <div>{value ? trueText : fasleText}</div>;
};

export default Bool;
