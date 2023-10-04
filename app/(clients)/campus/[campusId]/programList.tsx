'use client'
import React, { useEffect, useState } from 'react';

import {  getProgramsByCampusId, successMessage } from '@/lib/functions';
import ProgramCard from '@/components/ProgramCard';
import EmptyProgram from '@/components/EmptyPrograms';
import Loading from '@/components/ui/Cloading';

const ProgramList = ({ campusId }) => {

const [programs, setPrograms] = useState<Program[]>([]);
const [loading, setLoading]=useState(true)
    // Fetch courses based on the programId
    useEffect(() => {
        const fetchPrograms = async () => {
          const result = await getProgramsByCampusId(campusId);
          setPrograms(result);
          setLoading(false);
          successMessage('Programs fetched successfully')
        };
    
        fetchPrograms();
      }, [campusId]); // Only re-run the effect if campus.$id changes
    
      
  if (loading) {
    return <Loading />;
  }
      const mainClassName = programs?.length > 0 ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 " : "grid-cols-1 ";
  return (
    <section className="relative flex flex-col items-center pt-20 pb-10 mx-auto">
          <div>
           
           {programs.length> 0 ? ( 
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
  );
};

export default ProgramList;
