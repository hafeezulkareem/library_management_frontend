import { ButtonHTMLAttributes } from "react";

export interface ButtonAction extends ButtonHTMLAttributes<HTMLButtonElement> {
   label: string;
}

export interface Book {
   id: number;
   title: string;
   authors: string;
   published_date: string;
   publisher: string;
   rental_fee: string | number;
   available_count: string | number;
}

export interface Member {
   id: number;
   name: string;
   email: string;
   phone_number: string;
   address: string;
   debt: number;
}

export interface Transaction {
   id: number;
   book_id: number;
   member_id: number;
   issued_datetime: string;
   returned_datetime: string;
   overdue_fee: string;
   fee_paid: number;
}

export interface IssueBookPayload {
   book_id: string;
   member_id: string;
}

export interface ReturnBookPayload {
   book_id: string;
   member_id: string;
   fee_paid: string | number;
}
