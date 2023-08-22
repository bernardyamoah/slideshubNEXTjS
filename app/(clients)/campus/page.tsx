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
            loading: 'Embarking on an adventure...',
            success: <b>Adventure awaits! Campuses found!</b>,
            error: <b>Lost in the jungle of campuses. Could not find any.</b>,
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


      <div className="overflow-hidden">
        <div className="relative p-8 text-center bg-center bg-cover md:p-12 lg:px-16 lg:py-10 bg-hero-image">
          <h2 className="text-3xl font-bold sm:text-4xl md:text-5xl">
            Embark on an Adventure!
          </h2>
          <p className="max-w-lg mx-auto text-center md:mt-6 md:text-lg md:leading-relaxed">
            Select a campus to explore the offered programs, facilities, and vibrant campus life.
          </p>
        </div>
      </div>
      <section className="relative flex flex-col items-center h-full px-2 pb-10 mx-auto bg-inherit">
        <div className="w-full">
          {isLoading ? (
            <Loading />
          ) : (
            <div className="grid flex-wrap justify-center grid-cols-1 gap-8 p-4 mx-auto max-w-7xl auto-rows-max sm:flex ">
              <Suspense fallback={<Loading />}>
                {campuses.map((campus) => (
                  <CampusCard key={campus.$id} campusId={campus.$id} {...campus} timePosted={campus.$createdAt} />
                ))}
              </Suspense>
            </div>
          )}
        </div>
      </section>
      <div className='flex justify-center'>
        <div className="flex gap-5 p-4 pb-10 mx-auto mt-10">
          <Button className="mt-6" onClick={() => router.back()}>
            <ChevronsLeftIcon className="w-4 h-4 mr-2" aria-hidden="true" />
            Go Back
          </Button>
          <Button className="mt-6" onClick={() => router.forward()} disabled={!router.forward}>
            Go Forward
            <ChevronsRightIcon className="w-4 h-4 mr-2" aria-hidden="true" />
          </Button>
        </div>
      </div>
    </>
  );
}
