"use client"; 

import { useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import { fetchNotes } from "@/lib/api";
import type { FetchNotesResponse } from "@/types/note";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import SearchBox from "@/components/SearchBox/SearchBox";
import Loader from "@/components/Loader/Loader";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";
import EmptyState from "@/components/EmptyState/EmptyState";
import css from "@/app/notes/Notes.client.module.css";
import { useParams } from "next/navigation";



const NotesClient = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [debouncedSearch] = useDebounce(search, 500);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);


  const params = useParams()
  
 const tagUrl = Array.isArray(params?.tag) ? params.tag[0] : params?.tag;



  const onSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const { data, isError, isLoading } = useQuery<FetchNotesResponse, Error>({
    queryKey: ["notes", page, debouncedSearch],
    queryFn: () => fetchNotes(page, debouncedSearch, 12, tagUrl),
    placeholderData: keepPreviousData,
  });

  const notes = data?.notes ?? [];
  const pageCount = data?.totalPages ?? 0;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onSearch={onSearch} />
        {pageCount > 1 && (
          <Pagination
            pageCount={pageCount}
            currentPage={page}
            onPageChange={setPage}
          />
        )}
        <button className={css.button} onClick={openModal}>Create</button>
      </header>

      {isLoading && <Loader />}
     {isError && <ErrorMessage  message="Помилка при завантаженні нотаток"/>}
      {!isLoading && notes.length === 0 && <EmptyState />}
      {notes.length > 0 && <NoteList data={notes} />}

      {modalIsOpen && (
        <Modal closeModal={closeModal}>
          <NoteForm closeModal={closeModal} />
        </Modal>
      )}
    </div>
  );
}

export default NotesClient