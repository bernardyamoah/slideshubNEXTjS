import React, { useState, useMemo } from 'react';
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
import { Separator } from './ui/separator';

const FileUpload = ({ currentFiles, setCurrentFiles }) => {
  const [files, setFiles] = useState([]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: '', // Accept all files
    multiple: true,
    onDrop: (acceptedFiles) => {
      setFiles(acceptedFiles);
      setCurrentFiles(acceptedFiles);
    },
  });

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
        className="relative cursor-pointer font-semibold text-white hover:text-gray-400 hover:bg-gray-200/80 dark:hover:bg-gray-900 block group"
      >
        <input {...getInputProps()} name="file" className="sr-only" />
        <div className="flex justify-center rounded-lg border border-dashed border-white/25 px-6 py-10 min-h-[200px] md:min-w-full items-center">
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
          <div className="text-center hover:text-white flex flex-col items-center justify-center space-y-1">
            {files[0] ? (
              // <div className="flex flex-col sm:flex-row items-center space-y-1 sm:space-x-2 text-gray-500">
              //   <div>{fileIcon(currentFile.type)}</div>
              //   <p>{currentFile.name.replace(/_/g, " ")}</p>
              //   <p className="text-gray-500">{bytesToSize(currentFile.size)}</p>
              // </div>
              <ul>
{files.map((file, index) => (
  <>
  
  
 
  <li key={index} className=''>
    
    <div className="flex flex-col sm:flex-row items-center space-y-1 sm:space-x-2 text-gray-500">
                <div className='gap-2 flex'>{getFileIcon(file.type)}
                {file.name.replace(/_/g, " ")}
                </div>
            
                <p className="text-gray-500">{bytesToSize(file.size)}</p>
              </div>
  </li>
  <Separator />
</>


))}
</ul> 
            ) : (
              <ArrowUpTrayIcon
                className="mx-auto h-12 w-12 text-gray-500"
                aria-hidden="true"
              />
            )}

            <div className="mt-4 flex text-sm leading-6 text-gray-700">
              <span className="mx-auto">
                {files[0] ? "" : "Choose file to upload or drag and drop"}
              </span>
            </div>
            <p className="text-xs leading-5 text-gray-400">
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