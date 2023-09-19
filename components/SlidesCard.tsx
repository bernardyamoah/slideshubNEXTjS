'use client'

// Modify the SlidesCard component to accept courseId as a prop
import { useEffect, useState } from 'react';
import { getSlidesByCourseId } from '@/lib/functions';

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { toast } from "react-hot-toast";
import { CloudArrowDownIcon } from "@heroicons/react/24/outline";
import { FolderOpen, ShieldCheck } from "lucide-react";
import { Badge } from "./ui/badge";
import { Suspense } from "react";
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
  <div className="grid h-full gap-8 mx-auto sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
<Suspense fallback={<div>Loading...</div>}>


{slides.map((slide) => (
    
    <Card className="relative">
      <CardHeader className="relative">
        <CardTitle className="w-full text-sm capitalize ">{slide.name.replace(/_/g, ' ').toLocaleLowerCase()}</CardTitle>

      </CardHeader>
      <CardContent className="flex flex-col">
        <Badge variant="secondary" className="bg-emerald-500 absolute -top-2 left-4  text-[10px] font-light sm:text-xs ">
          
        </Badge>
        <div className="flex items-center gap-1 text-xs text-gray-500 rounded-sm dark:text-gray-500/90 ">

          <aside className='flex justify-between gap-3 '>
            <div className="flex gap-1 text-xs text-muted-foreground">
              <FolderOpen className='w-4 h-4 text-muted-foreground' />  {slide.size}
            </div>

            <div className='flex gap-1 text-xs text-muted-foreground'> <ShieldCheck className='w-4 h-4 text-muted-foreground' /><span className='text-xs text-muted-background'>{slide.fileType}</span></div>
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
            href={slide.fileUrl}
            download={slide.fileUrl}
            className="flex items-center gap-2"
          >
            <CloudArrowDownIcon strokeWidth={2} className="w-5 h-5" /> Download
          </a>
        </Button>

      </CardContent>


    </Card>
      ))}
    </Suspense>
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