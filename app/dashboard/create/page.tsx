'use client'
import React from 'react'
import { Metadata } from "next"
import { Book, Files, GraduationCap, PiSquare, Plus } from "lucide-react"



import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"

import AddSlides from '@/components/AddSlides'
import AddBook from '@/components/AddBook'
import AddProgram from '@/components/AddProgram'
import AddCourse from '@/components/AddCourse'
import { DialogClose } from '@radix-ui/react-dialog'
const metadata: Metadata = {
  title: "Create",
  description: "Add Slides to database",
}
function page() {
  return (
  <>
  <div className='max-w-2xl mx-auto my-10 sm:h-24 text-center'>
  <h1>Create a slide </h1>
  </div>
  <aside className='  mx-auto  grid  max-w-2xl gap-8 md:grid-cols-2  p-8 '>
  
  <div  className="group relative block h-52  w-full  aspect-square cursor-pointer ">
  <span className="absolute inset-0 border-2 border-dashed border-gray-400 dark:border-gray-800/80"></span>

<Dialog >
      <DialogTrigger asChild>
      <Card className='relative  h-full transform items-end border-2 border-gray-400 dark:border-gray-800/80  bg-white dark:bg-gray-900 transition-transform group-hover:-translate-x-2 group-hover:-translate-y-2'>
      <CardHeader className='space-y-3 flex flex-col justify-center'>
        <Files className='mx-auto w-10 h-10 stroke-blue-gray-300 '/>
        <CardTitle className='text-center'>Add Slides</CardTitle>
      
      </CardHeader>
      <CardContent className="grid place-content-center">
      <Button variant='outline' className='p-2 w-10 rounded-full' >
<Plus className='w-5 h-5 sm:w-8 sm:h-8 stroke-gray-500 '/>
</Button>
      </CardContent>
    </Card>
      </DialogTrigger>
      <DialogContent className="!sm:max-w-3xl    !relative">
        
      <AddSlides/>
      </DialogContent>
    </Dialog>

    
</div>


<div  className="group relative block h-52  w-full aspect-square cursor-pointer ">
  <span className="absolute inset-0 border-2 border-dashed border-gray-400 dark:border-gray-800/80"></span>

<Dialog >
      <DialogTrigger asChild>
      <Card className='relative  h-full transform items-end border-2 border-gray-400 dark:border-gray-800/80  bg-white dark:bg-gray-900 transition-transform group-hover:-translate-x-2 group-hover:-translate-y-2'>
      <CardHeader className='space-y-3 flex flex-col justify-center'>
        <Book className='mx-auto w-10 h-10 stroke-blue-gray-300 '/>
        <CardTitle className='text-center'>Add Book</CardTitle>
      
      </CardHeader>
      <CardContent className="grid place-content-center">
      <Button variant='outline' className='p-2 w-10 rounded-full' >
<Plus className='w-5 h-5 sm:w-8 sm:h-8 stroke-gray-500 '/>
</Button>
      </CardContent>
    </Card>
      </DialogTrigger>
      <DialogContent className="!container !lg:max-w-3xl   md:!h-[100%]  relative">
        
      <AddBook/>
      </DialogContent>
    </Dialog>

    
</div>

<div  className="group relative block h-52 w-full aspect-square cursor-pointer  ">
  <span className="absolute inset-0 border-2 border-dashed border-gray-400 dark:border-gray-800/80"></span>

<Dialog >
      <DialogTrigger asChild>
      <Card className='relative  h-full transform items-end border-2 border-gray-400 dark:border-gray-800/80  bg-white dark:bg-gray-900 transition-transform group-hover:-translate-x-2 group-hover:-translate-y-2'>
      <CardHeader className='space-y-3 flex flex-col justify-center'>
        <PiSquare className='mx-auto w-10 h-10 stroke-blue-gray-300 '/>
        <CardTitle className='text-center'>Add Course</CardTitle>
      
      </CardHeader>
      <CardContent className="grid place-content-center">
      <Button variant='outline' className='p-2 w-10 rounded-full' >
<Plus className='w-5 h-5 sm:w-8 sm:h-8 stroke-gray-500 '/>
</Button>
      </CardContent>
    </Card>
      </DialogTrigger>
      <DialogContent className=" !sm:max-w-3xl    !relative">
        
      <AddCourse/>
      </DialogContent>
    </Dialog>

    
</div>

<div  className="group relative block h-52 w-full aspect-square cursor-pointer ">
  <span className="absolute inset-0 border-2 border-dashed border-gray-400 dark:border-gray-800/80"></span>

<Dialog >
      <DialogTrigger asChild>
      <Card className='relative  h-full transform items-end border-2 border-gray-400 dark:border-gray-800/80  bg-white dark:bg-gray-900 transition-transform group-hover:-translate-x-2 group-hover:-translate-y-2'>
      <CardHeader className='space-y-3 flex flex-col justify-center'>
        <GraduationCap  className='mx-auto w-10 h-10 stroke-blue-gray-300 '/>
        <CardTitle className='text-center'>Add Program</CardTitle>
      
      </CardHeader>
      <CardContent className="grid place-content-center">
      <Button variant='outline' className='p-2 w-10 rounded-full' >
<Plus className='w-5 h-5 sm:w-8 sm:h-8 stroke-gray-500 '/>

</Button>
      </CardContent>
    </Card>
      </DialogTrigger>
      <DialogContent className="!sm:max-w-3xl     !relative">
        
      <AddProgram/>
      <DialogClose>
      <Button variant='outline'>  cancel</Button>
      </DialogClose>
      </DialogContent>

    </Dialog>

    
</div>
  </aside>
  
  
  </>
  )
}


export default page