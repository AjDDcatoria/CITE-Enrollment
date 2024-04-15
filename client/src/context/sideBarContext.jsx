import { createContext, useState } from "react";

const SideBarContext = createContext();

const SideBarContextProvider = ({ children }) => {
  const [sideBarInfo, setSideBarInfo] = useState("");

  return (
    <SideBarContext.Provider value={{ sideBarInfo, setSideBarInfo }}>
      {children}
    </SideBarContext.Provider>
  );
};

export { SideBarContext, SideBarContextProvider };
