import axios from "axios";
import { Book, Member } from "./types";

const axiosInstance = axios.create({
   baseURL: "http://127.0.0.1:8000/library/api",
});

export const getBooks = (query: string) => {
   let url = "/books/";
   if (query) url += `?q=${query}`;
   return axiosInstance.get(url);
};

export const getBooksFromFrappe = () => {
   return axiosInstance.get("/books/import/");
};

export const addBook = (book: Book) => {
   return axiosInstance.post("/books/", [book]);
};

export const editBook = (bookId: number, book: Book) => {
   return axiosInstance.patch(`/book/${bookId}/`, book);
};

export const deleteBook = (bookId: string) => {
   return axiosInstance.delete(`/book/${bookId}/`);
};

export const issueBook = (payload) => {
   return axiosInstance.post("/transactions/", payload);
};

export const returnBook = (payload) => {
   return axiosInstance.post("/book/return/", payload);
};

export const getMembers = (query: string) => {
   let url = "/members/";
   if (query) url += `?q=${query}`;
   return axiosInstance.get(url);
};

export const addMember = (member: Member) => {
   return axiosInstance.post("/members/", member);
};

export const editMember = (memberId: number, member: Member) => {
   return axiosInstance.patch(`/member/${memberId}/`, member);
};

export const deleteMember = (memberId: string) => {
   return axiosInstance.delete(`/member/${memberId}/`);
};

export const getTransactions = () => {
   return axiosInstance.get("/transactions/");
};
