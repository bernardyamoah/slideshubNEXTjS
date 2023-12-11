'use client'
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import { Separator } from "@radix-ui/react-dropdown-menu";
import {getCampus, updateProgram
} from "@/lib/functions";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";


export function ProgramEdit({ data,id,setRefresh,setShowDialog}) {
    const [formFields, setFormFields] = useState({
    updatedName: data?.name || '',
    updatedDuration: data?.duration || '',
    updatedDescription: data?.description || '',
    updatedCampusId: data?.campusId || '',
    });
  
  const [campuses, setCampuses] = useState<Campus[]>([])




  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      // Perform the update
     
      const updatedAttributes: {
        name?: string;
        duration?: string;
        campusId?: string;
      } = {};
      if (formFields.updatedName !== data?.name) {
        updatedAttributes.name = formFields.updatedName;
      }
      if (formFields.updatedDuration !== data?.duration) {
        updatedAttributes.duration = formFields.updatedDuration;
      }
      if (formFields.updatedDescription !== data?.description) {
        updatedAttributes.duration = formFields.updatedDuration;
      }
        
      if (formFields.updatedCampusId !== data?.campusId) {
        updatedAttributes.campusId = formFields.updatedCampusId;
      }

      await updateProgram(id, updatedAttributes);
      //  Reset form fields
      setFormFields({
        updatedName: formFields.updatedName || '',
        updatedDuration: formFields.updatedDuration || '',
        updatedCampusId: formFields.updatedCampusId || '',
        updatedDescription: formFields.updatedDescription || '',
      });
    }
    catch {
      throw new Error
    }
  }

  const handleSelectChange = (selectedValue: string) => {
  
    setFormFields((prevFormFields) => ({
      ...prevFormFields,
      updatedCampusId: selectedValue,
    }));
    
    };
    
    useEffect(() => {
      async function fetchCampuses() {
        try {
          const response = await getCampus();
          setCampuses(response)
          const selectedCampus = response.find((campus) => campus.$id === data?.campusId);
    
          if (selectedCampus) {
            setFormFields((prevFormFields) => ({
              ...prevFormFields,
              updatedCampusId: selectedCampus.name,
            }));
          };
          
        } catch (error) {
  
        }
      }
  
      fetchCampuses();
    }, []);
  return (
    <>
    <div className="grid gap-4 p-4">
            {/* update the file name */}
            <div className="grid items-center grid-cols-4 gap-4">
              <Label htmlFor="name" className="block col-span-4 text-left">
                Name
              </Label>
              <Input
                id="name"
                value={formFields.updatedName}
                onChange={(event) => setFormFields((prevFormFields) => ({
                  ...prevFormFields,
                  updatedName: event.target.value,
                }))}
                className="block col-span-4"
              />
            </div>

            <Separator />
            {/* Update Program Duration */}
            <div className="grid items-center grid-cols-4 gap-4">
              <Label htmlFor="duration" className="col-span-4 text-left">
                Update Duration
              </Label>
              <Input
                id="duration"
                placeholder="4 years"
                value={formFields.updatedDuration}
                onChange={(event) => setFormFields((prevFormFields) => ({
                  ...prevFormFields,
                  updatedDuration: event.target.value,
                }))}
              />
             
            </div>
            
            {/* Update program Description */}
            <div className="grid items-center grid-cols-4 gap-4">
              <Label htmlFor="description" className="col-span-4 text-left">
                Update Description
              </Label>
              <Textarea className="col-span-4"
                value={formFields.updatedDescription}
    onChange={(event) =>
      setFormFields((prevFormFields) => ({
        ...prevFormFields,
        updatedDescription: event.target.value,
      }))
    }
              />
             
            </div>
             {/* Update program Campus */}
             <div className="grid items-center grid-cols-4 gap-4">
              <Label htmlFor="campus" className="col-span-4 text-left">
                Update Campus
              </Label>
                      

              <Select onValueChange={handleSelectChange}>
  <SelectTrigger className="w-full col-span-4">
  <SelectValue placeholder="Select campus" defaultValue={formFields.updatedCampusId} />
  </SelectTrigger>

  <SelectContent position="item-aligned" className="w-full">
    <SelectGroup>
      <SelectLabel>Campus</SelectLabel>
      {campuses.map((campus) => (
        <SelectItem key={campus.$id} value={campus.$id}>
          {campus.name}, {campus.location}
        </SelectItem>
      ))}
    </SelectGroup>
  </SelectContent>
</Select>



            </div>
            <DialogFooter className="flex gap-4">
          <Button variant="secondary" onClick={()=>setShowDialog(false)}>Cancel</Button>
          <Button type="submit" onClick={handleSubmit}>Save changes</Button>
          </DialogFooter>

          </div>

    </>
  )
}
