"use client";

import { RequestItem } from "@/types/request";
import RequestCard from "./RequestCard";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteRequest } from "@/lib/api/requests";

export default function RequestsList({
  requests,
}: {
  requests: RequestItem[];
}) {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: deleteRequest,
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries({ queryKey: ["requests"] });
    },
    onError: (err) => {
      console.log(err);
    },
  });
  const deleteCard = (id: number) => {
    mutate(id);
  };
  return (
    <ul>
      {requests.map((request) => (
        <RequestCard key={request.id} request={request} onDelete={deleteCard} />
      ))}
    </ul>
  );
}
