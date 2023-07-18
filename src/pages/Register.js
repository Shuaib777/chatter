import React, { useState } from "react";
import Add from "../image/addAvatar.png";
import { auth, storage, database, refdb } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { update } from "firebase/database";
// import { setDoc, doc } from "firebase/firestore";

const Register = () => {
  const [err, setErr] = useState(false);
  const [avatar, setAvatar] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].value[0];

    if (displayName === "") {
      setErr(() => "Name field cannot be empty");
      return;
    }

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      const storageRef = ref(storage, displayName);

      const uploadTask = uploadBytesResumable(storageRef, file);

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          try {
            console.log(downloadURL);
            console.log(res.user);
            setAvatar(true);

            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });

            await update(refdb(database, 'users/' + res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

          //   this is for firestore
          //   await setDoc(doc(db, "users", res.user.uid), {
          //     uid: res.user.uid,
          //     displayName,
          //     email,
          //     photoURL: downloadURL,
          // });

          } catch (error) { 
              const errorMessage = error.message.substring(22, error.message.length - 2);
              setErr(() => errorMessage);
          }  
        });
      });

    } catch (error) { 
      const errorMessage = error.message.substring(22, error.message.length - 2);
      setErr(() => errorMessage);
    }
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Chatter</span>
        <span className="title">Register</span>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Name" />
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <input style={{ display: "none" }} type="file" id="file" />
          <label htmlFor="file">
            <img src={Add} alt="" />
            <span>{avatar?'✅':'Add an avatar'}</span>
          </label>
          <button>Sign up</button>
          {err && <span style={{ color: "red" }}>{err}!!</span>}
          <p>Already a member? Login</p>
        </form>
      </div>
    </div>
  );
};

export default Register;
