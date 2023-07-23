'use client'
import React, { useEffect, useState } from "react";
import { getUserData, updateUserData } from "@/lib/functions";


import "react-toastify/dist/ReactToastify.css";
import ProfileView from "./components/ProfileView";
import ProfileEditor from "./components/ProfileEditor";

import SlidesLoading from "@/components/ui/slidesLoading";
import LoadingScreen from "../components/LoadingScreen";





const ModernProfilePage: React.FC = () => {
  const [userData, setUserData] = useState<ProfileData | null>(null);
  const [editing, setEditing] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    async function fetchData() {
      try {
        const userPrefs = await getUserData();
        const profileData: ProfileData = {
          id: userPrefs.id,
          name: userPrefs.name,
          email: userPrefs.email,
          prefs: {
            bio: userPrefs.prefs.bio,
            avatarUrl: userPrefs.prefs.avatarUrl,
            coverPhotoUrl: userPrefs.prefs.coverPhotoUrl,
            phoneNumber: userPrefs.prefs.phoneNumber,
            country: userPrefs.prefs.country,
            countryFlagEmoji: userPrefs.prefs.countryFlagEmoji,
            profileImage: userPrefs.prefs.profileImage,
            profileImageId: userPrefs.prefs.profileImageId,
          },
          status: userPrefs.status,
          registration: userPrefs.registration,
          emailVerification: userPrefs.emailVerification,
        };
        setUserData(profileData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }

    fetchData();
  }, []);
  const handleOpen = () => {
    setOpen(true);
    setEditing(true);
  };

  // const handleEditProfile = () => {
  //   setEditing(true);
  // };

  const handleCancelEdit = () => {
    setEditing(false);
  };

  const handleSaveProfile = async (updatedData: ProfileData) => {
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
    return <LoadingScreen />
  }

  return (
    <div className="p-2">

      {editing ? (
        <ProfileEditor
          id={userData.id}
          coverImageUrl={userData.prefs.coverPhotoUrl}
          onSave={handleSaveProfile}
          onCancel={handleCancelEdit}

          name={userData.name}
          email={userData.email}

          prefs={userData.prefs}
          status={userData.status}
          registration={userData.registration}
          emailVerification={userData.emailVerification}
        />
      ) : (
        <ProfileView
          name={userData.name}
          email={userData.email}
          phoneNumber={userData.prefs.phoneNumber}
          country={userData.prefs.country}
          bio={userData.prefs.bio}
          profileImage={userData.prefs.profileImage}
          verified={userData.emailVerification}
          registration={userData.registration}
          coverImageUrl={userData.prefs.coverPhotoUrl}
          countryFlagEmoji={userData.prefs.countryFlagEmoji}

          handleOpen={handleOpen}

        />
      )}



    </div>
  );
};

export default ModernProfilePage;
