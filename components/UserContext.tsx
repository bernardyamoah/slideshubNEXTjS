"use client";
import {
  account,
  teams,
} from "@/appwrite";
import {

  errorMessage,
  getCurrentUserAndSetUser,
  logIn,
  logOut,
  signUp,
} from "@/lib/functions";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

interface User {
  $id: string;
  name: string;
  email: string;
  labels?: string[];
  prefs: {};
  status: boolean;
  registration: string;
  emailVerification: boolean;
}

interface MyContextState {
  user: User | null;
  loading: boolean;
  userInTeam: boolean;
  signOut: () => void;
  login: (email: string, password: string) => Promise<void>; // Updated this line
}

interface MyContextActions {
  setUser: (user: User | null) => void;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const UserContext = createContext<MyContextState | undefined>(undefined);
const MyContextActions = createContext<MyContextActions | undefined>(undefined);

function useUserContext() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error(
      "useMyContextState must be used within a UserContextProvider",
    );
  }
  return context;
}

function useMyContextActions() {
  const context = useContext(MyContextActions);
  if (!context) {
    throw new Error(
      "useMyContextActions must be used within a UserContextProvider",
    );
  }
  return context;
}

const UserContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  const [userInTeam, setUserInTeam] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const login = async (email: string, password: string) => {
    try {
      await logIn(email, password);
      const currentUser = await getCurrentUserAndSetUser();
      setUser(currentUser);
      router.push("/dashboard");
    } catch (error) {
      errorMessage("Error logging in");
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      await signUp(name, email, password);
      const currentUser = await getCurrentUserAndSetUser();
      setUser(currentUser);

      router.push("/dashboard");
    } catch (error) {
      errorMessage("Error registering");
      router.push("/register");
    }
  };

  const signOut = async () => {
    try {
      await logOut();
      router.push("/");
      setUser(null);
    } catch (error) {
      errorMessage("Error signing out");
    }
  };
  const getUserID = async (): Promise<string> => {
    try {
      const request = await account.get();
      return request.$id;
    } catch (error) {
      throw new Error("Error fetching user ID: " + error);
    }
  };

  const checkUserInTeam = async () => {
    try {
      const response = await teams.listMemberships(
        process.env.NEXT_PUBLIC_TEAM_ID!
      );
      const userId = await getUserID();

      // Check if the user's ID exists in the list of team members
      const userIds = response.memberships.map(
        (membership: any) => membership.userId
      );
      const isUserInTeam = userIds.includes(userId);
      if (isUserInTeam) return isUserInTeam;
      else return false;
    } catch (error) {
      console.error("Error checking team membership:", error);
      return false;
    }
  };
  useEffect(() => {
    async function fetchUser() {
      try {
        const currentUser = await getCurrentUserAndSetUser();
        const isUserInTeam = await checkUserInTeam();
        setUser(currentUser);
        setUserInTeam(isUserInTeam);
        setLoading(false);
      } catch (error) {
        errorMessage("Error fetching user");
        setLoading(false);
      }
    }

    fetchUser();
  }, []); // No dependencies to avoid infinite loop

  const contextValue: MyContextState = {
    user,
    signOut,
    loading,
    login,
    userInTeam,
  };

  const contextActions: MyContextActions = {
    setUser,
    login,
    register,
    signOut,
  };

  return (
    <UserContext.Provider value={contextValue}>
      <MyContextActions.Provider value={contextActions}>
        {children}
      </MyContextActions.Provider>
    </UserContext.Provider>
  );
};

export { UserContextProvider, useUserContext, useMyContextActions };
