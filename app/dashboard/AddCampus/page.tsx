'use client'
import {useState} from 'react'

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import {createCampus} from '@/lib/createCampus'

export default function AddCampus() {
	const [name, setName] = useState('');
	const [location, setLocation] = useState('');
	const [image, setImage] = useState('');
  
	const handleSubmit = async (event: React.FormEvent) => {
	  event.preventDefault();
	  try {
		const campusData: CampusData = {
		  name,
		  location,
		  image
		};
		const response = await createCampus(campusData);
		console.log('Campus created:', response.$id);
  
		// Reset form fields
		setName('');
		
		setLocation('');
  
		// Handle success or navigate to another page
	  } catch (error) {
		console.error('Error creating program:', error);
		// Handle error
	  }
	};
  

	return (
		<>
			<h1 className='text-5xl my-5 text-center font-bold '>Add a New Campus</h1>
			<div className=' flex items-center mt-10'>

			<div className='max-w-2xl container '>
			<Card className="container md:max-w-2xl  py-6">

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
			<div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Image</Label>
              <Input id="image" placeholder="add image url" value={image} onChange={(e) => setImage(e.target.value)} />
            </div>
        <Button >add</Button>
          </div>
        </form>
      </CardContent>
      
    </Card>
  
			
			
			</div>

			
			</div>
			
		</>
	);
}
