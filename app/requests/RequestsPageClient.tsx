"use client";

import RequestsList from "@/components/RequestsList/RequestsList";
import SearchForm from "@/components/SearchForm/SearchForm";
import { getRequests } from "@/lib/api/requests";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RequestsPageClient() {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["requests"],
    queryFn: getRequests,
    refetchOnMount: false,
  });

  const searchedData = data?.filter(
    ({ title, body }) =>
      title.toLowerCase().includes(search.toLowerCase()) ||
      body.toLowerCase().includes(search.toLowerCase()),
  );

  console.log(searchedData);

  return (
    <>
      <button type="button" onClick={() => router.push("requests/create")}>
        Add request
      </button>
      <SearchForm onSearch={setSearch} />
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error</p>}
      {searchedData && searchedData.length > 0 && (
        <RequestsList requests={searchedData} />
      )}
    </>
  );
}
