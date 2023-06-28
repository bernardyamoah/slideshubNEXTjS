'use client'
import React from 'react'
import { Metadata } from "next"
import { Book, ChevronDown, Files, Plus } from "lucide-react"



import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import AddSlides from '@/components/AddSlides'
import AddBook from '@/components/AddBook'
const metadata: Metadata = {
  title: "Create",
  description: "Add Slides to database",
}
function page() {
  return (
  <>
  <div className='max-w-2xl mx-auto my-10 sm:h-44 text-center'>
  <h1>Add text eafeafdsa</h1>
  </div>
  <aside className=' gap-16 mx-auto grid sm:grid-cols-2 max-w-2xl p-4'>
  
  <div  className="group relative block h-64 max-w-sm">
  <span className="absolute inset-0 border-2 border-dashed border-gray-400 dark:border-gray-800/80"></span>

<Dialog >
      <DialogTrigger asChild>
      <Card className='relative  h-full transform items-end border-2 border-gray-400 dark:border-gray-800/80  bg-white dark:bg-gray-900 transition-transform group-hover:-translate-x-2 group-hover:-translate-y-2'>
      <CardHeader className='space-y-3 flex flex-col justify-center'>
        <Files className='mx-auto w-10 h-10 stroke-blue-gray-300 '/>
        <CardTitle className='text-center'>Add Slides</CardTitle>
      
      </CardHeader>
      <CardContent className="grid place-content-center">
      <Button variant='outline' className='p-2' >
<Plus className='w-5 h-5 sm:w-8 sm:h-8 '/>
</Button>
      </CardContent>
    </Card>
      </DialogTrigger>
      <DialogContent className="!container h-full">
        
      <AddSlides/>
      </DialogContent>
    </Dialog>

    
</div>


<div  className="group relative block h-64 max-w-sm">
  <span className="absolute inset-0 border-2 border-dashed border-gray-400 dark:border-gray-800/80"></span>

<Dialog >
      <DialogTrigger asChild>
      <Card className='relative  h-full transform items-end border-2 border-gray-400 dark:border-gray-800/80  bg-white dark:bg-gray-900 transition-transform group-hover:-translate-x-2 group-hover:-translate-y-2'>
      <CardHeader className='space-y-3 flex flex-col justify-center'>
        <Book className='mx-auto w-10 h-10 stroke-blue-gray-300 '/>
        <CardTitle className='text-center'>Add Book</CardTitle>
      
      </CardHeader>
      <CardContent className="grid place-content-center">
      <Button variant='outline' className='p-2' >
<Plus className='w-5 h-5 sm:w-8 sm:h-8 '/>
</Button>
      </CardContent>
    </Card>
      </DialogTrigger>
      <DialogContent className="!container h-full">
        
      <AddBook/>
      </DialogContent>
    </Dialog>

    
</div>
  </aside>
  
  
  </>
  )
}


export default page