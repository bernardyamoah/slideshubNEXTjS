'use client'
import { useEffect, useState } from 'react';
import {  getProgramsByCampusId } from '@/lib/functions';


import Head from 'next/head';
import { useSearchParams } from 'next/navigation';
import { toast } from 'react-hot-toast';
import EmptyProgram from '@/components/EmptyPrograms';
import ProgramCard from '@/components/ProgramCard';
import { Separator } from '@/components/ui/separator';

// interface Program {
//   $id: string;
//   campusId: string;
//   image: string;
//   name: string;
//   description: string;
//   duration: string;
//   $createdAt: string;
// }

export const dynamic = 'force-dynamic';

export default async function ProgrammeList() {
 
  const searchParams = useSearchParams()
  const query = searchParams?.get('campus');
  const campus= JSON.parse(query);
  const [programs, setPrograms] = useState([]);

  useEffect(() => {
    const fetchPrograms = async () => {
      const result = await toast.promise(getProgramsByCampusId(campus.$id),{
        loading: `Loading ${campus.name} programs`,
        success: `Successfully loaded ${campus.name} programs`,
        error: `Failed to load ${campus.name} programs`,
      });
      setPrograms(result);
    };

    fetchPrograms();
  }, [campus.$id]); // Only re-run the effect if campus.$id changes

   console.log("🚀 ~ file: page.jsx:31 ~ programs ~ programs:", programs)
 
  const mainClassName = programs.length > 0 ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 " : "grid-cols-1 ";
  
  const pageTitle = campus ? `${campus.name},${campus.location} Programs` : "Programs";


  const pageDescription = campus
    ? `Browse programs available at ${campus.name},${campus.location} campus.`
    : "Browse all available programs.";

  return (

    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
      </Head>


      <main className='px-6 pt-8 mx-auto space-y-4 max-w-7xl lg:px-8 '>


        
        <div className=" max-w-2xl mx-auto lg:mx-0 ">
        <h2 className="text-3xl font-bold tracking-tight text-transparent dark:text-zinc-100 sm:text-4xl xl:text-6xl/none bg-clip-text dark:bg-gradient-to-r dark:from-zinc-300 dark:to-zinc-600 bg-gradient-to-r from-zinc-950 to-zinc-700 ">  {campus.name},{campus.location} 
        </h2>
       <p className="mt-4 text-zinc-400">
        
        </p> 
      </div>
      <Separator/>

        <section className="relative flex flex-col items-center px-4 pt-20 pb-10 mx-auto">
          <div>
           
           {programs.length> 0 ? ( // Check the length of filteredPrograms instead of programs
              <div className={`mx-auto max-w-7xl grid gap-8   auto-rows-max ${mainClassName}`}>
                {programs.map((program) => (
                  <ProgramCard key={program.$id} {...program} />
                ))}
              </div>
            ) : (
              <div className="flex justify-center w-full">
                <EmptyProgram />
              </div>
            )}
          </div>

        </section>
      

      </main>
    </>
  );
}
