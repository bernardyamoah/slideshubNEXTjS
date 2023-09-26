'use client'
import * as React from "react";
import { useState, useEffect } from "react";


import { getCourses, bytesToSize, createBook, getCurrentUserAndSetUser } from "@/lib/functions";
import { storage, ID } from "@/appwrite";
import { Button } from "@/components/ui/button";
import DocumentUpload from "./document-upload";
import { Check, ChevronsUpDown } from "lucide-react"
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
import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"
import toast, { Toaster } from 'react-hot-toast';





export default function AddBook() {
; 

  const [currentFiles, setCurrentFiles] =useState<File[]>([])

  const [bookcategory, setBookCategory] = useState('')
  const categories = [
    {
      id: 'Engineering',
      hour: 'Engineering'
    },
    {
      id: 'Health Science',
      hour: 'Health Science'
    },
    {
      id: 'Psychology',
      hour: 'Psychology'
    },
    {
      id: 'Mathematics',
      hour: 'Mathematics'
    },
  ]
  const handleBookCategoryChange = (selectedValue: string) => {
    setBookCategory(selectedValue);

  };
  return (
    <>


      

      <Toaster />

    </>
  );
}
