"use client";

import { DataTable } from "./data-table";

import { useCallback, useEffect, useState } from "react";
import { formatTime, getUserSlides } from "@/lib/functions";

import { generateDynamicColumns } from "./generateColumn";
import { slidesColumnConfig } from "@/constants/columnUtils";

interface UserProps {
  user: User<any>;
  title: string;
}

export default function Slides({ user, title }: UserProps) {
  const [slides, setSlides] = useState<any>([]);
  const [refresh, setRefresh] = useState(false);
  const [pageInfo, setPageInfo] = useState({
    currentPage: 0,
    pageCount: 0,
    pageSize: 10,
  }); // Default page size
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { total_pages, data } = await getUserSlides({
        userId: user.$id,
        currentPage: pageInfo.currentPage + 1,
        perPage: pageInfo.pageSize,
        setLoading,
      });

      setPageInfo((prevState) => ({
        ...prevState,
        pageCount: total_pages,
      }));

      setSlides(
        data.map((slide) => ({
          ...slide,
          timePosted: formatTime(slide.$createdAt),
          id: slide.$id,
        })),
      );
    };
    setRefresh(false);

    fetchData();
  }, [pageInfo.currentPage, pageInfo.pageSize, refresh]);

  const slideColumns = generateDynamicColumns<UserSlidesCardProps>(
    slidesColumnConfig,
    title,
    setRefresh,
  );

  const dataTableProps = {
    columns: slideColumns,
    data: slides,
    title: title,
    pageInfo: pageInfo,
    setPageInfo: setPageInfo,
    loading: loading,
  };
  return (
    <>
      <DataTable dataTable={dataTableProps} />
    </>
  );
}
