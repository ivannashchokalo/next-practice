import { getRequestById } from "@/lib/api/requests";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import RequestDetailsClient from "./RequestDetailsClient";

export default async function RequestDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["request", id],
    queryFn: () => getRequestById(Number(id)),
  });
  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <RequestDetailsClient />
      </HydrationBoundary>
    </>
  );
}
