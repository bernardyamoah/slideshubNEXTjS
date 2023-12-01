'use client'

import { DataTable } from "./data-table"


import {  useCallback, useEffect, useMemo, useState } from 'react';
import { formatTime, getUserSlides } from '@/lib/functions';

import { generateDynamicColumns } from "./generateColumn";
import { slidesColumnConfig } from "@/constants/columnUtils";
import { useReactTable } from "@tanstack/react-table";
import { DataTablePagination } from "./tablePagination";
import Pagination from "@/components/pagination-button";

interface UserProps {
  user: User<any>;
}

export default function Slides({ user }: UserProps) {
  const [slides, setSlides] = useState<any>([]);

  const [pageInfo, setPageInfo] = useState({
    currentPage: 1,
    pageCount: 0,
    pageSize:10
  }); // Default page size
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { totalPages, documents } = await getUserSlides(user.$id, pageInfo.currentPage , setSlides, setLoading);
        setPageInfo(prevState => ({
          ...prevState,
          pageCount: totalPages
        }));
        
        setSlides(documents.map(slide => ({
          ...slide,
          timePosted: formatTime(slide.$createdAt),
          id: slide.$id
        })));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user.$id, pageInfo.currentPage, pageInfo.pageSize]);

  const slideColumns =generateDynamicColumns<UserSlidesCardProps>(slidesColumnConfig)
  
  const tableOptions = {
    data:slides as [],
columns:slideColumns,
    initialState: { pageIndex: pageInfo.currentPage, pageSize: pageInfo.pageSize } ,
    manualPagination: true,
    pageCount: pageInfo.pageCount,
  };
  


  const tableInstance = useReactTable(tableOptions);
  
  // Update page index and page size from the table state
  useEffect(() => {
    setPageInfo(prevState => ({
      ...prevState,
      currentPage: tableInstance.getState().pagination.pageIndex
    }));
    setPageInfo(prevState => ({
      ...prevState,
      pageSize: tableInstance.getState().pagination.pageSize
    }));
  }, [
    tableInstance.getState().pagination.pageIndex,
    tableInstance.getState().pagination.pageSize
  ]);

  const changePage = useCallback((page: number) => {
    setPageInfo(prevState => ({
      ...prevState,
      currentPage: page}));
  }, []);
  return (
    <>

      <DataTable columns={slideColumns} data={slides} pageInfo={ pageInfo} />
      {/* <DataTablePagination table={tableInstance} /> */}
      <Pagination
            activePage={pageInfo.currentPage}
            pageCount={pageInfo.pageCount}
            onPageChange={changePage}
          />
    </>



  )
}