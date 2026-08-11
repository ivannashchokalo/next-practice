import { getRequests } from "@/lib/api/requests";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import RequestsPageClient from "./RequestsPageClient";

export default async function Requests() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["requests"],
    queryFn: getRequests,
  });

  return (
    <section>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <RequestsPageClient />
      </HydrationBoundary>
    </section>
  );
}
