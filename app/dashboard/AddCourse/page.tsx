'use client'
import * as React from "react"
import { useEffect, useState } from "react"

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
import {getPrograms} from '@/lib/getPrograms'
import {createCourse} from '@/lib/createCourse'
import { Check, ChevronsUpDown } from "lucide-react"


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

export default function AddCourse() {
  const [open, setOpen] = React.useState(false)
  const [open1, setOpen1] = React.useState(false)

	const [name, setName]=useState('')
  
	const [semester, setSemester]=useState('')
	const [courseCode, setCourseCode]=useState('')

	const [credit, setCredit]=useState('')

	const [lecturer, setLecturer]=useState('')

	const [fileId, setFileId]=useState('')
	const [programId, setprogramId]=React.useState("")
  console.log(programId)
  const [programs, setPrograms] = useState<any[]>([]); // Initialize as an empty array
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

	const handleSubmit=async (event:React.FormEvent)=>{
		event.preventDefault()
		try{
			const courseData={
				name,
	semester,
	courseCode,
	credit,
	lecturer,
	fileId,
	
					programId:programId
	
				
			}
			const response=await createCourse(courseData)
				// reset Form field
				setName(''),
	
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
              <Input
                      id="name"
                      placeholder="Algebra"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
            </div>
            <div className="flex flex-col space-y-1.5">
                
                  </div>


            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Semester</Label>
              <Select  onValueChange={handleSemesterChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Semester" />
                  <SelectContent position="popper" >
                    <SelectItem value="first semester">First Semester</SelectItem>
                    <SelectItem value="second semester">Second Semester</SelectItem>
                    
                  </SelectContent>
                </SelectTrigger>
              </Select>
            </div>
			<div className="flex flex-col space-y-1.5">
              <Label htmlFor="course_code">Course Code</Label>
              <Input
                      id="course_code"
                      placeholder="MSE 4324"
                      value={courseCode}
                      onChange={(e) => setCourseCode(e.target.value)}
                    />
            </div>









            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="credit">Programmes</Label>
              <Popover open={open1} onOpenChange={setOpen1}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open1}
          className="w-[200px] justify-between"
        >
          {programId
            ? programs.find((program) => program.$id === programId)?.name
            : "Select Programme"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
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















			<div className="flex flex-col space-y-1.5">
              <Label htmlFor="credit">Credit Hours</Label>
              <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {credit
            ? creditHours.find((creditHour) => creditHour.id === credit)?.hour
            : "Select credit hour"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
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
			<div className="flex flex-col space-y-1.5">
              <Label htmlFor="lecturer">Lecturer Name</Label>
              <Input
                      id="lecturer"
                      placeholder="Dr. Martinson"
                      value={lecturer}
                      onChange={(e) =>setLecturer(e.target.value)}
                    />
            </div>
            <Button>Deploy</Button>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="ghost">Cancel</Button>
        
      </CardFooter>
    </Card>
  
			
			
			</div>

			
			</div>
			
		</>
	);
}
