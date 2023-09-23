'use client'
import { useEffect, useState } from 'react';
import {  getProgramsByCampusId } from '@/lib/functions';


import Head from 'next/head';
import { useSearchParams } from 'next/navigation';
import { toast } from 'react-hot-toast';
import EmptyProgram from '@/components/EmptyPrograms';
import ProgramCard from '@/components/ProgramCard';
import { Separator } from '@/components/ui/separator';
import Loading from '@/components/ui/Cloading';




export default async function ProgrammeList() {
 
  const searchParams = useSearchParams()
  const query = searchParams?.get('campus');
  const campus= JSON.parse(query);
  
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrograms = async () => {
      const result = await toast.promise(getProgramsByCampusId(campus.$id),{
        loading: `Loading ${campus.name} programs`,
        success: `Successfully loaded ${campus.name} programs`,
        error: `Failed to load ${campus.name} programs`,
      });
      setPrograms(result);
      setLoading(false);
    };

    fetchPrograms();
  }, []); // Only re-run the effect if campus.$id changes

  
  const mainClassName = programs.length > 0 ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 " : "grid-cols-1 ";
  const pageTitle = campus ? `${campus.name},${campus.location} Programs` : "Campus";
  const pageDescription = `Browse programs available at ${campus.name},${campus.location} campus.`
  
  if (loading) {
    return <Loading />;
  }

  return (

    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
      </Head>


    


        
        <div className="max-w-2xl mx-auto lg:mx-0">
        <h2 className="text-3xl font-bold tracking-tight text-transparent dark:text-zinc-100 sm:text-4xl xl:text-6xl/none bg-clip-text dark:bg-gradient-to-r dark:from-zinc-300 dark:to-zinc-600 bg-gradient-to-r from-zinc-950 to-zinc-700 ">  {campus.name},{campus.location} 
        </h2>
       <p className="mt-4 text-zinc-400">
        
        </p> 
      </div>
      <Separator/>

        <section className="relative flex flex-col items-center pt-20 pb-10 mx-auto">
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
      

    </>
  );
}
