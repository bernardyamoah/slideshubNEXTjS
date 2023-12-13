'use client'
import { useUserContext } from "@/components/UserContext";
import FileUpload from "@/components/fileUpload";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

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
import { BookCategories } from "@/constants";
import { successMessage } from "@/lib/functions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { getBookCover, searchBooksByTitle } from "./bookService";
import BookSelector from "./bookSelector";
import Search from "./search";
import { toast } from "sonner";

// const bookSchema = z.object({
//   categories:z.array(z.string()).refine((value) => value.some((item) => item), {
//     message: "You have to select at least one item."}),
//   currentFiles: z.array(z.string().min(1, 'MIN_FILE_SELECTION_MESSAGE')),
// });

interface Book {

}


export default function AddBooksForm() {


  // const handleSearch = async (query) => {
  //   if (!query) return;
  //   fetchBook(query);
  // };
  // const { user } = useUserContext();
  // const [currentFiles, setCurrentFiles] = useState([]);
  // const [uploadProgress, setUploadProgress] = useState<number>(0);
  // const form = useForm<z.infer<typeof bookSchema>>({
  //   resolver: zodResolver(bookSchema),
  //   defaultValues: {
  //     categories: [], // Initialize as an empty array 
  //     currentFiles: [],

  //   },
  // });
  // async function onSubmit(data: z.infer<typeof bookSchema>) {
  //   // successMessage( JSON.stringify(data, null, 2))
  //   console.log(data);
  // }
  return (
    //     <Form {...form}>
    //      <Card className="max-w-xl mx-auto">
    //       <CardHeader className="mb-6">
    //         <h2 className="text-xl font-semibold">Add Books</h2>
    //       </CardHeader>
    //       <CardContent>
    //       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ">



    //       <FormField
    //           control={form.control}
    //           name="categories"
    //           render={() => (
    //             <FormItem>
    //               <div className="mb-4">
    //                 <FormLabel className="text-base">Sidebar</FormLabel>
    //                 <FormDescription>
    //                   Select the items you want to display in the sidebar.
    //                 </FormDescription>
    //               </div>
    //               <ScrollArea className="h-44">
    //               {BookCategories.map((item) => (
    //                 <FormField
    //                   key={item.id}
    //                   control={form.control}
    //                   name="categories"

    //                   render={({ field }) => {
    //                     return (
    // <FormItem
    //                         key={item.id}
    //                         className="flex flex-row items-start mt-1 space-x-3 space-y-0"
    //                       >
    //                         <FormControl >
    //                           <Checkbox 
    //                             checked={field.value?.includes(item.id)}
    //                             onCheckedChange={(checked) => {
    //                               return checked
    //                                 ? field.onChange([...field.value, item.id])
    //                                 : field.onChange(
    //                                     field.value?.filter(
    //                                       (value) => value !== item.id
    //                                     )
    //                                   )
    //                             }}
    //                           />
    //                         </FormControl>
    //                         <FormLabel className="font-normal">
    //                           {item.label}
    //                         </FormLabel>
    //                       </FormItem>


    //                         )
    //                       }}
    //                       />
    //                       ))}
    //                       </ScrollArea>
    //               <FormMessage />
    //             </FormItem>
    //           )}
    //         />





    //    <FormField
    //           control={form.control}
    //           name="currentFiles"
    //           render={({ field }) => (
    //             <FormItem>
    //               <FormLabel>Files</FormLabel>

    //               <FileUpload
    //                 currentFiles={currentFiles}
    //                 setCurrentFiles={setCurrentFiles}
    //               />

    //               <FormDescription>
    //             Select the books to upload.

    //               </FormDescription>
    //               <FormMessage />
    //             </FormItem>
    //           )}
    //         />
    //          {uploadProgress >  0 &&
    //         <CardFooter>
    //         <Progress value={uploadProgress} />
    //         </CardFooter>
    //       }
    //          <Button type="submit">Submit</Button>
    //        </form>
    //       </CardContent>
    //      </Card>
    //     </Form>

    <>

        
        
    


    </>

  );
}