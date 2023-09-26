'use client'
import React, { useEffect, useState } from "react";
import { getUserData, updateUserData } from "@/lib/functions";
import LoadingScreen from "../_components/LoadingScreen";
import { useMyContext } from "@/components/MyContext";
import ProfileView from "./components/ProfileView";
import ProfileEditor from "./components/ProfileEditor";

type ProfileData = {
  id: string;
  name: string;
  email: string;
  prefs: {
    bio: string;
    phoneNumber: string;
    country: string;
    profileImage: string;
    countryFlagEmoji: string;
    profileImageId: string;
    avatarUrl: string; // Add avatarUrl property
    coverPhotoUrl: string; // Add coverPhotoUrl property
  };
  status: boolean;
  emailVerification: boolean;
  registration: string;
};

const ModernProfilePage: React.FC = () => {
  const { user } = useMyContext();
  const [editing, setEditing] = useState(false);
  const [userData, setUserData] = useState<ProfileData | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const profileData: ProfileData = {
          id: user?.$id || "",
  name: user?.name || "",
  email: user?.email || "",
  prefs: {
    bio: user?.prefs.bio || "",
    phoneNumber: user?.prefs.phoneNumber || "",
    country: user?.prefs.country || "",
    profileImage: user?.prefs.profileImage || "",
    countryFlagEmoji: user?.prefs.countryFlagEmoji || "",
    profileImageId: user?.prefs.profileImageId || "",
    avatarUrl: "",
    coverPhotoUrl: "", 
  },
  status: user?.status || false, // Add the 'status' property here
  registration: user?.registration || '', // Optional: Add default values for other optional properties
  emailVerification: user?.emailVerification || false,
          
        };
        setUserData(profileData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }

    fetchData();
  }, []);

  const handleOpen = () => {
    setEditing(true);
  };

  const handleCancelEdit = () => {
    setEditing(false);
  };

  const handleSaveProfile = async (updatedData: ProfileData) => {
    // Make sure updatedData includes email, status, and emailVerification properties
    try {
      await updateUserData(updatedData);
      setUserData(updatedData);
      setEditing(false);
    } catch (error) {
      console.error("Error updating user data:", error);
      throw error;
    }
  };

  if (!userData) {
    return <LoadingScreen />;
  }

  return (
    <div className="p-2">
      {editing ? (
        <>
        </>
        // <ProfileEditor
        //   userData={userData}
        //   onSave={handleSaveProfile}
        //   onCancel={handleCancelEdit}
         
        // />
      ) : (
        <ProfileView
         userData={userData}
  

          handleOpen={handleOpen}
        />
      )}
    </div>
  );
};

export default ModernProfilePage;