'use client'
import { useState } from 'react';
import { storage, ID } from '@/appwrite';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  
  CardFooter,
 
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { createProgram } from '@/lib/createProgram';
import Image from 'next/image';
import { UploadProgress } from 'appwrite';

export default function AddProgram() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [duration, setDuration] = useState('');
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  const handleImageUpload = async () => {
    if (imageFile) {
      try {
        const file = imageFile;
        const uploader = await storage.createFile(
          '647d48fe0c9790069105',
          ID.unique(),
          file,
          undefined,
		  (progress: UploadProgress)  => {
			// Update the progress bar with the progress value (0-100)
			const uploadprogress = Math.round((progress.progress * 100) / progress.chunksTotal);
			console.log('Upload progress:', uploadprogress);
			return uploadprogress
            setUploadProgress(uploadprogress);
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
      console.log(imageUrl);

      const programData = {
        name,
        description,
        duration,
        image: imageUrl,
      };

      const response = await createProgram(programData);
      console.log('Program created:', response.$id);

      // Reset form fields
      setName('');
      setDescription('');
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
      <h1 className="text-5xl my-5 text-center font-bold">Add Program</h1>
      <div className="flex items-center mt-10">
        <div className="max-w-2xl md:container">

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
					<p className="text-sm font-light text-gray-400">{description}</p>
					<p className="course-code"><span className='text-gray-400 mr-2 sm:hidden'>Duration:</span> {duration}</p>
					</div>
				</div>
			  </aside>
            
                )}

          <Card className="md:container md:max-w-2xl py-4 pt-6">
            
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
                    <Label htmlFor="description">Description</Label>
                    <Input
                      id="description"
                      placeholder="Describe the course"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
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
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="picture">Picture</Label>
                    <Input id="picture" type="file" onChange={handleImageChange} />
                  </div>
                  <Button type="submit">Add</Button>
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
      </div>
    </>
  );
}
