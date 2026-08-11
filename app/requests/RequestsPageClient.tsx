"use client";

import RequestsList from "@/components/RequestsList";
import { getRequests } from "@/lib/api/requests";
import { useQuery } from "@tanstack/react-query";

export default function RequestsPageClient() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["requests"],
    queryFn: getRequests,
    refetchOnMount: false,
  });
  return (
    <>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error</p>}
      {data && data.length > 0 && <RequestsList requests={data} />}
    </>
  );
}
