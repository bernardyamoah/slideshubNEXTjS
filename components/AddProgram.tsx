'use client'
import * as React from "react"
import { useEffect, useState } from "react"
import { storage, ID } from '@/appwrite';
import { Button } from '@/components/ui/button';

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
import { CardHeader, Step, Stepper } from "@material-tailwind/react";
import { BookOpen, CalendarCheck, CheckCircle, GraduationCap } from "lucide-react";

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
  const [activeStep, setActiveStep] = React.useState(0);
  const [isLastStep, setIsLastStep] = React.useState(false);
  const [isFirstStep, setIsFirstStep] = React.useState(false);

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
  const handleNext = (event: React.FormEvent) => {
    event.preventDefault();
    if (!isLastStep) {
      setActiveStep((currentStep) => currentStep + 1);
      setIsFirstStep(false);
    }
  };

  const handlePrev = (event: React.FormEvent) => {
    event.preventDefault();
    if (!isFirstStep) {
      setActiveStep((currentStep) => currentStep - 1);
      setIsLastStep(false);
    }
  };
  return (
    <>



      <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto p-6 place-content-center">
        <div className="grid w-full gap-4">



          {activeStep === 0 && (

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Program Name</Label>
              <Input
                id="name"
                placeholder="BSc Materials Engineering"
                value={name} required
                onChange={(e) => setName(e.target.value)}
              />
            </div>

          )}

          {activeStep === 1 && (

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="duration">Duration</Label>
              <Input
                id="duration"
                placeholder="4 years"
                value={duration} required
                onChange={(e) => setDuration(e.target.value)}
              />
            </div>

          )}

          {activeStep === 2 && (

            <div className="grid  w-full items-center gap-1.5">
              <Label htmlFor="picture">Picture</Label>
              <Input id="picture" type="file" onChange={handleImageChange} />
            </div>


          )}






          <div className="mt-16 flex justify-between">
            <Button type="button" onClick={handlePrev} disabled={isFirstStep}>
              Prev
            </Button>
            {isLastStep ? (
              <Button type="submit"  >
                Submit
              </Button>
            ) : (
              <Button type="button" onClick={handleNext}>
                Next
              </Button>
            )}
          </div>

        </div>

        <Toaster />
      </form>

      <div className="w-full mx-auto py-4 relative bottom-4 mt-10">
        <Stepper
          activeStep={activeStep}
          isLastStep={(value) => setIsLastStep(value)}
          isFirstStep={(value) => setIsFirstStep(value)}
        >
          <Step onClick={() => setActiveStep(0)}>
            <BookOpen className="h-5 w-5" />
            <div className="absolute -bottom-[2.5rem] w-max text-center text-sm">

              <p className={activeStep === 0 ? "text-blue-500" : "text-gray-500"}>

                Programme
              </p>
            </div>
          </Step>
          <Step onClick={() => setActiveStep(1)}>
            <CalendarCheck className="h-5 w-5" />
            <div className="absolute -bottom-[2.5rem] w-max text-center text-sm">

              <p className={activeStep === 1 ? "text-blue-500" : "text-gray-500"}>

                Duration
              </p>
            </div>
          </Step>
          <Step onClick={() => setActiveStep(2)}>
            <CheckCircle className="h-5 w-5" />
            <div className="absolute -bottom-[2.5rem] w-max text-center text-sm">

              <p className={activeStep === 2 ? "text-blue-500" : "text-gray-500"}>

                Finish
              </p>
            </div>
          </Step>
        </Stepper>

      </div>


    </>
  );
}
// {uploadProgress > 0 && (
//   <CardFooter className="flex justify-between">
//     <div className="w-full space-y-2">
//       <div>Upload Progress: {uploadProgress}%</div>
//       <Progress value={uploadProgress} />
//     </div>
//   </CardFooter>