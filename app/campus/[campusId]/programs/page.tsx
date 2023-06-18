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
        <section className="heading-link">
          <h3>Programmes</h3>
          <p>
            <Link href="/">home</Link> / <Link href={`/campus/`}>Campus</Link> / Programs
          </p>
        </section>
        <h1>{campusinfo}-{campusLocation}</h1>
        <section className="container relative mx-auto flex flex-col items-center pb-10">
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
                    <p>No programs available for this campus.</p>
                  )}
                </Suspense>
              </ul>
            )}
          </div>
        </section>
        <Toaster />
      </main>
    </>
  );
}
