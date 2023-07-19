import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase"
import { onAuthStateChanged } from "firebase/auth";

export const AuthContext = createContext();

//under provider write the state which you want to pass to the children
export const AuthContextProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState({});

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
        })

        return () => {
            unsub();
        }
    }, [])

    return (
        <AuthContext.Provider value={{currentUser}}>
            {children}
        </AuthContext.Provider>
    )
}
