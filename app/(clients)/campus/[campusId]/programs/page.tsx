'use client'
import { useEffect, useState } from 'react';
import { getPrograms, getProgramName } from '@/lib/functions';

import Loading from '@/components/ui/Cloading';
import { Suspense } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useSearchParams } from 'next/navigation';

import EmptyProgram from '@/components/EmptyPrograms';
import ProgramCard from '@/components/ProgramCard';
import Image from 'next/image';
import { AspectRatio } from '@/components/ui/aspect-ratio';

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

  useEffect(() => {
    async function fetchPrograms() {
      try {
        // Check if programs are already stored in local state
        const cachedPrograms = localStorage.getItem('programs');
        if (cachedPrograms) {
          setPrograms(JSON.parse(cachedPrograms));
          setIsLoading(false);
        } else {
          const response = await toast.promise(getPrograms(), {
            loading: `Fetching programs from ${campusinfo} - ${campusLocation} database...`,
            success: <b>Successfully fetched programs!</b>,
            error: <b>Could not load campuses.</b>,
          });

          setPrograms(response);
          setIsLoading(false);

          // Cache the fetched programs in local storage
          localStorage.setItem('programs', JSON.stringify(response));
        }
      } catch (error) {
        setIsLoading(false);
      }
    }

    fetchPrograms();
  }, [campusId, campusLocation, campusinfo]);

  const mainClassName = programs.length > 0 ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 " : "grid-cols-1 ";
  const filteredPrograms = programs.filter((program) => program.campusId === campusId);

  return (
    <>
      <main className="card_container">

        <div
          className="h-64 overflow-hidden relative "
        >

          <Image
            src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y2xhc3N8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
            alt='campus image'
            width={500}
            height={400}
            className="rounded-md object-cover w-full h-full absolute -z-10"
          />

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
              <div className={`mx-auto max-w-7xl grid gap-8  p-6  auto-rows-max ${mainClassName}`}>
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
        <Toaster />
      </main>
    </>
  );
}
