'use client'
import React from 'react'
import { Metadata } from "next"
import { Book, Files, GraduationCap, PiSquare, Plus } from "lucide-react"


import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Card,
  CardContent,

  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {


  CardHeader,
  Typography,
  

} from '@material-tailwind/react'

import AddSlides from '@/components/AddSlides'
import AddBook from '@/components/AddBook'
import AddProgram from '@/components/AddProgram'
import AddCourse from '@/components/AddCourse'


const metadata: Metadata = {
  title: "Create",
  description: "Add Slides to database",
}
const isAdmin = true;

const componentData = [
  {
    key: "slides",
    icon: <Files className="mx-auto w-10 h-10 stroke-blue-gray-300" />,
    component: <AddSlides />,
  },
  {
    key: "book",
    icon: <Book className="mx-auto w-10 h-10 stroke-blue-gray-300" />,
    component: <AddBook />,
  },
  {
    key: "course",
    icon: <PiSquare className="mx-auto w-10 h-10 stroke-blue-gray-300" />,
    component: <AddCourse />,
  },
  {
    key: "program",
    icon: <GraduationCap className="mx-auto w-10 h-10 stroke-blue-gray-300" />,
    component: <AddProgram />,
  },
];
function page() {
  // const [openDialog, setOpenDialog] = React.useState<string | null>(null);

  // const handleOpenDialog = (key:string) => () => setOpenDialog(key);
  // const handleCloseDialog = () => setOpenDialog(null);
  return (
  <>
  <div className='max-w-2xl mx-auto my-10 sm:h-24 text-center'>
  <h1>Create a slide </h1>
  </div>
  <aside className="mx-auto grid max-w-2xl gap-8 md:grid-cols-2 p-8">
        {componentData.map((data) => {
          const { key, icon, component } = data;
          return (
          
              <div
              key={key}
              className="group relative block h-52 w-full aspect-square cursor-pointer"
            >
              <Dialog  >
              {/* <Dialog size="xs" open={openDialog === key} handler={handleCloseDialog}> */}
              <DialogTrigger asChild>
              {/* <div
                className="relative h-full transform items-end border-2 border-gray-300 dark:border-gray-800/80 bg-white dark:bg-gray-900 transition-transform group-hover:-translate-x-2 group-hover:-translate-y-2"
                onClick={handleOpenDialog(key)}
              > */}
              <div
                className="relative h-full transform items-end border-2 border-gray-300 dark:border-gray-800/80 bg-white dark:bg-gray-900 transition-transform group-hover:-translate-x-2 group-hover:-translate-y-2"
               
              >
                <div className="space-y-3 flex flex-col justify-center">
                  {icon}
                  <CardTitle className="text-center">{`Add ${key.charAt(
                    0
                  ).toUpperCase()}${key.slice(1)}`}</CardTitle>
                </div>
                <CardContent className="grid place-content-center">
                  <Button variant="outline" className="p-2 w-10 rounded-full">
                    <Plus className="w-5 h-5 sm:w-8 sm:h-8 stroke-gray-500" />
                  </Button>
                </CardContent>
              </div>
      </DialogTrigger>
                
            <DialogContent >

            <Card className="mx-auto w-full border-none">
                <CardHeader
            variant="gradient"
            color="blue"
            className="mb-4 grid h-28 place-items-center"
          >
            <Typography variant="h3" color="white">
            {`Add ${key.charAt(
                    0
                  ).toUpperCase()}${key.slice(1)}`}
            </Typography>
          </CardHeader>
                  <CardContent className="flex flex-col gap-4">
                    {component}
                  </CardContent>
                </Card>
            </DialogContent>

              </Dialog>

{/* Dialog toggle */}
              {/* <div
                className="relative h-full transform items-end border-2 border-gray-300 dark:border-gray-800/80 bg-white dark:bg-gray-900 transition-transform group-hover:-translate-x-2 group-hover:-translate-y-2"
                onClick={handleOpenDialog(key)}
              >
                <CardHeader className="space-y-3 flex flex-col justify-center">
                  {icon}
                  <CardTitle className="text-center">{`Add ${key.charAt(
                    0
                  ).toUpperCase()}${key.slice(1)}`}</CardTitle>
                </CardHeader>
                <CardContent className="grid place-content-center">
                  <Button variant="outline" className="p-2 w-10 rounded-full">
                    <Plus className="w-5 h-5 sm:w-8 sm:h-8 stroke-gray-500" />
                  </Button>
                </CardContent>
              </div> */}
            </div>
      
            )
        
        })}
      </aside>
  
  
  </>
  )
}


export default page






