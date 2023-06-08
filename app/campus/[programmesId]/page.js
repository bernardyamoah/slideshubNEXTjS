'use client'
import { useEffect, useState } from 'react';
import { getPrograms } from '@/lib/getProgrammes';
import Link from 'next/link';
import { Suspense } from 'react';
import Image from 'next/image';
export default function ProgrammeList(PRO) {
  const [programs, setPrograms] = useState([]);

  useEffect(() => {
    async function fetchPrograms() {
      try {
        const response = await getPrograms();
        setPrograms(response);
      } catch (error) {
        console.log('Error fetching programs:', error);
      }
    }

    setTimeout(fetchPrograms, 10000);
  }, []);

  return (
    <>
      <main className="card_container">
        <section className="heading-link">
          <h3>programmes</h3>
          <p>
            <Link href="/">home</Link> / courses
          </p>
        </section>

        <section className="container relative mx-auto flex flex-col items-center pb-10">
          <div id="myUL">
            <ul className="md:container max-w-4xl grid sm:grid-cols-2 md:grid-cols-3  gap-8 pb-10">
            <Suspense fallback={<Loading />}>
            {programs.map((program) => (
              
				
              <aside
              key={program.$id}
              className="  relative block shadow-xl backdrop-blur-md transition-all hover:border-emerald-500 dark:hover:border-emerald-500 hover:shadow-emerald-500/10 overflow-hidden duration-300 ease-in-out  border-4 border-gray-200  hover:shadow-xl cursor-pointer dark:border-gray-600 rounded-3xl w-full bg-white dark:bg-transparent"
              >
              <Link className="card_link group" href={`/campus/${program.campusId}/programs/${program.$id}/course`}>
                <div className="card_image_wrapper">
                <img
                  className="card_image group-hover:scale-105"
                  src={program.image}
                  alt={program.name}
                  
                 
                /> 
                
                </div>
                <div className="text_container">
                <h3 className="card_heading">{program.name}</h3>
                <p className="text-sm font-light text-gray-400">{program.description}</p>
                <p className="course-code"><span className='text-gray-400 mr-2 sm:hidden'>Duration:</span> {program.duration}</p>
                </div>
              </Link>
              </aside>
                      
      
                    ))}
            </Suspense>
            </ul>
          </div>
        </section>
      </main>
    </>
  );
}

