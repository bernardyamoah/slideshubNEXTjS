"use client";
import * as React from "react";
import { useEffect, useState } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  createCourse,
  getCurrentUserAndSetUser,
  getPrograms,
} from "@/lib/functions";
import {  Check,  ChevronsUpDown, } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";


import { toast } from "react-hot-toast";
import { Badge } from "./ui/badge";
import { useMyContext } from "./MyContext";

function isStepValid(
  activeStep: number,
  name: string,
  programId: string,
  
  year: string,
  credit: string,
  courseCode: string,
  semester: string
) {
  if (activeStep === 0 && !name) {
    return "Course name is required.";
  } else if (activeStep === 1 && !programId) {
    return "Programme is required."
  } else if (activeStep === 3 && (!year||!credit||!courseCode||!semester)) {
    return "All fields are required."
  }}
export default function AddCourse() {
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const [name, setName] = useState("");
  const [semester, setSemester] = useState("");

  const [courseCode, setCourseCode] = useState("");
  const [credit, setCredit] = useState("");
  const [lecturer, setLecturer] = useState("");
  let [year, setYear] = useState("");

  const [fileId, setFileId] = useState("");
  const [programId, setprogramId] = React.useState("");
  const [activeStep, setActiveStep] = useState(0);
  const [programs, setPrograms] = useState<any[]>([]); // Initialize as an empty array
  const {user}=useMyContext()

  const [isLastStep, setIsLastStep] = React.useState(false);
  const [isFirstStep, setIsFirstStep] = React.useState(false);
  const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({});
  const totalSteps = 3; // Define the total number of steps

  useEffect(() => {
    async function fetchPrograms() {
      try {
        const response = await getPrograms();
        setPrograms(response);
      } catch (error) {
        console.log("Error fetching programs:", error);
      }
    }

    fetchPrograms();
  }, []);

  const creditHours = [
    {
      id: "1",
      hour: "1",
    },
    {
      id: "2",
      hour: "2",
    },
    {
      id: "3",
      hour: "3",
    },
    {
      id: "4",
      hour: "4",
    },
  ];
  const Years = [
    {
      id: "level 100",
      level: "Level 100",
    },
    {
      id: "level 200",
      level: "Level 200",
    },
    {
      id: "level 300",
      level: "Level 300",
    },
    {
      id: "level 400",
      level: "Level 400",
    },
  ];

  const Semesters = [
    {
      id: "first semester",
      semester: "First Semester",
    },
    {
      id: "second semester",
      semester: "Second Semester",
    }
  ];
  // handle upload progress

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    // Check if any required fields are empty
    const errors: { [key: string]: string } = {};
    if (!name) {
      errors.name = "Course name is required.";
    }
    if (!semester) {
      errors.semester = "Semester is required.";
    }
    if (!courseCode) {
      errors.courseCode = "Course code is required.";
    }
    if (!credit) {
      errors.credit = "Credit hours are required.";
    }
    // if (!lecturer) {
    //   errors.lecturer = "Lecturer name is required.";
    // }
    if (!year) {
      errors.year = "Year is required.";
    }
    if (!programId) {
      errors.programId = "Programme is required.";
    }


    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);

      // Show error toast notification for validation errors
      Object.values(errors).forEach((errorMsg) => {
        toast.error(errorMsg);
      });
      // toast({
      //   variant: "destructive",
      //   title: "Please fill in all required fields.",
      //   description: "The following fields are required: " + Object.keys(errors).join(", "),
      //   action: <ToastAction altText="Got it">Got it</ToastAction>,
      // });

      return;
    }
    try {

      // const imageUrl = await handleImageUpload();
      year = year.charAt(0).toUpperCase() + year.slice(1); // Convert first letter to uppercase


      const courseData = {
        name,
        semester,
        courseCode,
        credit,
        lecturer,
        fileId,
        image: '',
        year,
        user_id: user?.name ?? "",
        programId: programId,
      };
      await createCourse(courseData);

      // Reset form fields
      setName("");
      setSemester("");
      setYear("");
      setCourseCode("");
      setCredit("");

      setLecturer("");
      setFileId("");
      setprogramId("");
      setActiveStep(0);
      setIsLastStep(false);
      setIsFirstStep(false);


    } catch (error) {
      throw error;
    }
  };

  const handleYearChange = (selectedValue: string) => {
    setYear(selectedValue);
  };
  const handleCreditHourChange = (selectedValue: string) => {
    setCredit(selectedValue);
  };
  const handleSelectChange = (selectedValue: string) => {
    setprogramId(selectedValue);
  };
  const handleSemesterChange = (selectedValue: string) => {
    setSemester(selectedValue);
  };

  const handleNextStep = (event: React.FormEvent) => {
    event.preventDefault();
    const errorMessage = isStepValid(
      activeStep,
      name,
      programId,
      year,
      credit,
      courseCode,
      semester
    );
    if (errorMessage) {
      toast.error(errorMessage);
    } else {
      if (activeStep === totalSteps - 1) {
        setIsLastStep(true);
      }
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const handlePreviousStep = (event: React.FormEvent) => {
    event.preventDefault();
    if (activeStep > 0) {
      setActiveStep((prevStep) => prevStep - 1);
    }
  };
  

  return (
    <>

<div>
<Badge
          className="flex items-center justify-center  w-fit   mx-auto"
          variant="secondary"
        >
          {activeStep} / out of {totalSteps}
        </Badge>
        <form onSubmit={handleSubmit} className="w-full mx-auto  flex">
     
     <div className="grid w-full items-center gap-2 space-y-6">
       {activeStep === 0 && (
         <div className="flex flex-col space-y-1.5">
           <Label htmlFor="name">Course Name</Label>
           <Input
             id="name"
             placeholder="Algebra"
             value={name}
             onChange={(e) => setName(e.target.value)}
           />
         </div>

       )}

       {/* Select Programme */}
       {activeStep === 1 && (

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
                   ? programs.find(
                     (program) => program.$id === programId
                   )?.name
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
                         setprogramId(
                           currentValue === programId
                             ? ""
                             : program.$id
                         );
                         setOpen1(false);
                       }}
                     >
                       <Check
                         className={cn(
                           "mr-2 h-4 w-4",
                           programId === program.$id
                             ? "opacity-100"
                             : "opacity-0"
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
       )}




       {/* Lecturer Name */}
       {activeStep === 2 && (
         <div className="flex flex-col space-y-1.5">
           <Label htmlFor="lecturer">Lecturer Name</Label>
           <Input
             id="lecturer"
             placeholder="Dr. Martinson"
             value={lecturer}
             onChange={(e) => setLecturer(e.target.value)}
           />
         </div>
       )}


       {activeStep === 3 && (
         <div className="gap-4 md:gap-8 grid grid-cols-2">
           {/* Course code */}
           <div className="flex flex-col space-y-1.5 w-full ">
             <Label htmlFor="coursecode">Course Code</Label>
             <Input
               id="coursecode"
               placeholder="MSE 4324"
               value={courseCode}
               onChange={(e) => setCourseCode(e.target.value)}
             />
           </div>



           {/* Year */}

           <div className="flex flex-col space-y-1.5 flex-1 w-full">
             <Label htmlFor="year">Year</Label>
             <Popover open={open2} onOpenChange={setOpen2}>
               <PopoverTrigger asChild>
                 <Button
                   variant="outline"
                   role="combobox"
                   aria-expanded={open2}
                   className="w-full justify-between  overflow-hidden no-wrap"
                 >
                   {year
                     ? Years.find((level) => level.id === year)?.level
                     : "Select Level"}
                   <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                 </Button>
               </PopoverTrigger>
               <PopoverContent className="w-[200px] p-0">
                 <Command onValueChange={handleYearChange}>
                   <CommandInput placeholder="Search ..." />
                   <CommandEmpty>No year found</CommandEmpty>
                   <CommandGroup>
                     {Years.map((level) => (
                       <CommandItem
                         key={level.id}
                         onSelect={(currentValue) => {
                           setYear(currentValue.toUpperCase() === year ? "" : currentValue);
                           setOpen2(false); // Updated from setOpen2(false)
                         }}
                       >
                         <Check
                           className={cn(
                             "mr-2 h-4 w-4",
                             year === level.id ? "opacity-100" : "opacity-0"
                           )}
                         />
                         {level.level}
                       </CommandItem>
                     ))}
                   </CommandGroup>
                 </Command>
               </PopoverContent>
             </Popover>
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
                     ? creditHours.find(
                       (creditHour) => creditHour.id === credit
                     )?.hour
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
                           setCredit(
                             currentValue === credit
                               ? ""
                               : currentValue
                           );
                           setOpen(false);
                         }}
                       >
                         <Check
                           className={cn(
                             "mr-2 h-4 w-4",
                             credit === creditHour.id
                               ? "opacity-100"
                               : "opacity-0"
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
             <Label htmlFor="semester">Semester</Label>
             <Popover open={open3} onOpenChange={setOpen3}>
               <PopoverTrigger asChild>
                 <Button
                   variant="outline"
                   role="combobox"
                   aria-expanded={open2}
                   className="w-full justify-between  overflow-hidden no-wrap"
                 >
                   {semester
                     ? Semesters.find((sem) => sem.id === semester)?.semester
                     : "Select Semester"}
                   <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                 </Button>
               </PopoverTrigger>
               <PopoverContent className="w-[200px] p-0">
                 <Command onValueChange={handleSemesterChange}>
                   <CommandInput placeholder="Search ..." />
                   <CommandEmpty>No semester found</CommandEmpty>
                   <CommandGroup>
                     {Semesters.map((sem) => (
                       <CommandItem
                         key={sem.id}
                         onSelect={(currentValue) => {
                           setSemester(currentValue.toUpperCase() === semester ? "" : currentValue);
                           setOpen2(false); // Updated from setOpen2(false)
                         }}
                       >
                         <Check
                           className={cn(
                             "mr-2 h-4 w-4",
                             semester === sem.id ? "opacity-100" : "opacity-0"
                           )}
                         />
                         {sem.semester}
                       </CommandItem>
                     ))}
                   </CommandGroup>
                 </Command>
               </PopoverContent>
             </Popover>
           </div>
         </div>


       )}


       {/* Show validation errors */}
       {Object.keys(validationErrors).length > 0 && (
         <div className="text-red-500">
           {Object.values(validationErrors).map((error, index) => (
             <p key={index}>{error}</p>
           ))}
         </div>
       )}
       <div className="mt-10 flex justify-between">
       {/* {activeStep > 0 && (
              <Button onClick={handlePreviousStep}>Previous</Button>
            )}
            <Button type={isLastStep ? "submit" : "button"} onClick={isLastStep ? handleSubmit : handleNextStep} >  {activeStep === totalSteps - 1 ? "Submit" : "Next"}</Button> */}
{activeStep === 0 ? (
  <Button onClick={handlePreviousStep} disabled>
    Previous
  </Button>
) : (
  <Button onClick={handlePreviousStep}>Previous</Button>
)}
{!isLastStep ? (
  <Button onClick={handleNextStep}>Next</Button>
) : (
  <Button type="submit">Submit</Button>
)}
           </div>
     </div>
   </form>

</div>
     
      

    </>
  );
}
