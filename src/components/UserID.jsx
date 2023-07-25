import React, { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";

const UserID = () => {
  const { currentUser } = useContext(AuthContext);
  const [userId, setUserId] = useState(false);
  const handleClick = () => {
    setUserId(true);
  };

  return (
    <div className="userID">
      {userId || <button onClick={handleClick}>UserID</button>}
      {userId && (
        <div className="userIDContent">
          UserID: <span>{currentUser.uid.slice(-7)}</span>
        </div>
      )}
    </div>
  );
};

export default UserID;
