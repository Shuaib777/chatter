import React, { useContext, useState } from 'react'
import {database, refdb} from "../firebase";
import { onValue, serverTimestamp, update } from "firebase/database";
import { AuthContext } from "../context/authContext";

const Search = () => {
  const [username, setUsername] = useState('');
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);

  const {currentUser} = useContext(AuthContext);

  const handleSearch = () => {

    onValue(refdb(database, 'users/'), (snapshot) => {

      // when a user(second user) exist
      if(snapshot.val()[username]) {
        setUser(snapshot.val()[username]);
        setErr(false);

      } else {
        setErr(true);
      }
    });
  }

  const handleKey = (e) => {
    {e.key === 'Enter' && handleSearch();}
  }

  const handleClick = async () => {
    const combinedID = user.uid > currentUser.uid? user.uid + currentUser.uid : currentUser.uid + user.uid;

    try {
      onValue(refdb(database, 'chats/'+ combinedID), (snapshot) => {
        console.log(snapshot.val().message);
      }).catch(async (err) =>  {

        //if previous conversation does not exists(i.e. path does not exist) then create this path
        await update(refdb(database, 'chats/'+combinedID), {
          message: ['Start conversation']
        })

      })
    } catch(err) {

      //if previous conversation does not exists(i.e. path does not exist) then create this path
      await update(refdb(database, 'chats/'+combinedID), {
        message: ['Start conversation']
      })

      // let today = new Date();
      // let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
      // let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      // let dateTime = date+' '+time;

      await update(refdb(database, `userChats/${currentUser.uid}/`+combinedID), {
        userinfo: {
          uid: user.uid,
          displayname: user.displayName,
          photoURL: user.photoURL
        },
        date : serverTimestamp(),
        lastMessage: {text: 'start conversation'}
      })
      await update(refdb(database, `userChats/${user.uid}/`+combinedID), {
        userinfo: {
          uid: currentUser.uid,
          displayname: currentUser.displayName,
          photoURL: currentUser.photoURL
        },
        date : serverTimestamp()
      })

    }
    setUser(null);
    setUsername("");
  }

  return (
    <div className="search">
      <div className="searchForm">
        <input type="text" placeholder='Find a user with userID' value={username} onKeyDown={handleKey} onChange={e => setUsername(e.target.value)}/>
      </div>
      {err && <span style={{color: "red", marginLeft: "10px"}}>User not found!!</span>}
      {user &&
        <div className="userChat" onClick={handleClick}>
          <img src={user.photoURL} alt="" />
          <div className="userChatInfo">
            <span>{user.displayName}</span>
          </div>
        </div>
        }
    </div>
  )
}

export default Search