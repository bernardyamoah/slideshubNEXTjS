'use client'
import { useEffect, useState } from 'react';
import { getPrograms } from '@/lib/functions';

import Loading from '@/components/ui/Cloading';

import toast from 'react-hot-toast';
import { useRouter, useSearchParams } from 'next/navigation';

import EmptyProgram from '@/components/EmptyPrograms';
import ProgramCard from '@/components/ProgramCard';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { ChevronsLeftIcon, ChevronsRightIcon } from 'lucide-react';
import Head from 'next/head';

interface Program {
  $id: string;
  campusId: string;
  image: string;
  name: string;
  description: string;
  duration: string;
  $createdAt: string;
}

export const dynamic = 'force-dynamic';

export default function ProgrammeList() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const searchParams = useSearchParams();
  const campusId = searchParams?.get('campusId');
  const campusinfo = searchParams?.get('name')?.toString();
  const campusLocation = searchParams?.get('loc');
  async function fetchPrograms() {
    try {
      const response = await toast.promise(getPrograms(), {
        loading: `Fetching programs from ${campusinfo} - ${campusLocation} database...`,
        success: <b>Successfully fetched programs!</b>,
        error: <b>Could not load campuses.</b>,
      });

      setPrograms(response);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    fetchPrograms();
   
  }, [campusId]);

  const mainClassName = programs.length > 0 ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 " : "grid-cols-1 ";
  const filteredPrograms = programs.filter((program) => program.campusId === campusId);
  const router = useRouter();
  const pageTitle = campusinfo ? `${campusinfo} Programs` : "Programs";


  const pageDescription = campusinfo
    ? `Browse programs available at ${campusinfo} campus.`
    : "Browse all available programs.";
  return (

    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
      </Head>


      <main className="card_container">

        <div
          className="h-64 overflow-hidden relative "
        >

    
          <div className="bg-black/80 p-4 md:p-10 lg:px-16 lg:py-24 h-full flex items-center justify-center">
            <div className="text-center ltr:sm:text-left rtl:sm:text-right">
              <h2 className="text-xl font-bold text-white md:text-5xl">
                {campusinfo}
              </h2>

              <p
                className=" max-w-lg text-gray-200 dark:text-gray-300 mt-6 md:block text-sm md:text-base md:leading-relaxed text-center mx-auto lg:text-lg"
              >
                Select yor programme to access the course slides
              </p>


            </div>
          </div>
        </div>
        {/* <section className="heading-link">
          <h3>Programmes</h3>
          <p>
            <Link href="/">home</Link> / <Link href={`/campus/`}>Campus</Link> / Programs
          </p>
        </section> */}

        <section className="pt-20 relative mx-auto flex flex-col items-center pb-10 px-4">
          <div id="myUL">
            {isLoading ? (
              <Loading />
            ) : filteredPrograms.length > 0 ? ( // Check the length of filteredPrograms instead of programs
              <div className={`mx-auto max-w-7xl grid gap-8   auto-rows-max ${mainClassName}`}>
                {filteredPrograms.map((program) => (
                  <ProgramCard key={program.$id} programId={program.$id} {...program} timePosted={program.$createdAt} />
                ))}
              </div>
            ) : (
              <div className="flex justify-center w-full">
                <EmptyProgram />
              </div>
            )}
          </div>

        </section>
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
          >
            Go Forward
            <ChevronsRightIcon className="w-4 h-4 mr-2 " aria-hidden="true" />
          </Button>
        </div>

      </main>
    </>
  );
}
