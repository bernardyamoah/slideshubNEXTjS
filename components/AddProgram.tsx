'use client'
import * as React from "react"
import { useEffect, useState } from "react"
import { storage, ID } from '@/appwrite';
import { Button } from '@/components/ui/button';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { createProgram, errorMessage, getCurrentUserAndSetUser } from '@/lib/functions';

import { UploadProgress } from 'appwrite';
import {toast} from 'sonner';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { getCampus } from "@/lib/functions"
import { useUserContext } from "./UserContext";

interface AddProgramProps {
  user: any;
}



export default function AddProgram() {
  const {user}=useUserContext();
  const [name, setName] = useState('');

  const [duration, setDuration] = useState('');
 
  const [value, setValue] = React.useState("")
 
  const [campuses, setCampuses] = useState<any[]>([]); // Initialize as an empty array
 
  useEffect(() => {
    async function fetchCampuses() {
      try {
        const response = await getCampus();
        setCampuses(response);
        
      } catch (error) {

      }
    }

    fetchCampuses();
  }, []);

  const handleSelectChange = (selectedValue: string) => {
    setValue(selectedValue);
    
  };

  
  // Handle form submission
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
     


      const programData = {
        name,
        duration,
  
        campusId: value,
        user_id: user?.$id

      };

      await createProgram(programData);



      // Reset form fields
      setName('');
      setValue('')
      setDuration('');
     
    

    } catch (error) {
      errorMessage('Error creating program:' + error);
      // Handle error
    }
  };
  

  
  return (
    <>



      <form onSubmit={handleSubmit} className="w-full max-w-3xl p-6 mx-auto place-content-center">
        <div className="grid w-full gap-4">


        

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Program Name</Label>
              <Input
                id="name"
                placeholder="BSc Materials Engineering"
                value={name} required
                onChange={(e) => setName(e.target.value)}
              />
            </div>

         

         

<div className="flex flex-col space-y-1.5">
{/* Select campus */}

<Label htmlFor="campus">Campus</Label>
<Select onValueChange={handleSelectChange}>
  <SelectTrigger className="w-full">
    <SelectValue placeholder="Select campus" />
  </SelectTrigger>


  <SelectContent  position="item-aligned" >


    <SelectGroup >
      <SelectLabel>Campus</SelectLabel>
      {campuses.map((campus) => (
        <SelectItem  key={campus.$id} value={campus.$id} >{campus.name}, <span className='text-sm font-medium text-right'>{campus.location}</span>  </SelectItem>
      ))}


    </SelectGroup>

  </SelectContent>

</Select>


</div>

         


      

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="duration">Duration</Label>
              <Input
                id="duration"
                placeholder="4 years"
                value={duration} required
                onChange={(e) => setDuration(e.target.value)}
              />
            </div>



         






          <div className="flex justify-between mt-16">
           
              <Button type="submit"  >
                Submit
              </Button>
          </div>

        </div>

     
      </form>

   


    </>
  );
}
