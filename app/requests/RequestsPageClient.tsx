"use client";

import RequestsList from "@/components/RequestsList/RequestsList";
import { getRequests } from "@/lib/api/requests";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function RequestsPageClient() {
  const router = useRouter();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["requests"],
    queryFn: getRequests,
    refetchOnMount: false,
  });
  return (
    <>
      <button type="button" onClick={() => router.push("requests/create")}>
        Add request
      </button>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error</p>}
      {data && data.length > 0 && <RequestsList requests={data} />}
    </>
  );
}
