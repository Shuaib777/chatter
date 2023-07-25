import React, { useContext, useState } from "react";
import { database, refdb } from "../firebase";
import {
  onValue,
  serverTimestamp,
  update,
  orderByChild,
  query,
  equalTo,
  get,
  child,
  orderByValue,
} from "firebase/database";
import { AuthContext } from "../context/authContext";

const Search = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);

  const { currentUser } = useContext(AuthContext);

  const handleSearch = () => {
    onValue(
      query(
        refdb(database, "users/"),
        orderByChild("displayName"),
        equalTo(username)
      ),
      (snapshot) => {
        if (snapshot.exists()) {
          Object.entries(snapshot.val()).map((userKeyValue) =>
            setUser(userKeyValue[1])
          );
        } else {
          setErr(true);
        }
      }
    );
  };

  const handleKey = (e) => {
    {
      e.key === "Enter" && handleSearch();
    }
  };

  const handleClick = async () => {
    const combinedID =
      user.uid > currentUser.uid
        ? user.uid + currentUser.uid
        : currentUser.uid + user.uid;

    await update(refdb(database, "chats/" + combinedID), {
      message: ["Start conversation"],
    });

    // let today = new Date();
    // let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    // let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    // let dateTime = date+' '+time;

    await update(
      refdb(database, `userChats/${currentUser.uid}/` + combinedID),
      {
        userinfo: {
          uid: user.uid,
          displayname: user.displayName,
          photoURL: user.photoURL,
        },
        date: serverTimestamp(),
        lastMessage: { text: "start conversation" },
      }
    );
    await update(refdb(database, `userChats/${user.uid}/` + combinedID), {
      userinfo: {
        uid: currentUser.uid,
        displayname: currentUser.displayName,
        photoURL: currentUser.photoURL,
      },
      date: serverTimestamp(),
    });
    setUser(null);
    setUsername("");
  };

  return (
    <div className="search">
      <div className="searchForm">
        <input
          type="text"
          placeholder="Find a user with userID"
          value={username}
          onKeyDown={handleKey}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      {err && (
        <span style={{ color: "red", marginLeft: "10px" }}>
          User not found!!
        </span>
      )}
      {user && (
        <div className="userChat" onClick={handleClick}>
          <img src={user.photoURL} alt="" />
          <div className="userChatInfo">
            <span>{user.displayName}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
