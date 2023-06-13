'use client'
import { useState, useEffect } from 'react';
import { getCampus } from '@/lib/functions';
import { Suspense } from 'react';
import Loading from '../../components/ui/Cloading';
import Image from 'next/image';
import Link from 'next/link';
import { Chip } from "@material-tailwind/react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Campus() {
  const [campuses, setCampuses] = useState([]);

  useEffect(() => {
    async function fetchCampuses() {
      try {
        const response = await getCampus();
        setCampuses(response);
      } catch (error) {
        console.error('Error fetching campuses:', error);
      }
    }

    fetchCampuses();
  }, []);

  return (
    <>

      
        <section className="heading-link">
        <h1 className="text-2xl font-bold mb-4 text-center">Campuses</h1>
        <p>
          <Link href="/">home</Link> / <Link href={`/campus/`}>Campus</Link> 
        </p>
      </section>
        <section className="container grid sm:grid-cols-2 lg:grid-cols-3 place-items-center  gap-10 pb-10 ">
          <Suspense fallback={<Loading />}>
            {campuses.map((campus) => (
              <aside
                key={campus.$id}
                className="h-32 max-w-sm relative block shadow-xl backdrop-blur-md transition-all hover:border-emerald-500 dark:hover:border-emerald-500 hover:shadow-emerald-500/10 overflow-hidden duration-300 ease-in-out border-4 border-gray-200 hover:shadow-xl cursor-pointer dark:border-gray-600 rounded w-full bg-white dark:bg-transparent"
              >
  
                <Link className="flex h-full transition group" href={`/campus/${campus.$id}/programs`}   >
                  <div className="relative overflow-hidden rounded-t-3xl pt-[50%]  px-2 w-1/3 aspect-square">
                    <Image
                      className="object-center object-cover  group-hover:scale-105"
                      src={campus.image}
                      alt={campus.name}
                      fill
                    />
                  </div>

                  <div className="relative  flex-1 pl-4 pt-4">

                    <h3 className="text-sm  font-bold tracking-wider"> {campus.name}</h3>

                    <div  className='block absolute bottom-0 '>
                    <span className='text-gray-400 text-xs text-left'>Location</span>
                  <span className='ml-2'>  <Chip size="sm" value={campus.location.toUpperCase()} variant="gradient"/> </span>
                    </div>
                  </div>
                </Link>
              </aside>
            ))}
          </Suspense>
          <ToastContainer />
        </section>
    
    </>
  );
}
