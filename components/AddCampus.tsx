'use client'
import React from 'react'
import { storage, ID } from '@/appwrite';
import {useState} from 'react'

import { Button } from "@/components/ui/button"
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
  
} from "@/components/ui/card"
import { UploadProgress } from 'appwrite';
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from 'next/image';
import {createCampus, successMessage} from '@/lib/functions'
import { Progress } from '@/components/ui/progress';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function AddCampus() {
	const [name, setName] = useState('');
	const [location, setLocation] = useState('');
	const [imageFile, setImageFile] = useState<File | null>(null);
	const [imagePreview, setImagePreview] = useState<string | null>(null);
	const [uploadProgress, setUploadProgress] = useState<number>(0);

	const handleProgress=(progressEvent:UploadProgress)=>{

		const uploadprogress = Math.round((progressEvent.chunksUploaded * 100) / progressEvent.chunksTotal)
		setUploadProgress(uploadprogress)
		console.log(uploadProgress)
		}
		

	  // handle upload progress
	  const handleImageUpload = async () => {
		if (imageFile) {
		  try {
			const file = imageFile;
			const uploader = await storage.createFile(
			  '647d48fe0c9790069105',
			  ID.unique(),
			  file,
			  undefined, handleProgress
			//   (progress:UploadProgress)  => {
			// 	// Update the progress bar with the progress value (0-100)
			// 	const uploadprogress = Math.round((progress.chunksUploaded * 100) / progress.chunksTotal);
			// 	console.log('Upload progress:', uploadprogress);
			// 	return uploadprogress
			// 	setUploadProgress(uploadprogress);
			//   }
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

	const handleSubmit = async (event: React.FormEvent) => {
	  event.preventDefault();
	  
	  try {
		const imageUrl = await handleImageUpload();
		const campusData: CampusData = {
		  name,
		  location,
		  image: imageUrl,
		};
		 createCampus(campusData);
	
  
		// Reset form fields
		setName('');
		setImageFile(null);
		setImagePreview(null);
		setLocation('');
  
		// Handle success or navigate to another page
	  } catch (error) {
		console.error('Error creating program:', error);
		// Handle error
	  }
	};
  

	return (
		<>
			
			<div className=' flex items-center mt-10'>

			<div className='max-w-2xl sm:container w-full p-2'>
			{imagePreview && (
				<section className='space-y-6'>

<p className="text-center text-lg font-light text-slate-600 uppercase">Preview</p>
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
					<span className='course-code'>{location}</span>
				</div>
				</div>
			  </aside>
				</section>            
                )}
			<Card className="lg:container md:max-w-2xl  ">
			<CardHeader>
        <CardTitle>Add Campus</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Campus Name</Label>
              <Input id="name" placeholder="University of Ghana" value={name} onChange={(e) => setName(e.target.value)}/>
            </div>
          
		
			
			
			<div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Location</Label>
              <Input id="location" placeholder="Legon" value={location} onChange={(e) => setLocation(e.target.value)} />
            </div>
			<div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="picture">Picture</Label>
                    <Input id="picture" type="file" onChange={handleImageChange} />
                  </div>
        <Button >add</Button>
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
