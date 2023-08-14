'use client'
import { useState, useEffect } from 'react';
import { getCampus } from '@/lib/functions';
import { Suspense } from 'react';
import Loading from '@/components/ui/Cloading';

import toast, { Toaster } from 'react-hot-toast';

import CampusCard from '@/components/CampusCard';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronsLeftIcon, ChevronsRightIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';


interface Campus {
  $id: string;
  name: string;
  image: string;
  location: string;
  $createdAt: string;
}

export default function CampusList() {
  const [campuses, setCampuses] = useState<Campus[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    async function fetchCampuses() {
      try {

        const response = await toast.promise(getCampus(),
          {
            loading: 'Fetctching campus from database...',
            success: <b>Campuses fetched!</b>,
            error: <b>Could not load campuses.</b>,
          });

        setCampuses(response);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching campuses:', error);
        setIsLoading(false);
      }
    }

    fetchCampuses();
  }, []);
  const router = useRouter();
  return (
    <>


      <div
        className="overflow-hidden "
      >
        <div className="text-center p-8 md:p-12 lg:px-16 lg:py-24">
          <h2 className="text-2xl font-bold text-white sm:text-3xl md:text-5xl">
            Campus
          </h2>

          <p
            className=" max-w-lg text-muted-foreground md:mt-6 md:block md:text-lg md:leading-relaxed text-center mx-auto"
          >
            Select your campus to access the offered programmes
          </p>


        </div>
      </div>
      {/* <section className="heading-link">
    
        <p>
          <Link href="/">home</Link> / <Link href={`/campus/`}>Campus</Link>
        </p>
      </section> */}
      <section className="h-full relative mx-auto flex flex-col items-center pb-10 px-2 bg-inherit">
        <div className='w-full'>
          {isLoading ? (
            <Loading />
          ) : (
            <div className=" mx-auto max-w-7xl grid gap-8  auto-rows-max grid-cols-1 sm:flex justify-center flex-wrap p-4 ">
              <Suspense fallback={<Loading />}>
                {campuses.map((campus) => (
                  <CampusCard key={campus.$id} campusId={campus.$id} {...campus} timePosted={campus.$createdAt} />
                ))}
              </Suspense>


            </div>
          )}
        </div>
      </section>
      {/* Buttons for navigating back and forward */}
      <div className='flex max-w-xl mx-auto justify-between mt-10 p-4 pb-10'>
        <Button
          className="mt-6"
          onClick={() => router.back()}
        >
          <ChevronsLeftIcon className="w-4 h-4 mr-2 " aria-hidden="true" />
          Go Back
        </Button>
        <Button
          className="mt-6"
          onClick={() => router.forward()}
          disabled={!router.forward} // Disable the button if forward navigation is not possible
        >
          Go Forward
          <ChevronsRightIcon className="w-4 h-4 mr-2 " aria-hidden="true" />
        </Button>
      </div>


    </>
  );
}
