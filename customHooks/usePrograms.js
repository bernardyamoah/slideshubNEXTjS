import { useEffect, useState } from "react";
import { getProgramsByCampusId } from "@/lib/functions";

export function usePrograms(campusId) {
  const [programs, setPrograms] = useState([]); 

  useEffect(() => {
    async function fetchPrograms() {
      if (campusId) {
        try {
          const response = await getProgramsByCampusId(campusId);
          setPrograms(response);
        } catch (error) {
          console.error('Error fetching programs:', error);
        }
      }
    }

    fetchPrograms();
  }, [campusId]);

  return programs;
}
