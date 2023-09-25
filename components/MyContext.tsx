'use client'
import { checkUserInTeam, getCampus, getCoursesByProgramId, getCurrentUserAndSetUser, getProgramsByCampusId } from "@/lib/functions";
import React, { createContext, useContext, useEffect, useState, useMemo, useCallback } from "react";

// Replace this with the actual UserWithId interface or type


interface MyContextState {
  campuses: any[];
  user: UserWithId | null;
  programId: string;
  courseId: string;
  currentFile: File | null;
  programs: any[];
  courses: any[];
  campusId: string;
  activeStep: number;
  isLastStep: boolean;
  isFirstStep: boolean;
  isProgramPopoverOpen: boolean;
  isCoursePopoverOpen: boolean;
  isCampusPopoverOpen: boolean;
}

interface MyContextActions {
  setCurrentFile: (file: File | null) => void;
  setCourseId: (courseId: string) => void;
  setUser: (user: UserWithId | null) => void;
  setProgramId: (programId: string) => void;
  setCampusId: (campusId: string) => void;
  
  setPrograms: (programs: any[]) => void;
  setCourses: (courses: any[]) => void;
  setActiveStep: (step: number) => void;
  setIsLastStep: (isLast: boolean) => void;
  setIsFirstStep: (isFirst: boolean) => void;
  setIsProgramPopoverOpen: (isOpen: boolean) => void;
  setIsCoursePopoverOpen: (isOpen: boolean) => void;
  setIsCampusPopoverOpen: (isOpen: boolean) => void;
  checkUserMembership: () => Promise<void>;
  userInTeam: boolean;
}

const MyContext = createContext<MyContextState & MyContextActions>({} as any);

// Custom hook to access the context
function useMyContext() {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error("useMyContext must be used within a MyContextProvider");
  }
  return context;
}

const MyContextProvider : React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentFile, setCurrentFile] = useState<File | null>(null);
  const [courseId, setCourseId] = useState<string>("");
  const [user, setUser] = useState<UserWithId | null>(null);
  const [programId, setProgramId] = useState<string>("");
  const [campuses, setCampuses] = useState<any[]>([]);
  const [campusId, setCampusId] = useState<string>(""); // Renamed from 'campusId' to 'campusId'
  const [programs, setPrograms] = useState<any[]>([]);
  const [courses, setCourses] = useState<any[]>([]);
  const [activeStep, setActiveStep] = useState(0);
  const [isLastStep, setIsLastStep] = useState(false);
  const [isFirstStep, setIsFirstStep] = useState(false);
  const [isProgramPopoverOpen, setIsProgramPopoverOpen] = useState(false); // Renamed from 'open' to 'isProgramPopoverOpen'
  const [isCoursePopoverOpen, setIsCoursePopoverOpen] = useState(false); // Renamed from 'open1' to 'isCoursePopoverOpen'
  const [isCampusPopoverOpen, setIsCampusPopoverOpen] = useState(false);
const [userInTeam, setUserInTeam] = useState(false);
  useEffect(() => {
    async function fetchData() {
      try {
        const campusList = await getCampus();
        setCampuses(campusList);

        const userId = await getCurrentUserAndSetUser();
        console.log("🚀 ~ file: MyContext.tsx:78 ~ fetchData ~ userId:", userId)
      
        setUser(userId);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    }

    fetchData();
  }, [campusId, programId]); // Added campusId and programId as dependencies
  // const checkUserMembership = useCallback(async (): Promise<void> => {
  //   try {
  //     const isUserInTeam = await checkUserInTeam();
  //     console.log("Is user in team:", isUserInTeam);
  //     setUserInTeam(isUserInTeam);
  //   } catch (error) {
  //     console.error("Error checking team membership:", error);
  //     setUserInTeam(false);
  //   }
   
  // }, []);
  const checkUserMembership = useCallback(async (): Promise<void> => {
    try {
      const isUserInTeam = await checkUserInTeam();
      console.log("Is user in team:", isUserInTeam);
      setUserInTeam(isUserInTeam);
    } catch (error) {
      console.error("Error checking team membership:", error);
      setUserInTeam(false);
    }
  }, []);
  
  useEffect(() => {
    checkUserMembership();
  }, []);



  // Memoized functions
  const handleProgramChange = useMemo(
    () => async (selectedValue: string) => {
      setProgramId(selectedValue);
      // Fetch courses for the selected program
      const response = await getCoursesByProgramId(selectedValue);
      setCourses(response);
    },
    [setProgramId, setCourses]
  );

  const handleCampusChange = useMemo(
    () => async (selectedValue: string) => {
      console.log(selectedValue);

      // Fetch courses for the selected program
      const response = await getProgramsByCampusId(selectedValue);
      setPrograms(response);
    },
    [setPrograms]
  );

  const contextValue: MyContextState & MyContextActions = {
    campuses,
    user,
    programId,
    campusId,
    courseId,
    currentFile,
    programs,
    courses,
    activeStep,
    isLastStep,
    isFirstStep,
    isProgramPopoverOpen,
    isCoursePopoverOpen,
    isCampusPopoverOpen,
    setCurrentFile,
    setCourseId,
    setUser,
    setProgramId,
    setCampusId,
    setPrograms,
    setCourses,
    setActiveStep,
    setIsLastStep,
    setIsFirstStep,
    setIsProgramPopoverOpen,
    setIsCoursePopoverOpen,
    setIsCampusPopoverOpen,
    checkUserMembership,
    userInTeam,
  };

  return <MyContext.Provider value={contextValue}>{children}</MyContext.Provider>;
};

export { MyContextProvider, useMyContext, };
