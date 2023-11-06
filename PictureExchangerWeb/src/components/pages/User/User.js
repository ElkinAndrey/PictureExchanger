import React, { useState } from "react";
import { useParams } from "react-router-dom";

const User = () => {
  const params = useParams();

  return <div>{params.name}</div>;
};

export default User;
