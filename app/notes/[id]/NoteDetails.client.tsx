"use client"

import { useQuery } from "@tanstack/react-query"
import { useParams } from "next/navigation"
import { fetchNoteById } from "@/lib/api"
import Loader from "@/components/Loader/Loader";

const NoteDetailsClient = () => {
    const { id } = useParams()
    const noteId = Array.isArray(id) ? id[0] : id

    const { data: note, isLoading, isError, error } = useQuery({
        queryKey: ["note", noteId],
        queryFn: () => fetchNoteById(noteId ?? ""),
        enabled: !!noteId,
        refetchOnMount: false,
    })

    if (isLoading) {
        return <Loader />
    }

    if (isError) {
        return <p>Could not fetch note details. {error.message}</p>
    }

    if (!note) {
        return <p>Note not found.</p>;
    }

    return (
        <div>
            <h1>{note.title}</h1>
            <div style={{ marginBottom: '10px' }}>
                <span style={{ fontWeight: 'bold' }}>Tag: </span>
                <span>{note.tag}</span>
            </div>
            <div style={{ marginBottom: '10px' }}>
                <span style={{ fontWeight: 'bold' }}>Created at: </span>
                <span>{new Date(note.createdAt).toLocaleString()}</span>
            </div>
            <p>{note.content}</p>
        </div>
    )
}

export default NoteDetailsClient