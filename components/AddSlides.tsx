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
import {Select,SelectContent,SelectItem,SelectTrigger,SelectValue,} from "@/components/ui/select"
import {getPrograms} from '@/lib/getPrograms'
import {createCourse} from '@/lib/functions'
import { Check, ChevronsUpDown } from "lucide-react"
import { storage, ID } from '@/appwrite';
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {Command,CommandEmpty,CommandGroup,CommandInput,CommandItem,
} from "@/components/ui/command"
import {Popover,PopoverContent,PopoverTrigger,} from "@/components/ui/popover"
import Image from 'next/image';
import {
  CardBody,
  CardFooter,
  Typography,
  
} from "@material-tailwind/react";
import { UploadProgress } from 'appwrite';

export default function AddSlides() {
  const [open, setOpen] = React.useState(false)
  const [open1, setOpen1] = React.useState(false)

	const [name, setName]=useState('')
  
	const [semester, setSemester]=useState('')
	const [courseCode, setCourseCode]=useState('')

	const [credit, setCredit]=useState('')

	const [lecturer, setLecturer]=useState('')
  const [year, setYear]=useState('')

	const [fileId, setFileId]=useState('')
	const [programId, setprogramId]=React.useState("")
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [programs, setPrograms] = useState<any[]>([]); // Initialize as an empty array
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  useEffect(() => {
      async function fetchPrograms() {
        try {
          const response = await getPrograms();
          setPrograms(response);
        } catch (error) {
          console.log('Error fetching programs:', error);
        }
      }
  
      setTimeout(fetchPrograms, 10000);
    }, []);




const creditHours=[
  {
    id:'1',
    hour: '1'
  },
  {
    id:'2',
    hour: '2'
  },
  {
    id:'3',
    hour: '3'
  },
  {
    id:'4',
    hour: '4'
  },
]
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
    
			const courseData={
				name,
	semester,
	courseCode,
	credit,
	lecturer,
	fileId,
  image:imageUrl,
  year,
	
	programId:programId
	
				
			}
			const response=await createCourse(courseData)
				// reset Form field
				setName(''),
	
				setSemester(''),
				setYear(''),
				setCourseCode(''),
				setCredit(''),
				setLecturer(''),
				setFileId(''),
				setprogramId('')
			
		}
		catch(error){
			console.log('error creating course', error)
		}
	}
  
  const handleYearChange = (selectedValue: string) => {
    setCourseCode(selectedValue);
  
  };
  const handleCreditHourChange = (selectedValue: string) => {
    setCourseCode(selectedValue);
  
  };
  const handleSelectChange = (selectedValue: string) => {
    setprogramId(selectedValue);
  
  };
  const handleSemesterChange = (selectedValue: string) => {
    setSemester(selectedValue);
  
  };
	return (
		<>
			
			<div className=' flex items-center mt-10'>

			<div className=' max-w-5xl grid md:grid-cols-2 sm:container w-full grid-cols-1 gap-4'>
        {/* Display Program preview */}
      
			
            
<Card className="mt-6 w-96">
      <CardHeader color="blue-gray" className="relative h-56">
        <Image src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80" alt="img-blur-shadow" layout="fill" />
      </CardHeader>
      <CardBody>
        <Typography variant="h5" color="blue-gray" className="mb-2">
          UI/UX Review Check
        </Typography>
        <Typography>
          The place is close to Barceloneta Beach and bus stop just 2 min by walk
          and near to &quot;Naviglio&quot; where you can enjoy the main night life
          in Barcelona.
        </Typography>
      </CardBody>
      <CardFooter className="pt-0">
        <Button>Read More</Button>
      </CardFooter>
    </Card>

              

			<Card className="lg:container  ">
      <CardHeader>
        <CardTitle>Add course</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-2 space-y-6">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Course Name</Label>
              <Input
                      id="name"
                      placeholder="Algebra"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="programme">Programme</Label>
              <Popover open={open1} onOpenChange={setOpen1}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open1}
          className="w-full justify-between"
        >
          {programId
            ? programs.find((program) => program.$id === programId)?.name
            : "Select Programme"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command onValueChange={handleSelectChange}>
          <CommandInput placeholder="Search program..." />
          <CommandEmpty>No program found.</CommandEmpty>
          <CommandGroup>
            {programs.map((program) => (
              <CommandItem
                key={program.$id}
                onSelect={(currentValue) => {
                  setprogramId(currentValue === programId ? "" : program.$id)
                  setOpen1(false)
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    programId === program.$id ? "opacity-100" : "opacity-0"
                  )}
                />
                {program.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  
            </div>



            <div className="grid  w-full items-center gap-1.5">
                    <Label htmlFor="picture">Picture</Label>
                    <Input id="picture" type="file" onChange={handleImageChange} />
                  </div>
          
                  <div className="flex flex-col space-y-1.5">
              <Label htmlFor="lecturer">Lecturer Name</Label>
              <Input
                      id="lecturer"
                      placeholder="Dr. Martinson"
                      value={lecturer}
                      onChange={(e) =>setLecturer(e.target.value)}
                    />
            </div>
<div className='gap-4 md:gap-8 grid grid-cols-2'>
{/* Course code */}
<div className="flex flex-col space-y-1.5  w-full ">
              <Label htmlFor="course_code">Course Code</Label>
              <Input
                      id="course_code"
                      placeholder="MSE 4324"
                      value={courseCode}
                      onChange={(e) => setCourseCode(e.target.value)}
                    />
            </div>
        {/* Year */}
<div className="flex flex-col space-y-1.5 flex-1 w-full">
              <Label htmlFor="name">Year</Label>
              <Select  onValueChange={handleYearChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Semester" className='text-xs' />
                  <SelectContent position="popper" >
                    <SelectItem value="Level 100">Level 100</SelectItem>
                    <SelectItem value="Level 200">Level 200</SelectItem>
                    <SelectItem value="Level 300">Level 300</SelectItem>
                    <SelectItem value="Level 400">Level 400</SelectItem>
                    
                  </SelectContent>
                </SelectTrigger>
              </Select>
            </div>    

            {/* Credit Hours */}

<div className="flex flex-col space-y-1.5 w-full flex-1 ">
              <Label htmlFor="credit">Credit Hours</Label>
              <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between  overflow-hidden no-wrap"
        >
          {credit
            ? creditHours.find((creditHour) => creditHour.id === credit)?.hour
            : "Select credit hour"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command onValueChange={handleCreditHourChange}>
          <CommandInput placeholder="Search ..." />
          <CommandEmpty>No credit hour found.</CommandEmpty>
          <CommandGroup>
            {creditHours.map((creditHour) => (
              <CommandItem
                key={creditHour.id}
                onSelect={(currentValue) => {
                  setCredit(currentValue === credit ? "" : currentValue)
                  setOpen(false)
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    credit === creditHour.id ? "opacity-100" : "opacity-0"
                  )}
                />
                {creditHour.hour}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  
            </div>
{/* Semester */}
<div className="flex flex-col space-y-1.5 flex-1 w-44 sm:w-full">
              <Label htmlFor="name">Semester</Label>
              <Select  onValueChange={handleSemesterChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Semester" className='text-xs' />
                  <SelectContent position="popper" >
                    <SelectItem value="first semester">First Semester</SelectItem>
                    <SelectItem value="second semester">Second Semester</SelectItem>
                    
                  </SelectContent>
                </SelectTrigger>
              </Select>
            </div>

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
