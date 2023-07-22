import { createContext, useContext, useReducer } from "react";
import { AuthContext } from "./authContext";

export const ChatContext = createContext();

export const ChatContextProvider = ({children}) => {

    const {currentUser} = useContext(AuthContext);

    const INITIAL_STATE = {
        chatID: "null",
        user: {}
    }

    //here state is the current state and action is the type of action to be done on the state
    const chatReducer = (state, action) => {
        switch(action.type) {
            case "CHANGE_USER": 
                return {
                    user: action.payload,
                    chatID: currentUser.uid > action.payload.uid ? currentUser.uid + action.payload.uid : action.payload.uid + currentUser.uid
                };
            default : return state;
        }
    };

    //useReducer takes two param one is the reducer and second is the initial state and returns two value: updated state and the dispatch
    //dispatch is used to trigger the action which needs to be performed on the state
    const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

    return (
        <ChatContext.Provider value={{data: state, dispatch}}>
            {children}
        </ChatContext.Provider>
    )
}
