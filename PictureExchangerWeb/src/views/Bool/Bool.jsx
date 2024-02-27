import React from "react";

const Bool = ({ value, trueText, fasleText, ...props }) => {
  return <div {...props}>{value ? trueText : fasleText}</div>;
};

export default Bool;
