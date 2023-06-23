'use client'
import { useEffect, useState } from 'react';
import { getSlides, getCourseDetails } from '@/lib/functions';
import Link from 'next/link';
import Loading from './../../components/ui/Cloading';
import { Suspense } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useSearchParams } from 'next/navigation';
import { CloudArrowDownIcon } from "@heroicons/react/24/outline";
import { Button } from "@material-tailwind/react";
import EmptyState from '@/lib/Empty';

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
          loading: `fetching Slides from database...`,
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
      <main className="card_container">
        <section className="heading-link">
          <h3>Books</h3>
          {/* <p>
            <Link href="/">home</Link> / <Link href={`/campus/`}>Campus</Link>/Slides
          </p> */}
        </section>

        <section className="container relative mx-auto flex flex-col items-center pb-10">
          <div id="myUL">
            {isLoading ? (
              <Loading /> // Render the loading UI when data is loading
            ) : (
              <>
                {filteredSlides.length > 0 ? (
                  <ul className="md:container max-w-4xl grid sm:grid-cols-2 md:grid-cols-3 gap-8 pb-10">
                    <Suspense fallback={<Loading />}>
                      {filteredSlides.map((slide) => (
                        <aside
                          key={slide.$id}
                          className="relative block shadow-xl backdrop-blur-md transition-all hover:border-emerald-500 dark:hover:border-emerald-500 hover:shadow-emerald-500/10 overflow-hidden duration-300 ease-in-out border-4 border-gray-200 hover:shadow-xl  dark:border-gray-600 rounded-md w-full bg-white dark:bg-transparent"
                        >
                          <div className="card_link group">
                            <div className="text_container gap-2  flex sm:block ">
                              <h3 className="card_heading  ">{slide.name}</h3>
                              <Button
                                size="sm"
                                variant="gradient"
                                ripple={true}
                                className="flex items-center gap-3 mt-0 sm:mt-4"
                                onClick={() => {
                                  toast('Download started!', {
                                    icon: '📥',
                                  });
                                }}
                              >
                                <a
                                  href={slide.fileUrl}
                                  download={slide.fileUrl}
                                  className="flex items-center gap-2"
                                >
                                  <CloudArrowDownIcon strokeWidth={2} className="h-5 w-5" /> Download
                                </a>
                              </Button>
                            </div>
                          </div>
                        </aside>
                      ))}
                    </Suspense>
                  </ul>
                ) : (
                  <div className="flex justify-center w-full">
                    <EmptyState/>
                  </div>
                )}
              </>
            )}
          </div>
        </section>
        <Toaster />
      </main>
    </>
  );
}
