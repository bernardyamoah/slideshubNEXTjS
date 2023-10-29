'use client'
import { useCallback, useEffect, useMemo, useState } from 'react';

import { formatUserTime, getAllPrograms, getTotalProgrammesPages } from '@/lib/functions';
import Loading from '@/components/ui/Cloading';
import Pagination from '@/components/pagination-button';

import { Card, CardTitle } from '@/components/ui/card';
import { PresetActions } from './program-preset-actions';
import { GraduationCapIcon } from 'lucide-react';
import { fadeInAnimationVariants } from '@/constants/motion';

import { motion } from "framer-motion";





const Programs = () => {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false)
  const perPage = 9
  useEffect(() => {
    // Fetch total number of courses and calculate total pages
    const fetchTotalPrograms = async () => {
      const totalProgram = await getTotalProgrammesPages(currentPage); // Implement getCourses function to fetch total courses
      const totalPages = Math.ceil(totalProgram / 10); // Assuming 10 courses per page
      setTotalPages(totalPages);
      // Assuming 10 courses per page
      setTotalPages(totalPages);
    };

    fetchTotalPrograms();
  }, []);









  useEffect(() => {
    // Fetch courses for the current page
    const fetchPrograms = async () => {


      const fetchedPrograms = await getAllPrograms(currentPage, setLoading); // Implement getCourses function to fetch courses with pagination

      // Update courses state with fetched courses
      setPrograms(fetchedPrograms);
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
      <aside className='grid grid-cols-1 gap-8 py-6 mx-auto sm:grid-cols-2 lg:grid-cols-3 auto-rows-auto '>
        {memoizedPrograms.map((program, index) => (
          <motion.div variants={fadeInAnimationVariants}
            initial='initial'
            whileInView='animate'
            viewport={{
              once: true,
            }}
            custom={index}>
            <Card key={program.$id} className="relative h-full overflow-hidden duration-500 border-2 rounded-xl dark:bg-zinc-900 group md:gap-8 hover:border-zinc-400 dark:border-zinc-600">
              <div className="pointer-events-none">
                <div className="absolute inset-0 z-0  transition duration-1000 [mask-image:linear-gradient(black,transparent)]"></div>
                <div className="absolute inset-0 z-10 transition duration-1000 opacity-100 bg-gradient-to-br via-zinc-100/10 group-hover:opacity-50 card_style"></div>
                <div className="absolute inset-0 z-10 transition duration-1000 opacity-0 mix-blend-overlay group-hover:opacity-100 card_style"></div>
              </div>
              <div>

                <article className="p-4 md:p-8">
                  <div className="flex items-center justify-between gap-2">
                    <span className="flex gap-2 text-xs duration-1000 text-zinc-500 dark:text-zinc-400 dark:group-hover:text-white dark:group-hover:border-zinc-200">
                      <GraduationCapIcon className='w-4 h-4 text-muted-foreground' />
                      {program.duration}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-zinc-500">
                      <PresetActions id={program.$id} programs={programs} setPrograms={setPrograms} />
                    </span>
                  </div>
                  <CardTitle className="z-20 mt-4 text-lg font-medium capitalize duration-1000 lg:text-xl group-hover:text-zinc-800 dark:text-zinc-200 dark:group-hover:text-white font-display">
                    {program.name}
                  </CardTitle>
                  <div className="z-20 flex gap-4 mt-2">

                    <span className="flex gap-2 text-sm duration-1000 text-zinc-400 dark:group-hover:text-zinc-200">
                      Last updated on
                      <time dateTime={program.$createdAt}>{formatUserTime(program.$updatedAt)}
                      </time>

                    </span>
                  </div>
                </article>
              </div>
            </Card>
          </motion.div>
        ))}
      </aside>
      {memoizedPrograms.length > 0 && (


        <Pagination pageCount={totalPages} activePage={currentPage} onPageChange={changePage} />
      )}
    </>
  );
};

export default Programs;
