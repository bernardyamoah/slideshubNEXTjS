'use client'
import * as React from "react"
import { useEffect, useState } from "react"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { getCampus } from "@/lib/getCampus"
const [campuses, setCampuses] = useState<any[]>([]); // Initialize as an empty array
useEffect(() => {
    async function fetchCampuses() {
      try {
        const response = await getCampus();
        setCampuses(response);
      } catch (error) {
        console.log('Error fetching campuses:', error);
      }
    }

    fetchCampuses();
  }, []);

export function SelectDemo() {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select campus" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Campus</SelectLabel>
          {campuses.map((campus) => (
            <SelectItem value={campus.$id}>{campus.name}</SelectItem>
          ))}
        
         
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
