import { useState } from "react";
import { getIncidents } from "../services/incident.service";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useIncidents = () => {
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(1);

  const queryKey = ["incidents", rowsPerPage, page];

  const {
    data: incidentsData,
    error,
    isLoading,
    isFetching,
    isRefetching,
    refetch: refetchIncidents,
  } = useQuery({
    queryKey,
    queryFn: async () => {
      return await getIncidents(page, rowsPerPage);
    },
    gcTime: 0,
    staleTime: 0,
    placeholderData: keepPreviousData,
  });

  const totalCount = incidentsData?.body?.totalIncidents ?? 0;
  const totalPages = incidentsData?.body?.total_pages ?? 10;

  const hasNextPage = page < totalPages;
  const hasPreviousPage = page > 1;

  const goToNextPage = () => {
    if (!hasNextPage) return;
    setPage((prev) => prev + 1);
  };

  const goToPreviousPage = () => {
    if (!hasPreviousPage) return;
    setPage((prev) => prev - 1);
  };

  const goToFirstPage = () => {
    setPage(1);
  };

  const goToLastPage = () => {
    setPage(totalPages);
  };

  const setRowsPerPageHandler = (value) => {
    setPage(1);
    setRowsPerPage(value || 10);
  };

  return {
    page,
    totalCount,
    rowsPerPage,
    hasNextPage,
    goToNextPage,
    goToLastPage,
    goToFirstPage,
    hasPreviousPage,
    goToPreviousPage,
    isLoading: isLoading || isFetching || isRefetching || error,

    refetch: refetchIncidents,
    incidents: incidentsData?.body?.incidents ?? [],
    setRowsPerPage: setRowsPerPageHandler,
  };
};
