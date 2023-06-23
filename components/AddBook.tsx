import * as React from "react";
import {useState } from "react";
import 'react-toastify/dist/ReactToastify.css';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getCourses,bytesToSize, createBook } from "@/lib/functions";
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



interface AddBookProps {
  user: any;
}


export default function AddBook({ user }: AddBookProps) {

  const [open, setOpen] = React.useState(false)
  const [open1, setOpen1] = React.useState(false)  
  const [currentFile, setCurrentFile] = useState<File | null>(null);

  const [bookcategory, setBookCategory]=useState('')
const [courses, setCourses] = useState<any[]>([]);


  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Check if the file is chosen
    if (!currentFile) {
      toast.error("Please select a file to upload.");
      return;
    }

    try {
      const handleFileUpload = async () => {
        try {
          const file = currentFile;
          const uploader = await toast.promise(storage.createFile(
            process.env.NEXT_PUBLIC_BOOKS_STORAGE_ID!,
            ID.unique(),
            file
          ),
          {
            loading: 'Uploading file...',
            success: 'File uploaded!',
            error: 'Upload failed',
          }
        );
          const fileId = uploader.$id;
  // Fetch file information from Appwrite
  const fileDetails = await toast.promise(
    storage.getFile(
      process.env.NEXT_PUBLIC_BOOKS_STORAGE_ID!,
      fileId
    ),
    {
      loading: 'Fetching file details...',
      success:'File details fetched!',
      error: 'Failed to fetch file details',
    }
  );
          const fileName = fileDetails.name || "";

          const fileUrlResponse = await storage.getFileDownload(
            process.env.NEXT_PUBLIC_BOOKS_STORAGE_ID!,
            fileId
          );
          const uploadedFileUrl = fileUrlResponse.toString();

          return uploadedFileUrl;
        } catch (error) {
          throw new Error("Upload failed");
        }
      };

      const result = await handleFileUpload();

      if (result !== "") {
        const fileUrl = result;
        const fileExtension = currentFile.name.split(".").pop()?.toUpperCase();
        const fileName = currentFile.name;
        const bookData = {
          name: fileName.slice(0, fileName.lastIndexOf(".")),
          size: bytesToSize(currentFile.size),
          fileUrl: fileUrl,
          fileType:fileExtension ? fileExtension.toString() : "",
        bookcategory,
          user_id:user.id
        };

        const response = await toast.promise(createBook(bookData),
        {
          loading: "Creating slide...",
          success: "Slide added successfully!",
          error: "Error occurred during slide creation.",
        }
      );

        // Reset form fields
        setCurrentFile(null);

    
      }
    } catch (error) {
      console.error("Error handling form submission:", error);
      setCurrentFile(null);

  
    }
  };

  const categories=[
    {
      id:'Engineering',
      hour: 'Engineering'
    },
    {
      id:'Health Science',
      hour: 'Health Science'
    },
    {
      id:'Psychology',
      hour: 'Psychology'
    },
    {
      id:'Mathematics',
      hour: 'Mathematics'
    },
  ]
  const handleBookCategoryChange = (selectedValue: string) => {
    setBookCategory(selectedValue);
  
  };
  return (
    <>
      <div className="flex items-center mt-10">
        <div className="max-w-3xl mx-auto w-full">
          <Card className="lg:container">
            <CardHeader>
              <CardTitle>Add Book</CardTitle>
              <CardDescription>Add a Book document in one-click.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="grid w-full items-center gap-2 space-y-6">
                <div className="flex flex-col space-y-1.5">
                <Label htmlFor="credit">Credit Hours</Label>
              <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between  overflow-hidden no-wrap"
        >
          {bookcategory
            ? categories.find((category) => category.id === bookcategory)?.hour
            : "Select Book Category"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command onValueChange={handleBookCategoryChange}>
          <CommandInput placeholder="Search ..." />
          <CommandEmpty>No category found.</CommandEmpty>
          <CommandGroup>
            {categories.map((category) => (
              <CommandItem
                key={category.id}
                onSelect={(currentValue) => {
                  setBookCategory(currentValue === bookcategory ? "" : currentValue)
                  setOpen(false)
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    bookcategory === category.id ? "opacity-100" : "opacity-0"
                  )}
                />
                {category.hour}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
            </div>
                  <div className="grid w-full items-center gap-1.5">
                    <DocumentUpload currentFile={currentFile} setCurrentFile={setCurrentFile} />
                  </div>
                  <div className="mt-24 sm:flex sm:justify-end w-full">
                    <Button type="submit" className="w-full py-4">
                      Add
                    </Button>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
        <Toaster />
      </div>
    </>
  );
}
