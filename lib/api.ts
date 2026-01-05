import axios from "axios";
import type { Note, NoteTag } from "@/types/note";

export interface CreateNoteParams {
  title: string;
  content?: string;
  tag: NoteTag;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
const API_URL = "https://notehub-public.goit.study/api/notes";

// Оновлена функція для отримання нотаток
export const fetchNotes = async (page: number, search: string, perPage: number, TagUrl?: string) => {
  try {
    const response = await axios.get<FetchNotesResponse>(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        page: page,
        search: search,
        perPage: perPage,
        ...(TagUrl && TagUrl.toLowerCase() !== "all" ? { tag: TagUrl } : {})
      },
    });
    
    return {
      notes: response.data.notes ?? [],
      totalPages: response.data.totalPages ?? 0,
    };
  } catch (error) {
  
    console.error("Error fetching notes:", error);
    return {
      notes: [],         
      totalPages: 0,      
    };
  }
};

// Функція для видалення нотатки
export const deleteNote = async (id: string): Promise<Note> => {
  try {
    const response = await axios.delete<Note>(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Ошибка при удалении заметки:", error);
    throw error;
  }
};

// Функція для створення нотатки
export const createNote = async (noteData: CreateNoteParams): Promise<Note> => {
  try {
    const response = await axios.post<Note>(API_URL, noteData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Ошибка при создании заметки:", error);
    throw error;
  }
};


// details

export const fetchNoteById = async (id: string): Promise<Note> => {
  const response = await axios.get<Note>(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  if(!response) {
     throw new Error("Failed to fetch note details");
  }
  return response.data
}

