import { useEffect, useState } from "react";
import { getCampus } from "@/lib/functions";

export function useCampuses() {
  const [campuses, setCampuses] = useState([]);

  useEffect(() => {
    async function fetchCampuses() {
      try {
        const campusList = await getCampus();
        setCampuses(campusList);
      } catch (error) {
        console.error('Error fetching campuses:', error);
      }
    }

    fetchCampuses();
  }, []);

  return campuses;
}