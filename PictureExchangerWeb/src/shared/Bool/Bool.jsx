import React from "react";

/** При true один текст, при false другой текст */
const Bool = ({ value, trueText, fasleText, ...props }) => {
  return <div {...props}>{value ? trueText : fasleText}</div>;
};

export default Bool;
