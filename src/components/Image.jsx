import React from "react";
import { useLocation, useNavigate } from "react-router";

const Image = () => {
  const location = useLocation();
  const { image } = location.state;
  const navigate = useNavigate();
  return (
    <div className="imageContainer">
      <div className="imageDiv">
        <img src={image} alt="" />
        <button onClick={() => navigate("/")}>❌</button>
      </div>
    </div>
  );
};

export default Image;
