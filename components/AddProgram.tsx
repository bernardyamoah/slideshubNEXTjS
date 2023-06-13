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
import { createProgram } from '@/lib/functions';
import Image from 'next/image';
import { UploadProgress } from 'appwrite';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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



export default function AddProgram() {
  const [name, setName] = useState('');

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [duration, setDuration] = useState('');
  const [uploadProgress, setUploadProgress] = useState<number>(0);
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
  // handle upload progress
  const handleImageUpload = async () => {
    if (imageFile) {
      try {
        const file = imageFile;
        const uploader = await storage.createFile(
          '647d48fe0c9790069105',
          ID.unique(),
          file,
          undefined,
		  (progress:UploadProgress)  => {
			// Update the progress bar with the progress value (0-100)
			const uploadprogress = Math.round((progress.progress * 100) / progress.chunksTotal);
			console.log('Upload progress:', uploadprogress);
      setUploadProgress(uploadprogress);
			return uploadprogress
          }
        );

        const fileId = uploader.$id;
        const fileResponse = await storage.getFileView('647d48fe0c9790069105', fileId);
        const imageUrl = fileResponse.toString();
        console.log(imageUrl);

        return imageUrl;
      } catch (error) {
        console.error('Error uploading image:', error);
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
      console.log(imageUrl);

      const programData = {
        name,
        duration,
        image: imageUrl,
        campusId:value
        
      };

   await createProgram(programData);
    

      
      // Reset form fields
      setName('');
  setValue('')
      setDuration('');
      setImageFile(null);
      setImagePreview(null);
	  
    } catch (error) {
      console.error('Error creating program:', error);
      // Handle error
    }
  };

  return (
    <>
      
      <div className="flex items-center mt-10">
      <div className='max-w-5xl grid grid-cols-2 sm:container w-full p-2 '>

				{/* Display Program preview */}
          {imagePreview && (
				  <aside
				
				className=" mb-10 mx-auto max-w-xs relative block shadow-xl backdrop-blur-md transition-all hover:border-emerald-500 dark:hover:border-emerald-500 hover:shadow-emerald-500/10 overflow-hidden duration-300 ease-in-out  border-4 border-gray-200  hover:shadow-xl cursor-pointer dark:border-gray-600 rounded-3xl w-full bg-white dark:bg-transparent"
			  >
				<div className=" group" >
				  <div className="card_image_wrapper">
					<Image
					  className="card_image group-hover:scale-105"
					  fill
					  src={imagePreview}
					  alt="Upload image"
					  
				   
					/> 
				  
				  </div>
				  <div className="text_container">
					<h3 className="card_heading">{name}</h3>
			<div>
          <p className='text-gray-400 mr-2 text-sm'>Duration:</p>
      <p className="course-code">{duration}</p>
      </div>
			
			
					<p className="course-code"><span className='text-gray-400 mr-2 sm:hidden'>Duration:</span> {duration}</p>
					
					<p className="course-code"><span className='text-gray-400 mr-2 sm:hidden'>Duration:</span> {duration}</p>
					</div>
				</div>
			  </aside>
            
                )}

<Card className="lg:container md:max-w-2xl  ">
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
                  <Select   onValueChange={handleSelectChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select campus"/>
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
                
                  <div className='mt-24 sm:flex sm:justify-end w-full'>  <Button type="submit" className='w-full py-4'>Add</Button></div>
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
        </div>
        <ToastContainer />
      </div>
    </>
  );
}
