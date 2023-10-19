'use client'
import { useUserContext } from "@/components/UserContext";
import FileUpload from "@/components/fileUpload";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";


import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import BookCategories from "@/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const bookSchema = z.object({
  categories: z.array(z.string().min(1, 'Category is required')),
  currentFiles: z.array(z.string().min(1, 'MIN_FILE_SELECTION_MESSAGE')),
});
export default function AddBooksForm() {
  const { user } = useUserContext();
  const [currentFiles, setCurrentFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const form = useForm<z.infer<typeof bookSchema>>({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      
      currentFiles: [],

    },
  });
  async function onSubmit(data: z.infer<typeof bookSchema>) {
    console.log(data);
  }
  return (
    <Form {...form}>
     <Card className="max-w-xl mx-auto">
      <CardHeader className="mb-6">
        <h2 className="text-xl font-semibold">Add Books</h2>
      </CardHeader>
      <CardContent>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ">
      

    
        <FormField
           control={form.control}
           name="categories"
           render={({ field }) => (
             <FormItem>
               <FormLabel>Categories</FormLabel>
               <Select onValueChange={field.onChange}  >
               <FormControl>
          <SelectTrigger>
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
        </FormControl>
               <SelectContent>
               <ScrollArea className="h-[150px] w-full " >
               {BookCategories.map((cat, index) => (
          
          <SelectItem key={index} value={cat}>
        {cat}
        </SelectItem>
      ))}
      
      </ScrollArea>
               </SelectContent>
             </Select>
               <FormDescription>
                 Choose the campus for the slides.
               </FormDescription>
               <FormMessage />
             </FormItem>
           )}
         />
   <FormField
          control={form.control}
          name="currentFiles"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Files</FormLabel>

              <FileUpload
                currentFiles={currentFiles}
                setCurrentFiles={setCurrentFiles}
              />

              <FormDescription>
            Select the files to upload.

              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
         {uploadProgress >  0 &&
        <CardFooter>
        <Progress value={uploadProgress} />
        </CardFooter>
      }
         <Button type="submit">Submit</Button>
       </form>
      </CardContent>
     </Card>
    </Form>
  );
}