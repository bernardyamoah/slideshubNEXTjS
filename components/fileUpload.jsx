'use client'
import  { useState, useMemo, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import {
  ArrowUpTrayIcon,
  DocumentIcon,
  PhotoIcon,
} from "@heroicons/react/24/outline";
import {
  DocumentTextIcon,
  PresentationChartBarIcon,
} from "@heroicons/react/20/solid";
import { VideoIcon } from "lucide-react";
import { CardTitle } from './ui/card';

const FileUpload = ({ currentFiles, setCurrentFiles }) => {
  const [files, setFiles] = useState(currentFiles);

  const { getRootProps, getInputProps } = useDropzone({
    accept: '', // Accept all files
    multiple: true,
    onDrop: (acceptedFiles) => {
      setFiles(acceptedFiles);
      setCurrentFiles(acceptedFiles);
    },
  });
  useEffect(() => {
    setFiles(currentFiles); // Update the files state when currentFiles prop changes
  }, [currentFiles]);
  const getFileIcon = (fileType) => {
    switch (fileType) {
      case "application/pdf":
        return <DocumentTextIcon className="h-6 w-6 mx-auto" />;
      case "image/png":
      case "image/jpeg":
      case "image/gif":
      case "image/jpg":
        return <PhotoIcon className="h-6 w-6 mx-auto" />;
      case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      case "application/vnd.openxmlformats-officedocument.presentationml.presentation":
      case "application/vnd.ms-powerpoint":
      case "application/msword":
        return <PresentationChartBarIcon className="h-6 w-6 mx-auto" />;
      case "video/mp4":
      case "video/webm":
      case "video/avi":
        return <VideoIcon className="h-6 w-6 mx-auto" />;
      default:
        return <DocumentIcon className="h-6 w-6 mx-auto" />;
    }
  };

  const bytesToSize = (bytes) => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return '0 Byte';
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
  };

  const imageBlobUrl = useMemo(
    () => (files[0] ? URL.createObjectURL(files[0]) : ""),
    [files]
  );

  return (
    <div className="col-span-full">
      <div
        {...getRootProps()}
        className="relative cursor-pointer font-semibold  hover:bg-zinc-800/80 dark:hover:bg-zinc-900 block group"
      >
        <input {...getInputProps()} name="file" className="sr-only" />
        <div className="rounded-lg border border-dashed  px-2 sm:px-6 md:px-8 py-10 min-h-[200px] w-full ">
          {files[0]? (
            <div
              className="absolute inset-0 opacity-10 pointer-events-none group-hover:opacity-5 transition-opacity"
              style={{
                backgroundImage: `url(${imageBlobUrl})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
              }}
            />
          ) : null}
          <div className="text-center  grid  gap-2 max-w-xl mx-auto">
            {files[0] ? (
              
              <div className=' gap-6 grid divide-x-2'>
{files.map((file, index) => (
  
  
 
  <div key={index} className='border p-2 sm:p-6 rounded-md'>
    
    <div className="grid sm:flex  sm:items-center sm:justify-between sm:flex-1 gap-4 ">
                <div className='gap-2 flex'>
                <span>{getFileIcon(file.type)}</span>
                <CardTitle className='text-left'>{file.name.replace(/_/g, " ")}</CardTitle>
                </div>
            
            <div  className=' justify-end gap-2 flex text-muted-foreground'>
            <span>Size:</span>
            <p className="text-zinc-500  w-[0.2rem] ">{bytesToSize(file.size)}</p>
            </div>
             
              </div>
  </div>




))}
</div> 
            ) : (
              <ArrowUpTrayIcon
                className="mx-auto h-12 w-12 text-zinc-500"
                aria-hidden="true"
              />
            )}

            <div className="mt-4 flex text-sm leading-6 text-zinc-700">
              <span className="mx-auto">
                {files[0] ? "" : "Choose file to upload or drag and drop"}
              </span>
            </div>
            <p className="text-xs leading-5 text-zinc-400">
              {files[0]
                ? "Replace file?"
                : ".pdf, .docx, .pptx, image files and more"}
            </p>
          </div>
        </div>
      </div>
    </div>
      
  );
};

export default FileUpload;

{/* <ul>
{files.map((file, index) => (
  <li key={index}>
    {getFileIcon(file.type)}
    <span>{file.name}</span>
    <span>{bytesToSize(file.size)}</span>
  </li>
))}
</ul> */}