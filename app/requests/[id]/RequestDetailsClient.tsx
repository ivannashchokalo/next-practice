"use client";

import { deleteRequest, getRequestById } from "@/lib/api/requests";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";

export default function RequestDetailsClient() {
  const { id } = useParams<{ id: string }>();

  const router = useRouter();

  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["request", id],
    queryFn: () => getRequestById(Number(id)),
    refetchOnMount: false,
  });

  const { mutate } = useMutation({
    mutationFn: deleteRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["requests"] });
      router.push("/requests");
    },
  });

  return (
    <>
      {isLoading && <p>Loading, please wait...</p>}
      {isError && <p>Something went wrong.</p>}
      {data && (
        <div>
          <h2>{data.title}</h2>
          <p>{data.body}</p>
          <button onClick={() => mutate(data.id)}>delete</button>
        </div>
      )}
    </>
  );
}
