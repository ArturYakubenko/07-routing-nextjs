import {dehydrate, HydrationBoundary,QueryClient} from "@tanstack/react-query";
import  {fetchNoteById}  from "@/app/lib/api";
import NoteDetailsClient from "@/app/@NotePreview/(.)notes/[id]/NoteDetails.client"


interface PreviewProps {
    params: Promise<{id: string}>
}


const Preview = async ({params}: PreviewProps) => {

     const {id} = await params
        const queryClient = new QueryClient()
    
        await queryClient.prefetchQuery({
        queryKey: ["note", id],
        queryFn: () => fetchNoteById(id),
      });
    
        return (
       <HydrationBoundary state={dehydrate(queryClient)}>
          <NoteDetailsClient />
       </HydrationBoundary>
     
        )

}

export default Preview