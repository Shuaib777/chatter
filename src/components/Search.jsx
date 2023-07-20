import React, { useContext, useState } from 'react'
import {database, refdb} from "../firebase";
import { onValue, update } from "firebase/database";
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
    //check whether the previous conversation exists, if not then create it
    const combinedID = user.uid > currentUser.uid? user.uid + currentUser.uid : currentUser.uid + user.uid;
    try {
      onValue(refdb(database, 'chats/'+ combinedID), (snapshot) => {
        console.log(snapshot.val().message);
      }).catch(async (err) =>  {

        //if previous conversation does not exists(i.e. path does not exist) then create this path
        await update(refdb(database, 'chats/'+combinedID), {
          message: `its working`
        })

      })
    } catch(err) {

      //if previous conversation does not exists(i.e. path does not exist) then create this path
      await update(refdb(database, 'chats/'+combinedID), {
        message: ['Start conversation']
      })

    }
  }

  return (
    <div className="search">
      <div className="searchForm">
        <input type="text" placeholder='Find a user with userID' onKeyDown={handleKey} onChange={e => setUsername(e.target.value)}/>
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