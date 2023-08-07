'use client'
import { useEffect, useState } from 'react';
import { getCoursesByProgramId, getSlidesByCourseId, getCourseName } from '@/lib/functions';

import Loading from '@/components/ui/Cloading';
import { Suspense } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useSearchParams } from 'next/navigation';

import { Metadata, ResolvingMetadata } from 'next'




import { EmptySlides } from '@/components/EmptySlides';


import SlidesCard from '@/components/SlidesCard';

//Metadata part










export default function FilesList() {
  const searchParams = useSearchParams();
  const [slides, setSlides] = useState<Slides[]>([]);


  const [isLoading, setIsLoading] = useState(true);

  const programName = searchParams?.get('name');
  let courseId = searchParams?.get('courseId')?.toString(); // Use the correct parameter name

  useEffect(() => {
    async function fetchFiles() {
      try {

        console.log('courseId', courseId);
        const response = await toast.promise(getSlidesByCourseId(courseId), {
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


  return (
    <>

      {/* <section className="heading-link">
          <h3>Slides</h3>
          <p>
            <Link href="/">home</Link> / <Link href={`/campus/`}>Campus</Link>/Slides
          </p>
        </section> */}

      <section className=" w-full  relative mx-auto flex flex-col items-center pb-10">

        {isLoading ? (
          <Loading /> // Render the loading UI when data is loading
        ) : (
          <>

            <Suspense fallback={<Loading />}>
              {slides.length > 0 ? (
                <div className="mx-auto h-full  grid gap-8 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">

                  {slides.map((slide) => (

                    <SlidesCard key={slide.$id} {...slide} timePosted={slide.$createdAt} user_id={slide.user_id} {...slides} />
                  ))}


                </div>
              ) : (
                <div className="flex justify-center w-full">
                  <EmptySlides />
                </div>
              )}
            </Suspense>
          </>
        )}

      </section>

      <Toaster />

    </>
  );
}
