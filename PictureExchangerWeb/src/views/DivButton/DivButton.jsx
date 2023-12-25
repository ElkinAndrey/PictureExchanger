import React from "react";

const DivButton = (params) => {
  return (
    <div>
      <button {...params}>{params.children}</button>
    </div>
  );
};

export default DivButton;
