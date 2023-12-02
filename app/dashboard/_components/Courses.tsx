'use client'
import { Suspense, useCallback, useEffect, useState } from 'react';
import { formatTime, getAllCourses } from '@/lib/functions';
import { motion } from 'framer-motion'
import Pagination from '../../../components/pagination-button';
import { fadeInAnimationVariants } from '@/constants/motion';
import Loading from '@/components/ui/Cloading';
import { DataTable } from '@/app/dashboard/_components/data-table';
import { generateDynamicColumns } from '@/app/dashboard/_components/generateColumn';
import { coursesColumnConfig } from '@/constants/columnUtils';
import { DataTablePagination } from '@/app/dashboard/_components/tablePagination';
import { useReactTable } from '@tanstack/react-table';


const Courses = ({ title }) => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false)
  const [pageInfo, setPageInfo] = useState({
    currentPage: 0,
    pageCount: 0,
    pageSize: 10 // Manage pageSize here
  });


  useEffect(() => {
    // Fetch courses for the current page
    const fetchCourses = async () => {
      const { data, total_pages } = await getAllCourses({ currentPage: pageInfo.currentPage + 1, perPage: pageInfo.pageSize, setLoading });

      setPageInfo(prevState => ({
        ...prevState,
        pageCount: total_pages

      }));


      setCourses(data.map(course => ({
        ...course,
        timePosted: formatTime(course.$createdAt),
        id: course.$id
      })));
    };


    fetchCourses();
  }, [pageInfo.currentPage, pageInfo.pageSize]);




  const changePage = useCallback((page: number) => {
    setPageInfo(prevState => ({
      ...prevState,
      currentPage: page,


    }));
  }, []);


  const courseColumns = generateDynamicColumns(coursesColumnConfig)
  // const tableOptions = {
  //   data: courses as [],
  //   columns: courseColumns,
  //   initialState: { pageIndex: pageInfo.currentPage, pageSize: pageInfo.pageSize },
  //   manualPagination: true,
  //   pageCount: pageInfo.pageCount,
  // };
  // const tableInstance = useReactTable(tableOptions);


  // const updatePageSize = useCallback((newSize: number) => {
  //   setPageInfo(prevState => ({
  //     ...prevState,
  //     currentPage: tableInstance.getState().pagination.pageIndex + 1,
  //     pageSize: newSize
  //   }));
  // }, [tableInstance.getState().pagination.pageIndex,
  // tableInstance.getState().pagination.pageSize]);
  // console.log('Updated = ' + pageInfo.pageSize)

  // useEffect(() => {
  //   setPageInfo(prevState => ({
  //     ...prevState,
  //     currentPage: tableInstance.getState().pagination.pageIndex,
  //     pageSize: tableInstance.getState().pagination.pageSize
  //   }));
  // }, [
  //   tableInstance.getState().pagination.pageIndex,
  //   tableInstance.getState().pagination.pageSize
  // ]);

  return (
    <>

      <Suspense fallback={<Loading />}>
        <DataTable columns={courseColumns} data={courses} pageInfo={pageInfo} title={title}  setPageInfo={setPageInfo} />
      </Suspense>

      {/* <DataTablePagination table={tableInstance} onPageSizeChange={updatePageSize} /> */}
  

    </>
  );
};

export default Courses;
