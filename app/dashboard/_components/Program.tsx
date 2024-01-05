"use client";
import { Suspense, useEffect, useState } from "react";
import { DataTable } from "./data-table";
import Loading from "@/components/ui/Cloading";

import { formatTime, getAllPrograms } from "@/lib/functions";
import { generateDynamicColumns } from "./generateColumn";
import { programsColumnConfig } from "@/constants/columnUtils";

const Programs = ({ title }) => {
  const [programs, setProgram] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [pageInfo, setPageInfo] = useState({
    currentPage: 0,
    pageCount: 0,
    pageSize: 10,
  });

  useEffect(() => {
    // Fetch Program for the current page
    const fetchProgram = async () => {
      const { data, total_pages } = await getAllPrograms({
        currentPage: pageInfo.currentPage + 1,
        perPage: pageInfo.pageSize,
        setLoading,
      });
      setProgram(
        data.map((program) => ({
          ...program,
          timePosted: formatTime(program.$createdAt),
          id: program.$id,
        })),
      );
      setPageInfo((prevState) => ({
        ...prevState,
        pageCount: Math.ceil(total_pages),
      }));
    };
    fetchProgram();
  }, [pageInfo.currentPage, pageInfo.pageSize, refresh]);

  const programColumns = generateDynamicColumns(
    programsColumnConfig,
    title,
    setRefresh,
  );
  const dataTableProps = {
    columns: programColumns,
    data: programs,
    title: title,
    pageInfo: pageInfo,
    setPageInfo: setPageInfo,
    loading: loading,
  };

  return (
    <>
      <Suspense fallback={<Loading />}>
        <DataTable dataTable={dataTableProps} />
      </Suspense>
    </>
  );
};

export default Programs;
