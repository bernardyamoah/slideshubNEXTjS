import { useEffect, useState } from "react";
import { getCoursesByProgramId } from "@/lib/functions";

export function useCourses(programId) {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    async function fetchCourses() {
      if (programId) {
        try {
          const response = await getCoursesByProgramId(programId);
          setCourses(response);
        } catch (error) {
          console.error('Error fetching courses:', error);
        }
      }
    }

    fetchCourses();
  }, [programId]);

  return courses;
}
