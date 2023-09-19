
import { useEffect, useState } from "react";
import { getCampus } from "@/lib/functions";
import toast from "react-hot-toast";

export function useCampuses() {
  const [campuses, setCampuses] = useState([]);
  
  useEffect(() => {
    async function fetchCampuses() {
      try {
        const campusList = await toast.promise(getCampus(),{
          loading: 'Embarking on an adventure...',
          success: <b>Adventure awaits! Campuses found!</b>,
          error: <b>Lost in the jungle of campuses. Could not find any.</b>,
        });
        setCampuses(campusList);
      } catch (error) {
        console.error('Error fetching campuses:', error);
      }
    }

    fetchCampuses();
  }, []);

  return campuses;
}
