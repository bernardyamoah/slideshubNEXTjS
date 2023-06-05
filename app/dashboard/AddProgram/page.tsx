'use client'
import {useState} from 'react'
import { storage,ID } from '@/appwrite';
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import {createProgram} from '@/lib/createProgram'

export default function AddProgram() {
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [imageFile, setImageFile] = useState<File | null>(null);
	const [duration, setDuration] = useState('');
  
	const handleImageUpload = async () => {
	  if (imageFile) {
		const response = await storage.createFile('647d48fe0c9790069105',ID.unique(),
			imageFile);
		return response.$id;
		console.log(response.$id)
		
	  }
	  return '';
	};
  
	const handleSubmit = async (event: React.FormEvent) => {
	  event.preventDefault();
	  try {
		const imageUrl = await handleImageUpload();
  imageUrl
		const programData: ProgramData = {
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
  
		// Handle success or navigate to another page
	  } catch (error) {
		console.error('Error creating program:', error);
		// Handle error
	  }
	};
  return(
	<>
	<h1 className="text-5xl my-5 text-center font-bold">Add Program</h1>
	<div className="flex items-center mt-10">
	  <div className="max-w-2xl container">
		<Card className="container md:max-w-2xl">
		  <CardHeader>
			<CardTitle>Create project</CardTitle>
			<CardDescription>Deploy your new project in one-click.</CardDescription>
		  </CardHeader>
		  <CardContent>
			<form onSubmit={handleSubmit}>
			  <div className="grid w-full items-center gap-4">
				<div className="flex flex-col space-y-1.5">
				  <Label htmlFor="name">Program Name</Label>
				  <Input id="name" placeholder="BSc Materials Engineering" value={name} onChange={(e) => setName(e.target.value)} />
				</div>

				<div className="flex flex-col space-y-1.5">
				  <Label htmlFor="description">Description</Label>
				  <Input id="description" placeholder="Describe the course" value={description} onChange={(e) => setDescription(e.target.value)} />
				</div>
				<div className="flex flex-col space-y-1.5">
				  <Label htmlFor="duration">Duration</Label>
				  <Input id="duration" placeholder="4 years" value={duration} onChange={(e) => setDuration(e.target.value)} />
				</div>
				<div className="grid w-full max-w-sm items-center gap-1.5">
				  <Label htmlFor="picture">Picture</Label>
				  <Input id="picture" type="file" onChange={(e) => setImageFile(e.target.files?.[0] || null)} />
				</div>
				<Button type="submit">Add</Button>
			  </div>
			</form>
		  </CardContent>
		  <CardFooter className="flex justify-between">
			
		  </CardFooter>
		</Card>
	  </div>
	</div>
  </>
);
}