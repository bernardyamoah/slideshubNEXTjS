import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import React, { Suspense, useCallback, useEffect, useState } from 'react'
import { generateDynamicColumns } from './generateColumn';
import { booksColumnConfig } from '@/constants/columnUtils';
import { formatTime, getAllBooks } from '@/lib/functions';
import { DataTable } from './data-table';
import { DataTablePagination } from './tablePagination';
import Loading from '../loading';

export default function Books({ title }) {
    const [books, setBooks] = useState<BooksData[]>([]);
    const [loading, setLoading] = useState(true)
    const [pageInfo, setPageInfo] = useState({
        currentPage: 0,
        pageCount: 0,
        pageSize: 10
    });


    useEffect(() => {
        // Fetch Program for the current page
        const fetchProgram = async () => {
            const { data, total_pages } = await getAllBooks({ currentPage: pageInfo.currentPage + 1, perPage: pageInfo.pageSize, setLoading });
            setBooks(data.map(book => ({
                ...book,
                timePosted: formatTime(book.$createdAt),
                id: book.$id
            })))
            setPageInfo(prevState => ({
                ...prevState,
                pageCount: Math.ceil(total_pages)

            }));
        };
        fetchProgram();
    }, [pageInfo.currentPage, pageInfo.pageSize])




    const bookColumns = generateDynamicColumns(booksColumnConfig,title)
    
    const dataTableProps = {
        columns: bookColumns,
        data: books,
        title: title,
        pageInfo: pageInfo,
        setPageInfo: setPageInfo,
        loading:loading,
      };

    return (
        <>

            <Suspense fallback={<Loading />}>
                <DataTable dataTable={dataTableProps}/>
            </Suspense>

            
        </>
    )
}

