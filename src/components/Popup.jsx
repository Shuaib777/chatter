import React, { useContext, useState } from "react";
import { PopupContext } from "../context/popupContext";
import { AuthContext } from "../context/authContext";
import editImage from "../image/pencil.png";
import { storage } from "../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const Popup = () => {
  const { dispatch } = useContext(PopupContext);
  const { currentUser } = useContext(AuthContext);
  //   cosnt [profilePic, setProfilePic] = useState(null);

  const handleClose = () => dispatch({ type: "CHANGE_STATE", payload: false });
  //   const handleChange = async () => {
  //     const storageRef = ref(storage, currentUser.email);

  //     await uploadBytesResumable(storageRef, file).then(() => {
  //       getDownloadURL(storageRef).then(async (downloadURL) => {});
  //     });
  //   };
  return (
    <>
      <div className="wrapper"></div>
      <div className="popup">
        <img src={currentUser.photoURL} className="popupImage" alt="" />
        <button onClick={() => handleClose()}>❌</button>
        <input type="file" style={{ display: "none" }} id="userImage" />
        <label htmlFor="userImage">
          <img src={editImage} alt="" />
        </label>
      </div>
    </>
  );
};

export default Popup;
