import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NotesClient from "@/app/notes/filter/[...slug]/Notes.client"; 

interface Props {
  params: Promise<{ tag?: string[] }>;
}

export default async function NotesPage({ params }: Props) {
  const queryClient = new QueryClient();
  
  const resolvedParams = await params;
  const tagUrl = resolvedParams.tag ? resolvedParams.tag[0] : "all";


  await queryClient.prefetchQuery({
    queryKey: ["notes", 1, "", tagUrl],
    queryFn: () => fetchNotes(1, "", 12, tagUrl),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient initialTag={tagUrl} />
    </HydrationBoundary>
  );
}