import { getCourseDetails } from '@/lib/functions';
import { Metadata, ResolvingMetadata } from 'next';
import { formatUserTime, getSlidesByCourseId } from '@/lib/functions';

import { ExternalLink, FolderOpen, ShieldCheck } from "lucide-react";
// import Loading from '@/components/ui/Cloading';
import { Card, CardTitle } from '@/components/ui/card';
import DownloadBtn from '@/components/ui/downloadBtn';

import { Suspense } from 'react';
import Link from 'next/link';
import EmptyState from '@/components/EmptyUI';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { ImageCard} from '@/components/ui/image-card';


type Props = {
  params: { courseId: string };
};
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { courseId } = params;

  // Fetch campus details using the campusId
  const { name } = await getCourseDetails(courseId)?? { name: '' };

  // Define the metadata fields
  const pageTitle = courseId ? `${name}` : "Course";
  const pageDescription = `Browse ${name} slides on this page`;

  return {
    title: pageTitle,
    description: pageDescription,
  };
}



async function getFiles (courseId:string) {
      const slides = await getSlidesByCourseId(courseId);
      return slides
}


export default async function FilesList({params:{courseId}}) {
const data= await getFiles(courseId)
const slides = data.filter((slide) => slide.fileType !== 'PNG' && slide.fileType !== 'JPG');
const Images = data.filter((slide) => slide.fileType === 'PNG' || slide.fileType === 'JPG');
return (
 <>
{ slides.length > 0 ?
  (
    <div className="grid grid-cols-1 gap-10 px-4 pb-10 mx-auto max-w-7xl sm:grid-cols-2 lg:grid-cols-3 lg:gap-12 place-content-center ">
      
        <Suspense fallback={<div>Loading...</div>}>

   
   
  
       

 {slides.map((slide) => (
      
      <Card key={slide.$id} className="overflow-hidden duration-700 border rounded-xl dark:hover:bg-zinc-800/10 group md:gap-8 hover:border-zinc-400/50 dark:border-zinc-600 backdrop-blur-sm ">
         <div className="pointer-events-none">
            <div className="absolute inset-0 z-0  transition duration-300 [mask-image:linear-gradient(black,transparent)]"></div>
            <div className="absolute inset-0 z-10 transition duration-300 opacity-100 bg-gradient-to-br via-zinc-100/10 group-hover:opacity-50 card_style"></div>
            <div className="absolute inset-0 z-10 transition duration-300 opacity-0 mix-blend-overlay group-hover:opacity-100 card_style"></div>
          </div>
  
          <article className="p-4 md:p-8">
              <div className="flex items-center justify-between gap-2">
                <span className="flex gap-1 text-xs duration-300 text-zinc-500 dark:text-zinc-200 dark:group-hover:text-white dark:group-hover:border-zinc-200 drop-shadow-orange">
                
                  <FolderOpen className='w-4 h-4 text-muted-foreground' />  {slide.size}
                </span>
                <span className="flex items-center gap-1 text-xs text-zinc-500">
                <ShieldCheck className='w-4 h-4 text-muted-foreground' /><span className='text-xs text-muted-background'>{slide.fileType}</span>
                </span>
              </div>
   
              


              <CardTitle className="z-20 mt-2 text-xl font-medium capitalize duration-500 group-hover:text-zinc-800 dark:text-zinc-200 dark:group-hover:text-white font-display  text-left">
             
              {slide.name.replace(/_/g, ' ').toLocaleLowerCase()}

              </CardTitle>
            <div className="z-20 flex gap-4 mt-2">
      
              <span className="flex gap-2 text-xs capitalize duration-300 text-zinc-400 dark:group-hover:text-zinc-200">
                Updated on
              <time dateTime={slide.$updatedAt}>{formatUserTime(slide.$updatedAt)}
                  
                  </time>
                
              </span>
             {slide.fileType==='pdf' ? (

<Link href={'/slide-preview'}
 className='gap-2'>
  <ExternalLink className='w-4 h-4 text-muted-foreground'/>
Preview 
</Link>
             ):null}
             
            </div>
            <DownloadBtn Fileurl={slide.fileUrl} filename={slide.name} />
            
            </article>
    
      </Card>
        ))}
        </Suspense>
      
      </div>
      )
      :  (
      <div className="flex justify-center w-full">
                <EmptyState title='slides' />
              </div>)
              }
  </>
)
}