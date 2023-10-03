'use client'
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import CoursesCard from './allCourses';
import PaginationComponent from './PaginationComponent';
import { getAllCourses,  getTotalCourses } from '@/lib/functions';
import Loading from './ui/Cloading';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ArrowDown, ArrowDownIcon, ArrowUp, ArrowUpIcon } from 'lucide-react';





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
    
      // Update courses state with fetched courses
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
  const memoizedCourses = useMemo(() => courses, [courses]);
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
      {courses.map((course) => (
       <CoursesCard key={course.$id} course={course} courses={courses} setCourses={setCourses}/>
      ))}
      </aside>
      {memoizedCourses.length > 0 && (
                  <PaginationComponent
                    pageCount={totalPages}
                    activePage={currentPage}
                    onPageChange={changePage}
                  />
                )}
    </>
  );
};
const MemoizedCourses = memo(Courses);

export default MemoizedCourses;
