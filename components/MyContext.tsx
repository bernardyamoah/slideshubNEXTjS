'use client'
import { checkUserInTeam, getCurrentUserAndSetUser} from "@/lib/functions";
import React, { createContext, useContext, useEffect, useState, useMemo, useCallback } from "react";


interface MyContextState {
  user: User<any> | null;
  loading: boolean;
}

interface MyContextActions {
  setUser: (user: User<any> | null) => void;
  checkUserMembership: () => Promise<void>;
  userInTeam: boolean;
  loading: boolean;
}

const MyContext = createContext<MyContextState & MyContextActions>({} as any);

function useMyContext() {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error("useMyContext must be used within a MyContextProvider");
  }
  return context;
}

const MyContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User<any> | null>(null);
  const [userInTeam, setUserInTeam] = useState(false);

  useEffect(() => {
    async function fetchUser() {
      try {
        const user = await getCurrentUserAndSetUser();
        setUser(user);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchUser();
  }, []);

  const checkUserMembership = useCallback(async (): Promise<void> => {
    try {
      const isUserInTeam = await checkUserInTeam();
      setUserInTeam(isUserInTeam);
    } catch (error) {
      console.error("Error checking team membership:", error);
      setUserInTeam(false);
    }
  }, []);

  useEffect(() => {
    checkUserMembership();
  }, [checkUserMembership]);

  const contextValue: MyContextState & MyContextActions = {
    user,
    setUser,
    checkUserMembership,
    userInTeam,
    loading: !user,
  };

  return <MyContext.Provider value={contextValue}>{children}</MyContext.Provider>;
};

export { MyContextProvider, useMyContext };