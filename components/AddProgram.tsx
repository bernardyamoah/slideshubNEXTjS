'use client'
import * as React from "react"
import { useEffect, useState } from "react"
import { storage, ID } from '@/appwrite';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,

} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { createProgram, errorMessage, getCurrentUserAndSetUser } from '@/lib/functions';
import Image from 'next/image';
import { UploadProgress } from 'appwrite';
import toast, { Toaster } from 'react-hot-toast';

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

interface AddProgramProps {
  user: any;
}



export default function AddProgram() {
  const [name, setName] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [duration, setDuration] = useState('');
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [value, setValue] = React.useState("")
  const [user, setUser] = useState<UserWithId | null>(null); // Update the type of user state
  const [campuses, setCampuses] = useState<any[]>([]); // Initialize as an empty array

  useEffect(() => {
    async function fetchCampuses() {
      try {
        const response = await getCampus();
        setCampuses(response);
        const userId = await getCurrentUserAndSetUser(); // Call the getCurrentUser function
        setUser(userId);
      } catch (error) {

      }
    }

    fetchCampuses();
  }, []);

  const handleSelectChange = (selectedValue: string) => {
    setValue(selectedValue);
  };
  // handle upload progress
  const handleImageUpload = async () => {
    if (imageFile) {
      try {
        const file = imageFile;
        const uploader = await toast.promise(storage.createFile(
          process.env.NEXT_PUBLIC_PRORAM_IMAGES_ID!,
          ID.unique(),
          file,
          undefined,
          (progress: UploadProgress) => {
            // Update the progress bar with the progress value (0-100)
            const uploadprogress = Math.round((progress.progress * 100) / progress.chunksTotal);
            console.log('Upload progress:', uploadprogress);
            setUploadProgress(uploadprogress);
            return uploadprogress
          }
        )
          ,
          {
            loading: 'Uploading file',
            success: 'image uploaded! 🎉',
            error: 'Not authorized',
          }
        );

        const fileId = uploader.$id;
        const fileResponse = await storage.getFileView(process.env.NEXT_PUBLIC_PRORAM_IMAGES_ID!, fileId);
        const imageUrl = fileResponse.toString();


        return imageUrl;
      } catch (error) {
        errorMessage('Error uploading image:' + error);
      }
    }

    return '';
  };
  // Handle image change
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImageFile(null);
      setImagePreview(null);
    }
  };

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const imageUrl = await handleImageUpload();


      const programData = {
        name,
        duration,
        image: imageUrl,
        campusId: value,
        user_id: user?.id,

      };

      await createProgram(programData);



      // Reset form fields
      setName('');
      setValue('')
      setDuration('');
      setImageFile(null);
      setImagePreview(null);

    } catch (error) {
      errorMessage('Error creating program:' + error);
      // Handle error
    }
  };

  return (
    <>

      

          <Card className="w-full max-w-3xl mx-auto   ">
            <CardHeader>
              <CardTitle>Add Program</CardTitle>
              <CardDescription>Deploy your new project in one-click.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="grid w-full items-center gap-4">

                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Program Name</Label>
                    <Input
                      id="name"
                      placeholder="BSc Materials Engineering"
                      value={name}
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


                      <SelectContent position="popper" >


                        <SelectGroup>
                          <SelectLabel>Campus</SelectLabel>
                          {campuses.map((campus) => (
                            <SelectItem key={campus.$id} value={campus.$id} >{campus.name}, <span className='text-sm text-right font-medium'>{campus.location}</span>  </SelectItem>
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
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                    />
                  </div>
                  <div className="grid  w-full items-center gap-1.5">
                    <Label htmlFor="picture">Picture</Label>
                    <Input id="picture" type="file" onChange={handleImageChange} />
                  </div>

                  <div className='mt-8 sm:flex sm:justify-end w-full'>  <Button type="submit" className='w-full py-4'>Add</Button></div>
                </div>
              </form>
            </CardContent>
            {uploadProgress > 0 && (
              <CardFooter className="flex justify-between">
                <div className="w-full space-y-2">
                  <div>Upload Progress: {uploadProgress}%</div>
                  <Progress value={uploadProgress} />
                </div>
              </CardFooter>
            )}
          </Card>
      
        <Toaster />
    
    </>
  );
}
