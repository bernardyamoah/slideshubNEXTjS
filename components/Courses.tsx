'use client'
import { useCallback, useEffect, useState } from 'react';
import CoursesCard from './allCourses';

import { getAllCourses,  getTotalCourses } from '@/lib/functions';
import {motion} from 'framer-motion'

import { Button } from './ui/button';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import {  ArrowDownIcon,  ArrowUpIcon } from 'lucide-react';
import Pagination from './pagination-button';
import Loading from '@/components/ui/Cloading';
import { fadeInAnimationVariants } from '@/constants/motion';
const Courses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading,setLoading]=useState(false)
  const [sorting, setSorting] = useState('asc');
  const [sortBy, setSortBy] = useState('$createdAt'); // Default sortBy value

  useEffect(() => {
    // Fetch total number of courses and calculate total pages
    const fetchTotalCourses = async () => {
      const totalCourses = await getTotalCourses(); // Implement getCourses function to fetch total courses
      const totalPages = Math.ceil(totalCourses / 10); // Assuming 10 courses per page
      setTotalPages(totalPages);
       // Assuming 10 courses per page
      setTotalPages(totalPages);
    };

    fetchTotalCourses();
  }, [currentPage]);

  useEffect(() => {
    // Fetch courses for the current page
    const fetchCourses = async () => {
      
    
      const fetchedCourses = await getAllCourses(currentPage,setLoading,sorting,sortBy); // Implement getCourses function to fetch courses with pagination
    

      setCourses(fetchedCourses);
    };

    

    fetchCourses();
  }, [currentPage, sorting, sortBy]);
  const toggleSorting = () => {
    const newSorting = sorting === 'asc' ? 'desc' : 'asc';
    setSorting(newSorting);
    };
    
  const changePage = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);
  const handleSortByChange = (selectedValue: string) => {
    setSortBy(selectedValue);
  };

  return (
    <>
  {loading && <Loading />}
    <div className='grid grid-cols-2 gap-4 max-w-fit'>
      <div>
      <Label htmlFor="sortBy" className='mb-2'>Sort By:</Label>
        <Select  onValueChange={handleSortByChange}>
     <SelectTrigger>
       <SelectValue>{sortBy === '$createdAt' ? 'Created At' : 'Updated At'}</SelectValue>
     </SelectTrigger>
     <SelectContent >
       <SelectItem value="$createdAt">Created At</SelectItem>
       <SelectItem value="$updatedAt">Updated At</SelectItem>
     </SelectContent>
   </Select>
      </div>
      <div className='grid space-y-2'>
        <Label>Date</Label>
      <Button variant='outline' size='sm' className='w-fit'  onClick={toggleSorting}>
    {sorting === 'asc' ? <ArrowUpIcon className='w-4 h-4 rounded-md text-foreground-muted' /> : <ArrowDownIcon  className='w-4 h-4 rounded-md text-foreground-muted' />}
</Button>
      </div>
      </div>
   
    <aside className= 'grid grid-cols-1 gap-8 py-6 mx-auto sm:grid-cols-2 lg:grid-cols-3 auto-rows-auto '>
      {courses.map((course, index) => (
        <motion.div   variants={fadeInAnimationVariants}
        initial='initial'
        whileInView='animate'
        viewport={{
          once: true,
        }}
        custom={index}>
           <CoursesCard key={course.$id} course={course} courses={courses} setCourses={setCourses}/>
      </motion.div>
      ))}
      </aside>
      {courses.length > 0 && (
                  <Pagination
                    pageCount={totalPages}
                    activePage={currentPage}
                    onPageChange={changePage}
                  />
                )}
    </>
  );
};


export default Courses;
