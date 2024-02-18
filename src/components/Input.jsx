import React, { useContext, useEffect, useState } from "react";
import image from "../image/img.png";
import { Backdrop, CircularProgress } from "@mui/material";
import { AuthContext } from "../context/authContext";
import { ChatContext } from "../context/chatContext";
import { onValue, serverTimestamp, update } from "firebase/database";
import { database, refdb, storage } from "../firebase";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const Input = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState("");
  const [loading, setLoading] = useState(false);

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const [message, setMessage] = useState([]);

  useEffect(() => {
    data.chatID !== "null" &&
      onValue(refdb(database, `chats/` + data.chatID), (snapshot) => {
        setMessage(snapshot.val()["message"]);
      });
  }, [data.chatID]);

  const handleSend = async () => {
    const storageRef = ref(storage, uuid());
    const info = {
      id: uuid(),
      senderID: currentUser.uid,
      date: serverTimestamp(),
    };

    if (img && !text) {
      setLoading(true);
      await uploadBytesResumable(storageRef, img).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          setLoading(false);
          setMessage(message.push({ ...info, img: downloadURL }));

          await update(refdb(database, `chats/${data.chatID}`), {
            message,
          });
          console.log("image uploaded");
        });
      });
    } else if (img && text) {
      setLoading(true);
      await uploadBytesResumable(storageRef, img).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          setLoading(false);
          setMessage(message.push({ ...info, img: downloadURL, text }));

          await update(refdb(database, `chats/${data.chatID}`), {
            message,
          });
          console.log("image uploaded");
        });
      });
    } else if (!img && text) {
      setMessage(message.push({ ...info, text }));

      await update(refdb(database, `chats/${data.chatID}`), {
        message,
      });
    }

    await update(
      refdb(
        database,
        `userChats/${currentUser.uid}/${data.chatID}/lastMessage`
      ),
      {
        text: text.length > 10 ? text.substring(0, 10) + "..." : text,
      }
    );

    await update(
      refdb(database, `userChats/${currentUser.uid}/${data.chatID}`),
      {
        date: serverTimestamp(),
      }
    );

    setText("");
    setImg(null);
  };
  return (
    <div className="input">
      {loading && (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open
        >
          <CircularProgress color="inherit" />
          <p style={{ marginLeft: "10px" }}>Uploading image</p>
        </Backdrop>
      )}
      <input
        type="text"
        placeholder="type something..."
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      <div className="send">
        <input
          type="file"
          id="file"
          style={{ display: "none" }}
          onChange={(e) => setImg(e.target.files[0])}
        />
        <label htmlFor="file">
          <img src={image} alt="" />
        </label>
        <button onClick={handleSend}>send</button>
      </div>
    </div>
  );
};

export default Input;
