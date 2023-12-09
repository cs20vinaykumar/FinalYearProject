import React, { createContext, useContext, useState } from "react";

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = (props) => {
  const [user, setUser] = useState("");

  const setUserEmail = (newEmail) => {
    setUser(newEmail);
  };

  return (
    <AppContext.Provider value={{ user, setUserEmail }}>
      {props.children}
    </AppContext.Provider>
  );
};
