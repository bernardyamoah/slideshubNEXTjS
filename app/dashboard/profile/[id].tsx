'use client'
import React, { useEffect, useState } from "react";
import { getUserData, updateUserData } from "@/lib/functions";
import LoadingScreen from "../_components/LoadingScreen";
import { useMyContext } from "@/components/MyContext";



const ModernProfilePage: React.FC = () => {
  const { user } = useMyContext();
 



  return (
    <div className="p-2">
    Profile page
    </div>
  );
};

export default ModernProfilePage;