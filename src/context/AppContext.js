import { createContext, useState, useEffect } from "react";

export const AppContext = createContext("");

function AppProvider({ children }) {
  const [user, setUser] = useState();

  useEffect(() => {
    let currentUser = localStorage.getItem("TBuser");
    if (currentUser) {
      currentUser = JSON.parse(currentUser);
      setUser(currentUser);
    }
  }, []);

  return (
    <AppContext.Provider value={{ user, setUser }}>
      {children}
    </AppContext.Provider>
  );
}

export default AppProvider;
