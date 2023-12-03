'use client'
import { Suspense, useCallback, useEffect, useMemo, useState } from 'react';
import { DataTable } from './data-table';
import Loading from '@/components/ui/Cloading';
import { DataTablePagination } from './tablePagination';
import { formatTime, getAllPrograms } from '@/lib/functions';
import { generateDynamicColumns } from './generateColumn';
import { programsColumnConfig } from '@/constants/columnUtils';
import { useReactTable } from '@tanstack/react-table';




const Programs = ({ title }) => {
  const [programs, setProgram] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true)
  const [pageInfo, setPageInfo] = useState({
    currentPage: 0,
    pageCount: 0,
    pageSize: 10
  });


  useEffect(() => {
    // Fetch Program for the current page
    const fetchProgram = async () => {
      const { data, total_pages } = await getAllPrograms({ currentPage: pageInfo.currentPage + 1, perPage: pageInfo.pageSize, setLoading });
      setProgram(data.map(program => ({
        ...program,
        timePosted: formatTime(program.$createdAt),
        id: program.$id
      })))
      setPageInfo(prevState => ({
        ...prevState,
        pageCount: Math.ceil(total_pages)

      }));
    };
    fetchProgram();
  }, [pageInfo.currentPage, pageInfo.pageSize])




  const programColumns = generateDynamicColumns(programsColumnConfig,title)
  // const tableOptions = {
  //   data: programs as [],
  //   columns: programColumns,
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





  return (
    <>
      <Suspense fallback={<Loading />}>
        <DataTable columns={programColumns} data={programs}pageInfo={pageInfo} title={title}  setPageInfo={setPageInfo}/>
      </Suspense>

      {/* <DataTablePagination table={tableInstance} onPageSizeChange={updatePageSize} /> */}
    
    
    
    
      {/* <Pagination
        activePage={pageInfo.currentPage}
        pageCount={pageInfo.pageCount}
        onPageChange={changePage}
      /> */}



    </>
  );
};

export default Programs;
