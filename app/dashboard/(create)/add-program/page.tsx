'use client'

import { useEffect, useState } from "react"

import { Button } from '@/components/ui/button';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { createProgram, errorMessage} from '@/lib/functions';


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

import { toast } from "sonner";
import { useUserContext } from "@/components/UserContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";




export default function Page() {
  const {user}=useUserContext();
 
 const[data,setData]=useState({name:'',duration:'',value:''})
 
 
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
    setData(prevData => ({...prevData, value: selectedValue}));
    
  };

  const validateForm = () => {
    let isValid = true;
    let errors: { [key: string]: string } = {}; // Define the type of errors object
  
    if (!data.name.trim()) {
      isValid = false;
      errors = { ...errors, name: "Program Name is required" };
    }
  
    if (!data.duration.trim()) {
      isValid = false;
      errors = { ...errors, duration: "Duration is required" };
    }
  
    if (!data.value.trim()) {
      isValid = false;
      errors = { ...errors, campus: "Campus is required" };
    }
  
    return { isValid, errors };
  };
  // Handle form submission
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const { isValid, errors } = validateForm();

    if (!isValid) {
      // Display errors here
     
      Object.values(errors).forEach((errorMessage) => {
        toast.error(errorMessage);
      });
      return;
    }

    try {
     


      const programData = {
        name: data.name,
  duration: data.duration,
  campusId: data.value,
  user_id: user?.name

      };

      await createProgram(programData);



      // Reset form fields
      setData({name:'',duration:'',value:''});
    

    } catch (error) {
      errorMessage('Error creating program:' + error);
      // Handle error
    }
  };
  

  
  return (
    <>



     <Card className="max-w-xl mx-auto mb-10"  >
     <CardHeader>
        <CardTitle>
            Add Program
        </CardTitle>
     </CardHeader>
    <CardContent>
    <form onSubmit={handleSubmit} className="w-full  p-6 mx-auto place-content-center">
        <div className="grid w-full gap-4">


        

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Program Name</Label>
              <Input
                id="name"
                placeholder="BSc Materials Engineering"
                value={data.name} 
                onChange={(e) => setData(prevData => ({...prevData, name: e.target.value}))}
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
                value={data.duration} 
                onChange={(e) => setData(prevData => ({...prevData, duration: e.target.value}))}
              />
            </div>



         






          <div className="flex justify-between mt-16">
           
              <Button type="submit"  >
                Submit
              </Button>
          </div>

        </div>

     
      </form>
      </CardContent>

   </Card>


    </>
  );
}
