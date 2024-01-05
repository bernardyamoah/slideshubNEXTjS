"use client";
import { Suspense, useEffect, useState } from "react";
import { formatTime, getAllCourses } from "@/lib/functions";

import Loading from "@/components/ui/Cloading";
import { DataTable } from "@/app/dashboard/_components/data-table";
import { generateDynamicColumns } from "@/app/dashboard/_components/generateColumn";
import { coursesColumnConfig } from "@/constants/columnUtils";
const Courses = ({ title }) => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pageInfo, setPageInfo] = useState({
    currentPage: 0,
    pageCount: 0,
    pageSize: 10, // Manage pageSize here
  });

  useEffect(() => {
    // Fetch courses for the current page
    const fetchCourses = async () => {
      const { data, total_pages } = await getAllCourses({
        currentPage: pageInfo.currentPage + 1,
        perPage: pageInfo.pageSize,
        setLoading,
      });

      setPageInfo((prevState) => ({
        ...prevState,
        pageCount: total_pages,
      }));

      setCourses(
        data.map((course) => ({
          ...course,
          timePosted: formatTime(course.$createdAt),
          id: course.$id,
        })),
      );
    };

    fetchCourses();
  }, [pageInfo.currentPage, pageInfo.pageSize, refresh]);

  const courseColumns = generateDynamicColumns(
    coursesColumnConfig,
    title,
    setRefresh,
  );

  const dataTableProps = {
    columns: courseColumns,
    data: courses,
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

export default Courses;
