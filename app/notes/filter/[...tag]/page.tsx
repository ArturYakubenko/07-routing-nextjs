"use client"; 

import { useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import { fetchNotes } from "@/app/lib/api";
import type { FetchNotesResponse } from "@/app/types/note";
import Modal from "@/app/components/Modal/Modal";
import NoteForm from "@/app/components/NoteForm/NoteForm";
import NoteList from "@/app/components/NoteList/NoteList";
import Pagination from "@/app/components/Pagination/Pagination";
import SearchBox from "@/app/components/SearchBox/SearchBox";
import Loader from "@/app/components/Loader/Loader";
import ErrorMessage from "@/app/components/ErrorMessage/ErrorMessage";
import EmptyState from "@/app/components/EmptyState/EmptyState";
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
  
  const tagUrl = params.tag[0] 



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
      {isError && <ErrorMessage message="Помилка при завантаженні нотаток" />}
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