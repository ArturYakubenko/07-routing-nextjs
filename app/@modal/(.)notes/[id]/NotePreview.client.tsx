"use client"

import { useQuery } from "@tanstack/react-query"
import { useParams, useRouter } from "next/navigation"
import {fetchNoteById} from "@/lib/api"
import Loader from "@/components/Loader/Loader"; 
import Modal from "@/components/Modal/Modal";
import css from "@/app/@modal/(.)notes/[id]/NotePreview.module.css"


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
        refetchOnMount: false 
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
            <div className={css.content}>
                <h1>{note.title}</h1>
                
                <div className={css.meta}>
                    <span className={css.tag}>Tag: {note.tag}</span>
                    <span className={css.date}>
                        Created: {new Date(note.createdAt).toLocaleDateString()}
                    </span>
                </div>

                <p className={css.description}>{note.content}</p>

                <button 
                    type="button" 
                    onClick={handleClose} 
                    className={css.closeButton}
                >
                    Close Details
                </button>
            </div>
        </Modal>
        
    </div>
   )    
}

export default NoteDetailsClient