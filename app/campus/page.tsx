'use client'
import { useState, useEffect } from 'react';
import { getCampus } from '@/lib/functions';
import { Suspense } from 'react';
import Loading from '../../components/ui/Cloading';

import Link from 'next/link';

import toast, { Toaster } from 'react-hot-toast';

import CampusCard from '@/components/CampusCard';


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
      {/*
  Heads up! 👋

  This component comes with some `rtl` classes. Please remove them if they are not needed in your project.
*/}

      <div
        className="overflow-hidden bg-[url('https://images.unsplash.com/photo-1562157873-818bc0726f68?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=654&q=80')] bg-cover bg-top bg-no-repeat"
      >
        <div className="bg-black/60 p-8 md:p-12 lg:px-16 lg:py-24">
          <div className="text-center ltr:sm:text-left rtl:sm:text-right">
            <h2 className="text-2xl font-bold text-white sm:text-3xl md:text-5xl">
              Campus
            </h2>

            <p
              className="hidden max-w-lg text-white/90 md:mt-6 md:block md:text-lg md:leading-relaxed text-center mx-auto"
            >
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Inventore
              officia corporis quasi doloribus iure architecto quae voluptatum beatae
              excepturi dolores.
            </p>

    
    </div>
  </div>
</div>
      {/* <section className="heading-link">
    
        <p>
          <Link href="/">home</Link> / <Link href={`/campus/`}>Campus</Link>
        </p>
      </section> */}
      <section className="mt-10 relative mx-auto flex flex-col items-center pb-10 px-2">
          <div id="myUL">
            {isLoading ? (
              <Loading />
            ) : (
      <ul className="md:container max-w-4xl grid sm:grid-cols-2 md:grid-cols-3 gap-8 pb-10">
        <Suspense fallback={<Loading />}>
          {campuses.map((campus) => (
                      <CampusCard key={campus.$id} campusId={campus.$id} {...campus} timePosted={campus.$createdAt} />
                    ))}
        </Suspense>
        
      
      </ul>
          )}
          </div>
        </section>
        <Toaster />
    
    </>
  );
}
