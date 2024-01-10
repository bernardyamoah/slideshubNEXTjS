// customHooks/useCourses.js
import { useEffect, useState } from "react";
import { getCourses } from "@/lib/functions";

export function useCourses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    async function fetchCourses() {
      try {
        const response = await getCourses();
        setCourses(response);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    }

    fetchCourses();
  }, []);

  return courses;
}