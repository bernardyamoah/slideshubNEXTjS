import * as React from "react";
import {useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { bytesToSize, createSlide, successMessage, errorMessage } from "@/lib/functions";
import { storage, ID } from "@/appwrite";
import { Button } from "@/components/ui/button";
import DocumentUpload from "./document-upload";

export default function AddSlides() {
  const [currentFile, setCurrentFile] = useState<File | null>(null);

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
          const uploader = await storage.createFile(
            process.env.NEXT_PUBLIC_SLIDES_STORAGE_ID!,
            ID.unique(),
            file
          );

          const fileId = uploader.$id;
 // Fetch file information from Appwrite
          const fileDetails = await storage.getFile(process.env.NEXT_PUBLIC_SLIDES_STORAGE_ID!, fileId);
          
          const fileName = fileDetails.name || "";

          const fileUrlResponse = await storage.getFileDownload(
            process.env.NEXT_PUBLIC_SLIDES_STORAGE_ID!,
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
        const slideData = {
          name: fileName.slice(0, fileName.lastIndexOf(".")),
          size: bytesToSize(currentFile.size),
          fileUrl: fileUrl,
          fileType:fileExtension ? fileExtension.toString() : "",
        };

        const response = await createSlide(slideData);

        // Reset form fields
        setCurrentFile(null);

        successMessage("Slide added successfully!");
      }
    } catch (error) {
      console.error("Error handling form submission:", error);
      setCurrentFile(null);

      errorMessage("Error occurred during slide upload.");
    }
  };

  return (
    <>
      <div className="flex items-center mt-10">
        <div className="max-w-3xl mx-auto w-full">
          <Card className="lg:container">
            <CardHeader>
              <CardTitle>Add Slide</CardTitle>
              <CardDescription>Add a slide document in one-click.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="grid w-full items-center gap-2 space-y-6">
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
        <ToastContainer />
      </div>
    </>
  );
}
