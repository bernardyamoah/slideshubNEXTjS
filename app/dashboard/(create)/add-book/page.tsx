'use client'

// Library Imports
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";


// Custom Hooks
import { bytesToSize, createBook } from "@/lib/functions";
import { useUserContext } from "@/components/UserContext";




import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

import BookItem from './BookItem';
import { Loader } from './loader';
import coverImg from "@/public/cover_not_found.jpg";
import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { fetchBookDetails } from '@/lib/functions';
import { Button } from '@/components/ui/button';
import { SearchIcon } from 'lucide-react';
import { ID, UploadProgress } from "appwrite";
import { storage } from "@/appwrite";
import { Dialog, DialogClose, DialogContent } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";

// Form Schema
const BookFormSchema = z.object({
  userId: z.string().optional(),
  uploadedBy: z.string().optional(),
  title: z.string().min(1).max(255),
  description: z.string().min(1).max(4500).optional(),
  authors: z.array(z.string()).default([]),
  publisher: z.string().min(1).max(255).optional(),
  thumbnail: z.string().url().optional(),
  categories: z.array(z.string()).default([]).optional(),
  previewLink: z.string().url().optional(),
  pageCount: z.number().int().optional(),
  publishedDate: z.string().min(1).max(20).optional(),

});


async function uploadFile(file: File, storage: any, bookData: any, setUploadProgress: (value: number) => void, setOpen: (boolean) => void, router: any) {
  try {
    // Create a new Appwrite file
    setOpen(true)
    const toastId = toast.loading("Uploading files..."); 
    const response = await storage.createFile(
      process.env.NEXT_PUBLIC_BOOKS_STORAGE_ID!,
      ID.unique(),
      file,
      undefined,
      (progress: UploadProgress) => {
        const uploadProgress = Math.round(
          (progress.chunksUploaded * 100) / progress.chunksTotal
        );

        setUploadProgress(uploadProgress);
      }
    )
  

    const fileId = response.$id;

    const fileUrlResponse = storage.getFileDownload(
      process.env.NEXT_PUBLIC_BOOKS_STORAGE_ID!,
      fileId
    );



    const uploadedFileUrl = fileUrlResponse.toString();
    const fileExtension = file.name.split(".").pop()?.toUpperCase();

    bookData = {
      ...bookData,
      name:bookData.title,
      size: bytesToSize(file.size),
      downloadLink: uploadedFileUrl,
      fileType: fileExtension ? fileExtension.toString() : ""
 
    };
    bookData
    await createBook(bookData, toastId);
    // Clear the fields after successful upload
    setUploadProgress(0);
    
    setOpen(false);
  
    router.push('/dashboard')
    return true;
  } catch (error) {
    console.log(error);
    toast.error("File upload failed");
    setOpen(false);
  }
    console.log("🚀 ~ file: page.tsx:116 ~ uploadFile ~   bookData:",   bookData)
}


