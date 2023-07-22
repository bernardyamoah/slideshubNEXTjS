'use client'
import { useState, useEffect } from 'react';
import { getCampus } from '@/lib/functions';
import { Suspense } from 'react';
import Loading from '@/components/ui/Cloading';

import toast, { Toaster } from 'react-hot-toast';

import CampusCard from '@/components/CampusCard';
import { Card } from '@/components/ui/card';


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

  return (
    <>


      <div
        className="overflow-hidden bg-[url('https://media.istockphoto.com/id/1160970394/photo/back-of-university-student-with-backpack-while-going-to-college-by-walking-from-street.jpg?s=612x612&w=0&k=20&c=Uk0twlMLZTPVyMExQN2bvLyzuBfqkTSSnYZKG3hkwUV=')] bg-cover bg-top bg-no-repeat"
      >
        <div className="bg-black/60 p-8 md:p-12 lg:px-16 lg:py-24">
          <div className="text-center ltr:sm:text-left rtl:sm:text-right">
            <h2 className="text-2xl font-bold text-white sm:text-3xl md:text-5xl">
              Campus
            </h2>

            <p
              className="hidden max-w-lg text-white/90 md:mt-6 md:block md:text-lg md:leading-relaxed text-center mx-auto"
            >
              Select your campus to access the offered programmes
            </p>


          </div>
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
            <div className="max-w-4xl mx-auto w-full grid sm:grid-cols-2 lg:grid-cols-3 gap-8 pb-10 bg-none ">
              <Suspense fallback={<Loading />}>
                {campuses.map((campus) => (
                  <CampusCard key={campus.$id} campusId={campus.$id} {...campus} timePosted={campus.$createdAt} />
                ))}
              </Suspense>


            </div>
          )}
        </div>
      </section>
      <Toaster />

    </>
  );
}
