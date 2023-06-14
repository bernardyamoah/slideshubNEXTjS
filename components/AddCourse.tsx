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
import {getPrograms} from '@/lib/getPrograms'
import {createCourse} from '@/lib/functions'
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

export default function AddCourse() {
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
  
      setTimeout(fetchPrograms, 5000);
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
          <p className='text-gray-400 mr-2 text-sm'>{semester}</p>
          <p className='text-gray-400 mr-2 text-sm'>{courseCode}</p>
          {credit&&(
            <p className='text-gray-400 mr-2 text-sm'>{credit} hours</p>
          )}
          <p className='text-gray-400 mr-2 text-sm'>{lecturer}</p>
      </div>
			
			
				
					</div>
				</div>
			  </aside>
            
                )}

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

{/* Image selection */}

            <div className="grid  w-full items-center gap-1.5">
                    <Label htmlFor="picture">Picture</Label>
                    <Input id="picture" type="file" onChange={handleImageChange} />
                  </div>
          {/* Lecturer Name */}
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
<div className="flex flex-col space-y-1.5 w-full ">
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
<div className="flex flex-col space-y-1.5 flex-1 w-full">
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