export default function Page() {

  // Variables
  const router = useRouter()
  const { user } = useUserContext();
  const [open, setOpen] = useState(false)
  const [bookData, setBookData] = useState({
    title: '',
    size: '',
    authors: [],
    description: '',
    categories: [],
    publishedDate: '',
    thumbnail: '',
    pageCount: 0,
    publisher: '',
    previewLink: '',
    fileType: '',
    uploadedBy: user?.name,
    userId: user?.$id,
    name: '',


  })
  const [loading, setLoading] = useState(false)
  const [book, setBook] = useState<Book | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [file, setFile] = useState<File | null>(null)
  // ================================================================

  // React hook Form Initialization
  const form = useForm<z.infer<typeof BookFormSchema>>({
    resolver: zodResolver(BookFormSchema),
    defaultValues: {


    },
  });
  const { register } = form


  // Function  to handle form input
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Special handling for the title field
    if (name === 'title') {
      setBookData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
      // Clear book if the title becomes empty
      if (value.trim() === '') {
        setBook(null);

      }
    } else {
      // For other fields, update normally
      setBookData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  // Function  to handle file change

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const fileName = selectedFile.name.replace(/_/g, " ");
      const fileExtension = selectedFile.name.split(".").pop()?.toUpperCase();
      setLoading(true)
      setBookData((prevState) => ({ ...prevState, title: fileName }));
      const book = await fetchBookDetails(fileName);
      if (book) {


        setBook(book);

        setBookData((prevState) => ({
          ...prevState,
          title: book.title,
          authors: book.authors,
          size: bytesToSize(selectedFile.size),
          fileType: fileExtension ? fileExtension.toString() : "",
          description: book.description,
          categories: book.categories,
          publishedDate: book.publishedDate,
          thumbnail: book?.thumbnail || coverImg,
          pageCount: book.pageCount,
          publisher: book.publisher,
          previewLink: book.previewLink,

        }));

        // Update the input field with the fetched book title
        Object.keys(book).forEach((field) => {
          const fieldName = field as keyof typeof book;

          form.setValue(fieldName, book[fieldName]);
        });
        setLoading(false)
      }
    }


  };


  const handleSearchClick = async () => {
    // Trigger search when the button is clicked
    setLoading(true);

    try {
      const fetchedBook = await fetchBookDetails(bookData.title);

      if (fetchedBook) {

        setBook(fetchedBook);
        setBookData((prevState) => ({
          ...prevState,
          title: fetchedBook.title,
          authors: fetchedBook.authors || [],
          description: fetchedBook.description,
          categories: fetchedBook.categories || [],
          publishedDate: fetchedBook.publishedDate,
          thumbnail: fetchedBook.thumbnail || coverImg,
          pageCount: fetchedBook.pageCount,
          publisher: fetchedBook.publisher,
          previewLink: fetchedBook.previewLink,
        }));
        // Update the input field with the fetched book title
        // form.setValue('title', fetchedBook.title);

        Object.keys(fetchedBook).forEach((field) => {
          const fieldName = field as keyof typeof fetchedBook;

          form.setValue(fieldName, fetchedBook[fieldName]);
        });
      }
    } catch (error) {
      console.error('Error fetching book details:', error);
      // Handle the error as needed (e.g., display an error message)
    } finally {
      setLoading(false);
    }
  };


  async function onSubmit(data: z.infer<typeof BookFormSchema>) {
  
    uploadFile(file ?? new File([], 'default'), storage, bookData, setUploadProgress, setOpen, router);
    form.reset();

    // go back to the dashboard after complete submission

  }

  return (



    <div className='gap-10 flex items-center justify-center flex-col md:flex-row  '>
      {loading ? (
        <Loader />
      ) : (
        book && <BookItem book={bookData} />
      )}
      <Form {...form} >
        <Card className=' max-w-2xl w-full'>
          <CardHeader className="mb-6">
            <CardTitle>
              Add Book
            </CardTitle>
          </CardHeader>
          <form className=' p-4' onSubmit={form.handleSubmit(onSubmit)}>
            <Label>File:</Label>
            <Input type="file" onChange={handleFileChange} />


            <FormField
              control={form.control}
              {...register}

              name="title"

              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl onChange={handleChange}>

                    <div className="flex gap-2">
                      <Input placeholder="Material Science"  {...field} />
                      <Button
                        type="button"
                        className=' gap-1 flex items-center'
                        onClick={handleSearchClick}
                      >
                        <SearchIcon className='w-4 h-4' /> Search
                      </Button>

                    </div>
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Auhtors */}

            <FormField
              control={form.control}
              {...register}

              name="authors"

              render={({ field }) => (
                <FormItem>
                  <FormLabel>Author</FormLabel>
                  <FormControl onChange={handleChange}>
                    <Input   {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your authors names.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Publisher */}

            <FormField
              control={form.control}
              {...register}

              name="publisher"

              render={({ field }) => (
                <FormItem>
                  <FormLabel>Publisher</FormLabel>
                  <FormControl onChange={handleChange}>
                    <Input   {...field} />
                  </FormControl>
                  <FormDescription>
                    Publisher names.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Description */}
            <FormField
              control={form.control}
              {...register}

              name="description"

              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl onChange={handleChange}>
                    <Textarea className='h-44' {...field} />
                  </FormControl>
                  <FormDescription>
                    Book Description.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <CardFooter className='mt-6 '>
              <Button disabled={form.formState.isSubmitting}>
                Submit
              </Button>
            </CardFooter>
          </form>

        </Card>
      </Form>

      <Dialog open={open} onOpenChange={setOpen} >
        <DialogClose hidden={true}></DialogClose>
        <DialogContent className="sm:max-w-[425px]">

          <div>
            <Loader />

            {uploadProgress > 0 &&
              <div className="w-full mt-6 space-y-3 text-center">
                <Badge variant='outline' className="rounded-3xl px-3 py-1 text-center">{uploadProgress}%</Badge>
                <Progress value={uploadProgress} className="" />

              </div>
            }
          </div>
        </DialogContent>
      </Dialog>
    </div>


  );
};

