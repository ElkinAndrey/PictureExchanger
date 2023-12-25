import React from "react";

const IsBanned = ({ isBanned, unbanned, banned }) => {
  return (
    <div>
      {isBanned ? (
        <button onClick={unbanned}>Разбанить</button>
      ) : (
        <button onClick={banned}>Забанить</button>
      )}
    </div>
  );
};

export default IsBanned;
