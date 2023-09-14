
import { useEffect, useState } from "react";
import { getCampus } from "@/lib/functions";

export function useCampuses() {
  const [campuses, setCampuses] = useState([]);
  console.log("🚀 ~ file: useCampuses.js:7 ~ useCampuses ~ campuses:", campuses)

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
