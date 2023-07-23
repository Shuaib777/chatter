import React, { useState } from "react";
import tick from "../image/tickmark.png";
import Add from "../image/addAvatar.png";
import { auth, storage, database, refdb } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { update } from "firebase/database";
import { Link, useNavigate } from "react-router-dom";
// import { setDoc, doc } from "firebase/firestore";

const Register = () => {
  const [err, setErr] = useState(false);
  const [avatar, setAvatar] = useState(false);
  const navigate = useNavigate();

  const handlechange = () => {
    setAvatar(true);
  };

  //The keyword async before a function makes the function return a promise.
  //The await keyword makes the function pause the execution and wait for a resolved promise before it continues.
  //here updateProfile, update, etc returns a promises.

  const handleSubmit = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    if (displayName === "") {
      setErr(() => "Name field cannot be empty");
      return;
    }

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      // await sendEmailVerification(auth.currentUser).then(() => {
      //   alert("Email verification Link send to your email address");
      // });

      const storageRef = ref(storage, email);

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            setAvatar(true);

            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });

            await update(refdb(database, "users/" + res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            await update(refdb(database, "userChats/"), {
              [res.user.uid]: "start conversation",
            });
            navigate("/");

            //   this is for firestore
            //   await setDoc(doc(db, "users", res.user.uid), {
            //     uid: res.user.uid,
            //     displayName,
            //     email,
            //     photoURL: downloadURL,
            // });
          } catch (error) {
            const errorMessage = error.message.substring(
              22,
              error.message.length - 2
            );
            setErr(() => errorMessage);
          }
        });
      });
    } catch (error) {
      const errorMessage = error.message.substring(
        22,
        error.message.length - 2
      );
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
          <input
            style={{ display: "none" }}
            type="file"
            id="file"
            onChange={handlechange}
          />
          <label htmlFor="file">
            {avatar || <img src={Add} alt="" />}
            <span>
              {avatar ? (
                <img style={{ width: "40px" }} src={tick} alt=""></img>
              ) : (
                "Add an avatar"
              )}
            </span>
          </label>
          <button>Sign up</button>
          {err && <span style={{ color: "red" }}>{err}!!</span>}
          <p>
            Already a member?<Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
