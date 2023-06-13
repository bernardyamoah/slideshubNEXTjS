'use client'
import * as React from "react"
import { useEffect, useState } from "react"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Card,
  CardContent,
  CardDescription,

  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,

  SelectItem,

  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import {createBook} from '@/lib/functions'
import { Check, ChevronsUpDown } from "lucide-react"
import { storage, ID } from '@/appwrite';

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import Image from 'next/image';
import { UploadProgress } from 'appwrite';

export default function AddBook() {
  const [open, setOpen] = React.useState(false)
  const [open1, setOpen1] = React.useState(false)

	const [name, setName]=useState('')
  


	const [fileId, setFileId]=useState('')
	
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [uploadProgress, setUploadProgress] = useState<number>(0);






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

	const handleSubmit=async (event:React.FormEvent)=>{
		event.preventDefault()
		try{
      const imageUrl = await handleImageUpload();
    
			const bookData={
				name,

	fileId,
  image:imageUrl,

			}

			createBook(bookData)
				// reset Form field
				setName('')
				setFileId('')
			
			
		}
		catch(error){
			console.log('error creating course ', error)
		}
	}
  

 

	return (
		<>
			
			<div className=' flex items-center mt-10'>

			<div className=' max-w-5xl grid md:grid-cols-2 sm:container w-full grid-cols-1 '>
        {/* Display Program preview */}
        {imagePreview && (
				  <aside
				
				className="place-center mb-10 mx-auto max-w-xs relative block shadow-xl backdrop-blur-md transition-all hover:border-emerald-500 dark:hover:border-emerald-500 hover:shadow-emerald-500/10 overflow-hidden duration-300 ease-in-out  border-4 border-gray-200  hover:shadow-xl cursor-pointer dark:border-gray-600 rounded-3xl w-full bg-white dark:bg-transparent"
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
        
  
    
      </div>
			
			
				
					</div>
				</div>
			  </aside>
            
                )}

			<Card className="lg:container  ">
      <CardHeader>
        <CardTitle>Add Book</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-2 space-y-6">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Book Name</Label>
              <Input
                      id="name"
                      placeholder="Algebra"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
            </div>
        


            <div className="grid  w-full items-center gap-1.5">
                    <Label htmlFor="picture">Picture</Label>
                    <Input id="picture" type="file" onChange={handleImageChange} />
                  </div>
          
            
<div className='gap-4 md:gap-4 flex flex-wrap lg:grid grid-cols-3'>
{/* Course code */}

    


{/* Semester */}

</div>
            
		
            <div className='mt-24 sm:flex sm:justify-end w-full'>  <Button type="submit" className='w-full py-4'>Add</Button></div>
            
          </div>
        </form>
      </CardContent>
    
    </Card>
  
			
			
			</div>

			<ToastContainer />
			</div>
			
		</>
	);
}
