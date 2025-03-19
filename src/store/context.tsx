"use client"
import { UserButton, useUser } from "@clerk/nextjs";
import { createContext, ReactNode, useContext } from "react";

// Define the type for the context value
interface AppContextValue {
    user: ReturnType<typeof useUser>["user"]; // Extract the `user` property from the hook's return value
}

// Create the context with an initial value of an empty object
export const AppContext = createContext<AppContextValue>({} as AppContextValue);


// Define the props for the AppProvider component
interface AppProviderProps {
  children: ReactNode;
}


export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const {user} = useUser();

  const value: AppContextValue = {
    user,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

// Optional: Create a custom hook to use the AppContext
export const useAppContext = () => useContext(AppContext);