'use client'
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import {  formatUserTime, getAllPrograms, getTotalProgrammesPages } from '@/lib/functions';
import Loading from '@/components/ui/Cloading';
import Pagination from '@/components/pagination-button';

import { Card, CardTitle } from '@/components/ui/card';
import { PresetActions } from './program-preset-actions';







const Programs = () => {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading,setLoading]=useState(false)
const perPage=9
  useEffect(() => {
    // Fetch total number of courses and calculate total pages
    const fetchTotalPrograms = async () => {
      const totalProgram = await getTotalProgrammesPages(currentPage); // Implement getCourses function to fetch total courses
      const totalPages = Math.ceil(totalProgram/ 10); // Assuming 10 courses per page
      setTotalPages(totalPages);
       // Assuming 10 courses per page
      setTotalPages(totalPages);
    };

    fetchTotalPrograms();
  }, []);









  useEffect(() => {
    // Fetch courses for the current page
    const fetchPrograms = async () => {
      
    
      const fetchedPrograms = await getAllPrograms(currentPage,setLoading); // Implement getCourses function to fetch courses with pagination
    
      // Update courses state with fetched courses
      setPrograms(fetchedPrograms );
    };

    fetchPrograms();
  }, [currentPage]);

  const changePage = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);
  const memoizedPrograms = useMemo(() => programs, [programs]);
  return (
    <>
    {loading && <Loading />}
    <aside className= 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  grid mx-auto py-6 gap-8 auto-rows-auto '>
    {memoizedPrograms.map((program) => (
          <Card key={program.$id} className="relative overflow-hidden duration-700 border rounded-xl dark:hover:bg-zinc-800/10 group md:gap-8 hover:border-zinc-400/50 dark:border-zinc-600 ">
          <div className="pointer-events-none">
            <div className="absolute inset-0 z-0  transition duration-1000 [mask-image:linear-gradient(black,transparent)]"></div>
            <div className="absolute inset-0 z-10 transition duration-1000 opacity-100 bg-gradient-to-br via-zinc-100/10 group-hover:opacity-50 card_style"></div>
            <div className="absolute inset-0 z-10 transition duration-1000 opacity-0 mix-blend-overlay group-hover:opacity-100 card_style"></div>
          </div>
          <div>
          
            <article className="p-4 md:p-8">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs duration-1000 text-zinc-500 dark:text-zinc-200 dark:group-hover:text-white dark:group-hover:border-zinc-200 drop-shadow-orange">
                  <time dateTime={program.$createdAt}>{formatUserTime(program.$updatedAt)}
                  
                  </time>
                </span>
                <span className="flex items-center gap-1 text-xs text-zinc-500">
                <PresetActions  id={program.$id} programs={programs} setPrograms={setPrograms}  />
                </span>
              </div>
              <CardTitle className="z-20 mt-2 text-xl font-medium capitalize duration-1000 lg:text-3xl group-hover:text-zinc-800 dark:text-zinc-200 dark:group-hover:text-white font-display">
              {program.name}
              </CardTitle>
  
            </article>
          </div>
        </Card>
        ))}
      </aside>
      {memoizedPrograms.length > 0 && (
             

                <Pagination pageCount={totalPages} activePage={currentPage} onPageChange={changePage}/>
                )}
    </>
  );
};

export default Programs;
