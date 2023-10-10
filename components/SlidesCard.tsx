'use client'

// Modify the SlidesCard component to accept courseId as a prop
import { useEffect, useState } from 'react';
import { formatUserTime, getSlidesByCourseId } from '@/lib/functions';

import { Card, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { CloudArrowDownIcon } from "@heroicons/react/24/outline";
import { FolderOpen, ShieldCheck } from "lucide-react";

import { EmptySlides } from './EmptySlides';
import Loading from './ui/Cloading';

interface Slide {
  $id: string;
  name: string;
  fileUrl: string;
  previewUrl: URL;
  size: string;
  fileType: string;
  courseId: string;
  $updatedAt:string;
  $createdAt: string;
}
interface SlidesCardProps {
  courseId: string;
}


const SlidesCard = ({ courseId }:SlidesCardProps) => {
// export default function SlidesCard ({ slides }:any){
  // const {name, size, fileType, fileUrl, $createdAt} = slides
  const [slides, setSlides] = useState<Slide[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchSlides = async () => {
      const slidesData = await getSlidesByCourseId(courseId);
      setSlides(slidesData);
      setLoading(false);
    };

    fetchSlides();
  }, [courseId]);

  if (loading) {
    return <Loading />;
  }
  return (

<>

{ slides.length > 0 ?
(
  <div className="grid grid-cols-1 gap-10 px-4 pb-10 mx-auto max-w-7xl sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">



{slides.map((slide) => (
    
    <Card key={slide.$id} className="relative overflow-hidden duration-700 border rounded-xl dark:hover:bg-zinc-800/10 group md:gap-8 hover:border-zinc-400/50 dark:border-zinc-600 backdrop-blur-sm ">
       <div className="pointer-events-none">
          <div className="absolute inset-0 z-0  transition duration-1000 [mask-image:linear-gradient(black,transparent)]"></div>
          <div className="absolute inset-0 z-10 transition duration-1000 opacity-100 bg-gradient-to-br via-zinc-100/10 group-hover:opacity-50 card_style"></div>
          <div className="absolute inset-0 z-10 transition duration-1000 opacity-0 mix-blend-overlay group-hover:opacity-100 card_style"></div>
        </div>

        <article className="p-4 md:p-8">
            <div className="flex items-center justify-between gap-2">
              <span className="flex gap-1 text-xs duration-1000 text-zinc-500 dark:text-zinc-200 dark:group-hover:text-white dark:group-hover:border-zinc-200 drop-shadow-orange">
              
                <FolderOpen className='w-4 h-4 text-muted-foreground' />  {slide.size}
              </span>
              <span className="flex items-center gap-1 text-xs text-zinc-500">
              <ShieldCheck className='w-4 h-4 text-muted-foreground' /><span className='text-xs text-muted-background'>{slide.fileType}</span>
              </span>
            </div>
            <CardTitle className="z-20 mt-2 text-xl font-medium capitalize duration-500 group-hover:text-zinc-800 dark:text-zinc-200 dark:group-hover:text-white font-display">
            {slide.name.replace(/_/g, ' ').toLocaleLowerCase()}
            </CardTitle>
          <div className="z-20 flex gap-4 mt-2">
       
            <span className="flex gap-2 text-xs capitalize duration-1000 text-zinc-400 dark:group-hover:text-zinc-200">
              Updated on
            <time dateTime={slide.$updatedAt}>{formatUserTime(slide.$updatedAt)}
                
                </time>
              
            </span>
           
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
            href={slide.fileUrl}
            download={slide.fileUrl}
            className="flex items-center gap-2"
          >
            <CloudArrowDownIcon strokeWidth={2} className="w-5 h-5" /> Download
          </a>
        </Button>
          
          </article>
  
    </Card>
      ))}

    </div>
    )
    :  (
    <div className="flex justify-center w-full">
              <EmptySlides />
            </div>)
            }
</>
  );
};


export default SlidesCard;