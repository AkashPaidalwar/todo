import React, { useEffect } from "react";

const userContext = React.createContext();

const ContextProvider = ({ children }) => {
  const localUser = JSON.parse(localStorage.getItem("user")) || null;
  const [user, setUser] = React.useState(localUser);
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);
  return (
    <userContext.Provider value={{ user, setUser }}>
      {children}
    </userContext.Provider>
  );
};

export { userContext, ContextProvider };
