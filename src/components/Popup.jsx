import React, { useContext } from "react";
import { PopupContext } from "../context/popupContext";
import { AuthContext } from "../context/authContext";
import editImage from "../image/pencil.png";
import { database, refdb, storage } from "../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { update } from "firebase/database";

const Popup = () => {
  const { dispatch } = useContext(PopupContext);
  const { currentUser } = useContext(AuthContext);

  const handleClose = () => dispatch({ type: "CHANGE_STATE", payload: false });

  const handleChange = async (file) => {
    const storageRef = ref(storage, currentUser.email);

    await uploadBytesResumable(storageRef, file).then((snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("Upload is " + progress + "% done");

      getDownloadURL(storageRef).then(async (downloadURL) => {
        await update(refdb(database, `users/${currentUser.uid}/`), {
          ["photoURL/"]: downloadURL,
        });
        window.location.reload(true);
      });
    });
  };
  return (
    <>
      <div className="wrapper"></div>
      <div className="popup">
        <img src={currentUser.photoURL} className="popupImage" alt="" />
        <button onClick={() => handleClose()}>❌</button>
        <input
          type="file"
          style={{ display: "none" }}
          id="userImage"
          onChange={(e) => handleChange(e.target.files[0])}
        />
        <label htmlFor="userImage">
          <img src={editImage} alt="" />
        </label>
      </div>
    </>
  );
};

export default Popup;
