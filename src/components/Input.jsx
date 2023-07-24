import React, { useContext, useState } from "react";
import attach from "../image/attach.png";
import image from "../image/img.png";
import { AuthContext } from "../context/authContext";
import { ChatContext } from "../context/chatContext";
import { onValue, serverTimestamp, update } from "firebase/database";
import { database, refdb, storage } from "../firebase";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const Input = () => {
  const [len, setLen] = useState(0);
  const [text, setText] = useState("");
  const [img, setImg] = useState("");

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSend = async () => {
    if (text !== "") {
      onValue(refdb(database, `chats/${data.chatID}/message`), (snapshot) => {
        setLen(snapshot.val().length);
      });

      if (img) {
        const storageRef = ref(storage, uuid());

        await uploadBytesResumable(storageRef, img).then(() => {
          getDownloadURL(storageRef).then(async (downloadURL) => {
            await update(refdb(database, `chats/${data.chatID}/message`), {
              [len]: {
                id: uuid(),
                text,
                senderID: currentUser.uid,
                date: serverTimestamp(),
                img: downloadURL,
              },
            });
            console.log("image uploaded");
          });
        });
      } else {
        await update(refdb(database, `chats/${data.chatID}/message`), {
          [len]: {
            id: uuid(),
            text,
            senderID: currentUser.uid,
            date: serverTimestamp(),
          },
        });
      }

      await update(
        refdb(
          database,
          `userChats/${currentUser.uid}/${data.chatID}/lastMessage`
        ),
        {
          text: text.substring(0, 10) + "...",
        }
      );

      await update(
        refdb(database, `userChats/${currentUser.uid}/${data.chatID}`),
        {
          ["/date"]: serverTimestamp(),
        }
      );

      setText("");
      setImg(null);
    }
  };
  return (
    <div className="input">
      <input
        type="text"
        placeholder="type something..."
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      <div className="send">
        <img src={attach} alt="" />
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
