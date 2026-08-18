"use client";

import RequestsList from "@/components/RequestsList/RequestsList";
import { getRequests } from "@/lib/api/requests";
import { useFavoritesStore } from "@/lib/store/favoritesStore";
import { useQuery } from "@tanstack/react-query";

export default function Favorites() {
  const { favorites } = useFavoritesStore();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["requests"],
    queryFn: getRequests,
  });
  let favReq;

  if (data) {
    favReq = data.filter(({ id }) => {
      return favorites.some((favId) => favId === id);
    });
  }

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error!</p>}
      {favReq && !isLoading && !isError && favReq.length > 0 ? (
        <RequestsList requests={favReq} />
      ) : (
        <p>No favorites</p>
      )}
    </>
  );
}
