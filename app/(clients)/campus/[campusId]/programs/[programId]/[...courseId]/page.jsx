
'use client'
import {  getSlidesByCourseId } from '@/lib/functions';
import Loading from '@/components/ui/Cloading';
import { Suspense, useEffect, useState } from 'react';
import { EmptySlides } from '@/components/EmptySlides';
import SlidesCard from '@/components/SlidesCard';

// async function fetchFiles( courseId) {

//   try {
//     const response =  await getSlidesByCourseId(courseId)
// return response
//   } catch (error) {
//     console.log('Error fetching files:', error);
//   }
// }




export default async function FilesList({params:{courseId}}) {

  // const slides = await fetchFiles(courseId)
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const slidesData = await getSlidesByCourseId(courseId);
        setSlides(slidesData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSlides();
  }, []);


return (
    <>
      <section className="relative flex flex-col items-center w-full pb-10 mx-auto ">
      <Suspense fallback={<Loading />}>
          {slides?.length > 0 ? (
            <div className="grid h-full gap-8 mx-auto sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
              {slides?.map((slide) => (
                <SlidesCard key={slide.$id} slides={slide} />
              ))}
            </div>
          ) : (
            <div className="flex justify-center w-full">
              <EmptySlides />
            </div>
          )}
        </Suspense>

      </section>
      <div className='flex justify-center max-w-xl p-4 pb-10 mx-auto mt-10'>
        
      </div>

    </>
  );
}
