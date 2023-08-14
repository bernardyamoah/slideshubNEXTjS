'use client'
import { useEffect, useState } from 'react';
import { getCoursesByProgramId, getSlidesByCourseId, getCourseName } from '@/lib/functions';

import Loading from '@/components/ui/Cloading';
import { Suspense } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter, useSearchParams } from 'next/navigation';

import { Metadata, ResolvingMetadata } from 'next'




import { EmptySlides } from '@/components/EmptySlides';


import SlidesCard from '@/components/SlidesCard';
import { Button } from '@/components/ui/button';
import { ChevronsLeftIcon } from 'lucide-react';
import { ChevronsRightIcon } from 'lucide-react';

//Metadata part










export default function FilesList() {
  const searchParams = useSearchParams();
  const [slides, setSlides] = useState<Slides[]>([]);
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);

  const programName = searchParams?.get('name');
  let courseId = searchParams?.get('courseId')?.toString(); // Use the correct parameter name

  useEffect(() => {
    async function fetchFiles() {
      try {


        const response = await toast.promise(getSlidesByCourseId(courseId), {
          loading: `Fetching slides from database...`,
          success: <p>Successfully fetched slides</p>,
          error: <p>Failed to fetch slides.</p>,
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
      <div className='flex max-w-xl mx-auto justify-center mt-10 p-4 pb-10'>
        <Button
          className="mt-6"
          onClick={() => router.back()}
        >
          <ChevronsLeftIcon className="w-4 h-4 mr-2 " aria-hidden="true" />
          Go Back
        </Button>

      </div>

    </>
  );
}
