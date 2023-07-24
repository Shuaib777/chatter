import { createContext, useReducer } from "react";

export const PopupContext = createContext();

export const PopupContextProvider = ({ children }) => {
  const INITIAL_STATE = {
    isOpen: false,
  };

  const popupReducer = (state, action) => {
    switch (action.type) {
      case "CHANGE_STATE":
        return {
          isOpen: action.payload,
          id: action.id,
        };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(popupReducer, INITIAL_STATE);

  return (
    <PopupContext.Provider value={{ popupState: state, dispatch }}>
      {children}
    </PopupContext.Provider>
  );
};
