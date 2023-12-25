import React from "react";
import { Link } from "react-router-dom";

const DivLink = ({ to, children }) => {
  return (
    <div>
      <Link to={to}>{children}</Link>
    </div>
  );
};

export default DivLink;
