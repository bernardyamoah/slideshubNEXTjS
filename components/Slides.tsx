// components/Slides.tsx
import { formatTime } from '@/lib/functions';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { FolderOpen, ShieldCheck } from 'lucide-react';
import { PresetActions } from '@/app/dashboard/components/preset-actions';


import { Suspense, useCallback, useEffect, useState } from 'react';
import { getUserSlides } from '@/lib/functions';
import NoEvent from './NoEvent';
import PaginationComponent from './PaginationComponent';
import LoadingScreen from '@/app/dashboard/components/LoadingScreen';

interface SlidesProps {
  userId: string;
}

export default function Slides ({userId}:SlidesProps){
  const [slides, setSlides] = useState<Slides[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading,setLoading]=useState(false)
  useEffect(() => {
    async function fetchSlides() {
       await getUserSlides(userId,currentPage,setTotalPages,setSlides,setLoading);
      
    }
  
    fetchSlides();
  }, [userId,currentPage]);
  const changePage = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);
  const mainClassName = slides.length > 0 ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 " : "grid-cols-1 ";
  
  
  


  return(

<>

<aside className= {`grid mx-auto py-6 gap-8 auto-rows-auto ${mainClassName}`}>

{slides.map((slide) => (
     <Suspense fallback={<LoadingScreen />}>
    <Card className='relative'>
      <CardHeader className="flex flex-row items-start justify-center px-4 pb-2 space-y-0">
        <CardTitle className="leading-2 tracking-wider capitalize text-sm sm:max-w-[90%]">
          {slide.name.replace(/_/g, ' ').toLocaleLowerCase()}
        </CardTitle>
        <div className="flex justify-end flex-1 gap-1 text-xs text-gray-500 dark:text-gray-500/90">
          <PresetActions name={slide.name} id={slide.$id} />
        </div>
      </CardHeader>
      <CardContent>
        <div className='flex items-center gap-4 mb-4'>
          <span className='text-xs text-muted-foreground'>{formatTime(slide.$createdAt)}</span>
          <span className='text-xs text-muted-foreground'>{userId}</span>
        </div>
        <div className="absolute bottom-0 flex items-center gap-1 p-2 text-xs rounded-sm text-gray-400/90 right-6 dark:text-gray-500/90">
          <aside className='flex justify-between gap-3'>
            <div className="flex gap-1 text-xs text-muted-foreground">
              <FolderOpen className='w-4 h-4 text-muted-foreground' />  {slide.size}
            </div>
            <div className='flex gap-1 text-xs text-muted-foreground'>
              <ShieldCheck className='w-4 h-4 text-muted-foreground' />
              <span className='text-xs text-muted-background'>{slide.fileType}</span>
            </div>
          </aside>
        </div>
      </CardContent>
    </Card>
        
     </Suspense>
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
{/* <NoEvent /> */}

  

















{/* <main className={`mx-auto max-w-5xl grid gap-8  py-6  auto-rows-max ${mainClassName} pattern`}> */}