'use client'
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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
 
import {createCourse} from '@/lib/createCourse'

export default function AddCourse() {
	const [courseName, setcourseName]=useState('')
	const [description, setDescription]=useState('')
	const [semester, setSemester]=useState('')
	const [courseCode, setCourseCode]=useState('')
	const [credit, setCredit]=useState('')
	const [lecturer, setLecturer]=useState('')
	const [fileId, setFileId]=useState('')
	const [programId, setprogramId]=useState('')

	const handleSubmit=async (event:React.FormEvent)=>{
		event.preventDefault()
		try{
			const courseData={
				
					courseName,
					description,
					semester,
					courseCode,
					credit,
					lecturer,
					fileId,
					programId
	
				
			}
			const response=await createCourse(courseData)
				// reset Form field
				setcourseName(''),
				setDescription(''),
				setSemester(''),
				setCourseCode(''),
				setCredit(''),
				setLecturer(''),
				setFileId(''),
				setprogramId('')
				console.log('Course created: ', response.$id)
		}
		catch(error){
			console.log('error creating course', error)
		}
	}


	return (
		<>
			<h1 className='text-5xl my-5 text-center font-bold '>Add course</h1>
			<div className=' flex items-center mt-10'>

			<div className='max-w-2xl container '>
			<Card className="container md:max-w-2xl  ">
      <CardHeader>
        <CardTitle>Create project</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Course Name</Label>
              <Input id="courseName" placeholder="eg: Algebra" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Semester</Label>
              <Select >
                <SelectTrigger>
                  <SelectValue placeholder="Select" />
                  <SelectContent position="popper" >
                    <SelectItem value="first" onClick={() => setSemester("First Semester")}>First Semester</SelectItem>
                    <SelectItem value="second"onClick={() => setSemester("Second Semester")}>Second Semester</SelectItem>
                    
                  </SelectContent>
                </SelectTrigger>
              </Select>
            </div>
			<div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Course Code</Label>
              <Input id="coursecode" placeholder="eg: MSE 255" />
            </div>
			<div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Credit Hours</Label>
              <Input id="credit" placeholder="eg: 3" />
            </div>
			<div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Lecturer Name</Label>
              <Input id="lecturer" placeholder="eg: Dr. Martinson" />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="ghost">Cancel</Button>
        <Button>Deploy</Button>
      </CardFooter>
    </Card>
  
			
			
			</div>

			
			</div>
			
		</>
	);
}
