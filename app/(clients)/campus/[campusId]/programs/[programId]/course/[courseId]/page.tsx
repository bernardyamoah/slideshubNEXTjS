'use client'
import { useEffect, useState } from 'react';
import { getSlides, getCourseDetails } from '@/lib/functions';

import Loading from '@/components/ui/Cloading';
import { Suspense } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useSearchParams } from 'next/navigation';


import { EmptySlides } from '@/components/EmptySlides';
import {  Download, View} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FolderOpen } from 'lucide-react';
import { ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function FilesList() {
  const searchParams = useSearchParams();
  const [slides, setSlides] = useState<Slides[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const programName = searchParams?.get('name');
  let courseId = searchParams?.get('courseId'); // Use the correct parameter name

  useEffect(() => {
    async function fetchFiles() {
      try {


        const response = await toast.promise(getSlides(), {
          loading: `Fetching slides from database...`,
          success: <b>Successfully fetched slides</b>,
          error: <b>Failed to fetch slides.</b>,
        });
        setSlides(response);
      } catch (error) {
        console.log('Error fetching files:', error);
      }
      setIsLoading(false); // Set loading state to false after fetching files
    }

    fetchFiles();
  }, [courseId]);

  const filteredSlides = slides.filter((slide) => slide.courseId === courseId);

  return (
    <>

        {/* <section className="heading-link">
          <h3>Slides</h3>
          <p>
            <Link href="/">home</Link> / <Link href={`/campus/`}>Campus</Link>/Slides
          </p>
        </section> */}

        <section className="min-h-screen container relative mx-auto flex flex-col items-center pb-10">
          <div id="myUL">
            {isLoading ? (
              <Loading /> // Render the loading UI when data is loading
            ) : (
              <div className="mx-auto max-w-7xl grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                <Suspense fallback={<Loading />}>
                  {filteredSlides.length > 0 ? (
                    filteredSlides.map((slide) => (
                      <Card  className='relative '  key={slide.$id}>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className=" font-medium capitalize">
                        {slide.name}
                        </CardTitle>
                      
                      </CardHeader>
                      <CardContent >
          
                  <div className='flex items-center justify-between mb-4'>

                  <aside className='flex gap-1 order-2'>
                    <div className="text-xs text-muted-foreground flex gap-1">
                    <FolderOpen className='h-4 w-4 text-muted-foreground'/>  {slide.size}
                    </div>
                    <div className='text-xs text-muted-foreground flex gap-1'> <ShieldCheck className='h-4 w-4 text-muted-foreground'/><span className='text-xs'>{slide.fileType}</span></div>
                    </aside>
                      <Link href={slide.previewUrl} className='text-muted-foreground flex gap-1 items-center '><View className='w-4 h-4 text-muted-foreground'/>Preview</Link>
                  </div>
              
              <Link href={slide.fileUrl} download={slide.fileUrl}>
                    <Button className='w-full'>
              <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
              </Link>
              
                  </CardContent>
                </Card>
                    
                  
                    ))
                  ) : (
                    <EmptySlides />
                  )}
                </Suspense>
              </div>
            )}
          </div>
        </section>
        <Toaster />

    </>
  );
}
