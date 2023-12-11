'use client'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
 
import { useCallback, useState } from "react";
import { Badge } from "lucide-react";

import { bytesToSize, errorMessage, handleFileUpload, successMessage, updateSlide } from "@/lib/functions";
import { databases } from "@/appwrite";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import DocumentUpload from "@/components/document-upload";
import { Separator } from "@radix-ui/react-dropdown-menu";
import {  storage } from "@/appwrite";
import { Progress } from "@/components/ui/progress";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";





export function SlideEdit({ data ,id,setRefresh,setShowDialog}) {
  // ...state declarations...
  const [currentFile, setCurrentFile] = useState<File | null>(null);

  const [updatedName, setUpdatedName] = useState(data.name); // Initialize updatedName with the initial data name
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  const handleChange = (e) => {
    setUpdatedName(e.target.value);
  };

  // Simplified edit handler specific to one slide
  // const handleEdit = async () => {
  //   try {
  //     const updatedAttributes = {
  //       name: updatedName,
      
  //     };

  //     await updateSlide(id, updatedAttributes,setRefresh);


  
  //   } catch (error) {
  //     errorMessage("Failed to update slide. Please try again.");
  //   }
  // }


  const handleSubmit = useCallback(
    async (event: React.FormEvent) => {
      event.preventDefault();

      try {
        const fileExtension = currentFile?.name.split(".").pop()?.toUpperCase();
        const updatedAttributes: {
          name?: string;
          fileUrl?: string;
          previewUrl?: URL;
          size?: string;
          fileType?: string;
        } = {};
        if (updatedName !== data.name) {
          updatedAttributes.name = updatedName;
        }

        if (currentFile !== null) {
          const result = await handleFileUpload(
            currentFile,
            id,
            setUploadProgress
          );
          if (result) {
            const fileName = currentFile.name.replace(/_/g, " ");
            updatedAttributes.name = fileName.slice(0, fileName.lastIndexOf("."));
            updatedAttributes.fileUrl = result.uploadedFileUrl;
            updatedAttributes.size = bytesToSize(currentFile.size);
            updatedAttributes.fileUrl = result.uploadedFileUrl;
            updatedAttributes.fileType = fileExtension ? fileExtension.toString() : "";
            updatedAttributes.previewUrl = result.filePreviewResponse;
          }
        }

        await updateSlide(id, updatedAttributes,setRefresh);
        setCurrentFile(null);
        
      } catch (error) {
        errorMessage("Failed to update slide ❌");
        setCurrentFile(null);
      }
    },
    [currentFile, id,data.name,]
  );




  return (
    <>   <Accordion type="single" collapsible className="w-full">
    <AccordionItem value="item-1">
      <AccordionTrigger>  Name</AccordionTrigger>
      <AccordionContent>
      <div className="grid items-center grid-cols-4 gap-2">
              <Label htmlFor="name" className=" hidden col-span-4 text-left">
                Name
              </Label>
              <Input
                 value={updatedName} // Use updatedName as the input value
                 onChange={handleChange}
                className="block col-span-4"
              />
            </div>
      </AccordionContent>
    </AccordionItem>
    <AccordionItem value="item-2">
      <AccordionTrigger>  Update file</AccordionTrigger>
      <AccordionContent>
      <div className="grid items-center grid-cols-4 gap-2">
              <Label htmlFor="file" className=" hidden col-span-4 text-left">
                Update file
              </Label>
              <DocumentUpload
                currentFile={currentFile}
                setCurrentFile={setCurrentFile}
              />
          </div>
          {uploadProgress > 0 && (
 <>
  <Progress value={uploadProgress} max={100} className="mt-3" />
  <Badge >{uploadProgress} %</Badge>
 </>
)}
      </AccordionContent>
    </AccordionItem>
  
  </Accordion>
  
  <DialogFooter className="flex gap-4">
          <Button variant="secondary" onClick={()=>setShowDialog(false)}>Cancel</Button>
          <Button type="submit" onClick={handleSubmit}>Save changes</Button>
          </DialogFooter>

    </>
  );
}
