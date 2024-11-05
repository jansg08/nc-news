import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    username: "icellusedkars",
    name: "sam",
    avatar_url: "https://avatars2.githubusercontent.com/u/24604688?s=460&v=4",
  });
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
