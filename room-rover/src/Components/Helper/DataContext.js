import React, { createContext, useContext, useState } from 'react';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [data, setData] = useState({});
  const [scrollPosition, setScrollPosition] = useState(0);

  return (
    <DataContext.Provider value={{ data, setData, scrollPosition, setScrollPosition }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
