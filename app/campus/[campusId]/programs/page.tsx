'use client'
import { useEffect, useState } from 'react';
import { getPrograms, getProgramName } from '@/lib/functions';
import Link from 'next/link';
import Loading from '../../../../components/ui/Cloading';
import { Suspense } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';

interface Program {
  $id: string;
  campusId: string;
  image: string;
  name: string;
  description: string;
  duration: string;
}

export const dynamic = 'force-dynamic';

export default function ProgrammeList() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const searchParams = useSearchParams();
  const campusId = searchParams?.get('campusId');
  const campusinfo = searchParams?.get('name');
  const campusLocation = searchParams?.get('loc');

  useEffect(() => {
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

    fetchPrograms();
  }, [campusId, campusLocation, campusinfo]);

  const filteredPrograms = programs.filter((program) => program.campusId === campusId);

  return (
    <>
      <main className="card_container">
        
<div
  className="min-h-44 overflow-hidden bg-[url('https://images.unsplash.com/photo-1562157873-818bc0726f68?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=654&q=80')] bg-cover bg-top bg-no-repeat"
>
  <div className="bg-black/60 p-8 md:p-12 lg:px-16 lg:py-24">
    <div className="text-center ltr:sm:text-left rtl:sm:text-right">
      <h2 className="text-2xl font-bold text-white sm:text-3xl md:text-5xl">
      {campusinfo} - {campusLocation}
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
          <h3>Programmes</h3>
          <p>
            <Link href="/">home</Link> / <Link href={`/campus/`}>Campus</Link> / Programs
          </p>
        </section> */}
        <h3>Programmes</h3>
        <div className=" relative mx-auto flex flex-col items-center pb-10 px-2">
          <div id="myUL">
            {isLoading ? (
              <Loading />
            ) : (
              <ul className="md:container max-w-4xl grid sm:grid-cols-2 md:grid-cols-3 gap-8 pb-10">
                <Suspense fallback={<Loading />}>
                  {filteredPrograms.length > 0 ? (
                    filteredPrograms.map((program) => (
                      <aside
                        key={program.$id}
                        className="relative block shadow-xl backdrop-blur-md transition-all hover:border-emerald-500 dark:hover:border-emerald-500 hover:shadow-emerald-500/10 overflow-hidden duration-300 ease-in-out border-4 border-gray-200 hover:shadow-xl cursor-pointer dark:border-gray-600 rounded-3xl w-full bg-white dark:bg-transparent"
                      >
                        <Link
                          href={{
                            pathname: `/campus/${campusId}/programs/${program.$id}`,
                            query: { programId: program.$id, campusId: campusId, name: program.name },
                          }}
                          shallow
                          passHref
                          className="card_link group"
                        >
                          <div className="card_image_wrapper">
                            <Image
                              className="card_image group-hover:scale-105"
                              src={program.image}
                              alt={program.name}
                              fill
                            />
                          </div>
                          <div className="text_container">
                            <h3 className="card_heading">{program.name}</h3>
                            <p className="text-sm font-light text-gray-400">{program.description}</p>
                            <p className="course-code">
                              <span className="text-gray-400 mr-2 sm:hidden">Duration:</span> {program.duration}
                            </p>
                          </div>
                        </Link>
                      </aside>
                    ))
                  ) : (
                    <div className="flex justify-center w-full">
                    <EmptyState/>
                  </div>
                  )}
                </Suspense>
              </ul>
            )}
          </div>
        </div>
        <Toaster />
      </main>
    </>
  );
}
