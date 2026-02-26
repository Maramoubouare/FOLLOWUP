import { getSuivis, getAllSuivis, deleteSuivi } from "../services/suivi.service";
import { keepPreviousData, useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const useSuivis = (incidentId) => {
  const queryKey = ["suivis", incidentId ? String(incidentId) : null];

  const {
    data: suivisData,
    error,
    isLoading,
    isFetching,
    isRefetching,
    refetch: refetchSuivis,
  } = useQuery({
    queryKey,
    queryFn: async () => {
      return await getSuivis(incidentId);
    },
    enabled: !!incidentId,
    gcTime: 0,
    staleTime: 0,
    placeholderData: keepPreviousData,
  });

  return {
    isLoading: isLoading || isFetching || isRefetching || !!error,
    refetch: refetchSuivis,
    suivis: suivisData?.data ?? [],
    count: suivisData?.count ?? 0,
  };
};

export const useAllSuivis = () => {
  const queryKey = ["suivis", "all"];

  const {
    data: suivisData,
    error,
    isLoading,
    isFetching,
    isRefetching,
    refetch: refetchSuivis,
  } = useQuery({
    queryKey,
    queryFn: async () => {
      return await getAllSuivis();
    },
    gcTime: 0,
    staleTime: 0,
    placeholderData: keepPreviousData,
  });

  return {
    isLoading: isLoading || isFetching || isRefetching || !!error,
    refetch: refetchSuivis,
    suivis: suivisData?.data ?? [],
    count: suivisData?.count ?? 0,
  };
};

export const useDeleteSuivi = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ incidentId, suiviId }) => deleteSuivi(incidentId, suiviId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["suivis"] });
    },
  });
};

