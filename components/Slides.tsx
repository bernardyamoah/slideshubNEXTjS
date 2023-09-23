'use client'
import { formatTime, formatUserTime } from '@/lib/functions';
import { Card, CardTitle } from './ui/card';
import { FolderOpen, ShieldCheck } from 'lucide-react';
import { PresetActions } from '@/app/dashboard/components/preset-actions';


import {  useCallback, useEffect, useMemo, useState } from 'react';
import { getUserSlides } from '@/lib/functions';
import NoEvent from './NoEvent';
import PaginationComponent from './PaginationComponent';


import Loading from './ui/Cloading';

interface UserProps {
 user: {
    $id: string;
    name: string;
  };
}

export default function Slides ({user}:UserProps){
  const [slides, setSlides] = useState<Slides[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading,setLoading]=useState(false)
  const memoizedFetchSlides = useMemo(async () => {
    await getUserSlides(user.$id, currentPage, setTotalPages, setSlides, setLoading);
  }, [user.$id, currentPage]);
  
  useEffect(() => {
    const fetchData = async () => {
      await memoizedFetchSlides;
    };
    fetchData();
  }, [memoizedFetchSlides]);
  const changePage = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);
  
  const mainClassName = slides.length > 0 ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 " : "grid-cols-1 ";
  
  
  


  return(

<>

<aside className= {`grid mx-auto py-6 gap-8 auto-rows-auto ${mainClassName}`}>

{loading && <Loading />}
{!loading && slides.length === 0 && <NoEvent />}
{slides.map((slide) => (
 
    <Card key={slide.$id} className="relative overflow-hidden duration-700 border rounded-xl dark:hover:bg-zinc-800/10 group md:gap-8 hover:border-zinc-400/50 dark:border-zinc-600 ">
    <div className="pointer-events-none">
      <div className="absolute inset-0 z-0  transition duration-1000 [mask-image:linear-gradient(black,transparent)]"></div>
      <div className="absolute inset-0 z-10 transition duration-1000 opacity-100 bg-gradient-to-br via-zinc-100/10 group-hover:opacity-50 card_style"></div>
      <div className="absolute inset-0 z-10 transition duration-1000 opacity-0 mix-blend-overlay group-hover:opacity-100 card_style"></div>
    </div>
    <div 
         
    
    >
    
      <article className="p-4 md:p-8">
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs duration-1000 text-zinc-500 dark:text-zinc-200 dark:group-hover:text-white dark:group-hover:border-zinc-200 drop-shadow-orange">
            <time dateTime={slide.$createdAt}>{formatTime(slide.$createdAt)}
            
            </time>
          </span>
          <span className="flex items-center gap-1 text-xs text-zinc-500">
          <PresetActions name={slide.name} id={slide.$id} slides={slides} setSlides={setSlides} />
          </span>
        </div>
        <CardTitle className="z-20 mt-4 text-xl font-medium capitalize duration-1000 lg:text-2xl group-hover:text-zinc-800 dark:text-zinc-200 dark:group-hover:text-white font-display">
        {slide.name.replace(/_/g, ' ').toLocaleLowerCase()}
        </CardTitle>
        <div className="z-20 flex gap-4 mt-2">
          <span className="flex gap-2 text-sm capitalize duration-1000 text-zinc-400 dark:group-hover:text-zinc-200">
          <FolderOpen className='w-4 h-4 text-muted-foreground' />  {slide.size}
            </span>
            <span className="flex gap-2 text-sm capitalize duration-1000 text-zinc-400 dark:group-hover:text-zinc-200">
            <ShieldCheck className='w-4 h-4 text-muted-foreground' />
              <span className='text-xs text-muted-background'>{slide.fileType}</span>
              
            </span>
          </div>
   
      
      </article>
    </div>
    </Card>   
        ))}
</aside>
  {slides.length > 0 && (
                  <PaginationComponent
                    pageCount={totalPages}
                    activePage={currentPage}
                    onPageChange={changePage}
                  />
                )}
  </>

  )
} 

  

















{/* <main className={`mx-auto max-w-5xl grid gap-8  py-6  auto-rows-max ${mainClassName} pattern`}> */}