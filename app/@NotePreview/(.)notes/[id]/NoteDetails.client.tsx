"use client"

import { useQuery } from "@tanstack/react-query"
import { useParams, useRouter } from "next/navigation"
import {fetchNoteById} from "@/app/lib/api"
import Loader from "@/components/Loader/Loader"; 
import Modal from "@/components/Modal/Modal";


const NoteDetailsClient = () => {
    const {id} = useParams()
    const noteId = Array.isArray(id) ? id[0] : id


     const router = useRouter();
      const handleClose = () => {
        router.back(); 
    };

    const {data: note, isLoading, isError, error} = useQuery({
       queryKey: ["note", noteId],
        queryFn: () => fetchNoteById(noteId as string),
        enabled: !!noteId,   
    })
    if(isLoading) {
        return (
            <Loader/>
        )
    }
    if(isError) {
        return (
            <p>Could not fetch note details. {error.message}</p>
        )
    }

    if (!note) {
    return <p>Note not found.</p>;
    }


   return (
    
    <div>
        <Modal closeModal={handleClose}>
            <h1>{note.title}</h1>
            <p>{note.content}</p>
        </Modal>
        
    </div>
   )    
}

export default NoteDetailsClient