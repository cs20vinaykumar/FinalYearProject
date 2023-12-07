import React, { createContext, useContext, useState } from "react";

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = (props) => {
  const [user, setEmail] = useState("");

  const setUserEmail = (newEmail) => {
    setEmail(newEmail);
  };

  return (
    <AppContext.Provider value={{ user, setUserEmail }}>
      {props.children}
    </AppContext.Provider>
  );
};
