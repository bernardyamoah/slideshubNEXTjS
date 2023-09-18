'use client'


import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { toast } from "react-hot-toast";
import { CloudArrowDownIcon } from "@heroicons/react/24/outline";
import { FolderOpen, ShieldCheck } from "lucide-react";
import { Badge } from "./ui/badge";

interface Slide {
  $id: string;
  name: string;
  fileUrl: string;
  previewUrl: URL;
  size: string;
  fileType: string;
  courseId: string;
  $createdAt: string;
}



export default function SlidesCard ({ slides }:any){
  const {name, size, fileType, fileUrl, $createdAt} = slides
  return (





    
    <Card className="relative">
      <CardHeader className="relative">
        <CardTitle className="w-full text-sm capitalize ">{name.replace(/_/g, ' ').toLocaleLowerCase()}</CardTitle>

      </CardHeader>
      <CardContent className="flex flex-col">
        <Badge variant="secondary" className="bg-emerald-500 absolute -top-2 left-4  text-[10px] font-light sm:text-xs ">
          
        </Badge>
        <div className="flex items-center gap-1 text-xs text-gray-500 rounded-sm dark:text-gray-500/90 ">

          <aside className='flex justify-between gap-3 '>
            <div className="flex gap-1 text-xs text-muted-foreground">
              <FolderOpen className='w-4 h-4 text-muted-foreground' />  {size}
            </div>

            <div className='flex gap-1 text-xs text-muted-foreground'> <ShieldCheck className='w-4 h-4 text-muted-foreground' /><span className='text-xs text-muted-background'>{fileType}</span></div>
          </aside>
        </div>

        <Button
          size="sm"
          className="flex items-center w-full gap-3 mt-4"
          onClick={() => {
            toast("Download started!", {
              icon: "📥",
            });
          }}
        >
          <a
            href={fileUrl}
            download={fileUrl}
            className="flex items-center gap-2"
          >
            <CloudArrowDownIcon strokeWidth={2} className="w-5 h-5" /> Download
          </a>
        </Button>

      </CardContent>


    </Card>
  );
};


