'use client'

import { DataTable } from "./data-table"


import { useCallback, useEffect, useState } from 'react';
import { formatTime, getUserSlides } from '@/lib/functions';

import { generateDynamicColumns } from "./generateColumn";
import { slidesColumnConfig } from "@/constants/columnUtils";

import Pagination from "@/components/pagination-button";

interface UserProps {
  user: User<any>;
  title: string;
}

export default function Slides({ user, title }: UserProps) {
  const [slides, setSlides] = useState<any>([]);

  const [pageInfo, setPageInfo] = useState({
    currentPage: 1,
    pageCount: 0,
    pageSize: 10
  }); // Default page size
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchData = async () => {

      const { total_pages, data } = await getUserSlides({ userId: user.$id, currentPage: pageInfo.currentPage + 1, perPage: pageInfo.pageSize, setLoading });

      setPageInfo(prevState => ({
        ...prevState,
        pageCount: total_pages
      }));

      setSlides(data.map(slide => ({
        ...slide,
        timePosted: formatTime(slide.$createdAt),
        id: slide.$id
      })));
    }

    fetchData();
  }, [user.$id, pageInfo.currentPage, pageInfo.pageSize]);

  const slideColumns = generateDynamicColumns<UserSlidesCardProps>(slidesColumnConfig)

  //   const tableOptions = {
  //     data:slides as [],
  // columns:slideColumns,
  //     initialState: { pageIndex: pageInfo.currentPage, pageSize: pageInfo.pageSize } ,
  //     manualPagination: true,
  //     pageCount: pageInfo.pageCount,
  //   };



  // const tableInstance = useReactTable(tableOptions);

  // Update page index and page size from the table state
  // useEffect(() => {
  //   setPageInfo(prevState => ({
  //     ...prevState,
  //     currentPage: tableInstance.getState().pagination.pageIndex
  //   }));
  //   setPageInfo(prevState => ({
  //     ...prevState,
  //     pageSize: tableInstance.getState().pagination.pageSize
  //   }));
  // }, [
  //   tableInstance.getState().pagination.pageIndex,
  //   tableInstance.getState().pagination.pageSize
  // ]);

  // const changePage = useCallback((page: number) => {
  //   setPageInfo(prevState => ({
  //     ...prevState,
  //     currentPage: page
  //   }));
  // }, []);
  return (
    <>

      <DataTable title={title} columns={slideColumns} data={slides} pageInfo={pageInfo} setPageInfo={setPageInfo} />

      {/* <Pagination
        activePage={pageInfo.currentPage}
        pageCount={pageInfo.pageCount}
        onPageChange={changePage}
      /> */}
    </>



  )
}