import { useEffect, useMemo, useState } from "react";
import AppHeader from "./AppHeader";
import {
   addBook,
   deleteBook,
   editBook,
   getBooks,
   getBooksFromFrappe,
   issueBook,
   returnBook,
} from "../helpers/apis";
import TableTree, {
   Cell,
   Header,
   Headers,
   Row,
   Rows,
} from "@atlaskit/table-tree";
import Button from "@atlaskit/button/new";
import { Box, Flex, xcss } from "@atlaskit/primitives";
import { useFetchData } from "../hooks/useFetchData";
import { Book, IssueBookPayload, ReturnBookPayload } from "../helpers/types";
import Modal from "./Modal";
import AddEditBookForm from "./AddEditBookForm";
import IssueBookForm from "./IssueBookForm";
import ReturnBookForm from "./ReturnBookForm";
import { APIStatus } from "../helpers/constants";
import { format } from "date-fns";
import { useFlagMethods } from "../hooks/usrFlagMethods";
import axios, { AxiosError } from "axios";
import { getAxiosError } from "../helpers/utils";

const Books = () => {
   const [editingBook, setEditingBook] = useState<Book>({} as Book);
   const [showAddEditModal, setShowAddEditModal] = useState<boolean>(false);
   const [showIssueModal, setShowIssueModal] = useState<boolean>(false);
   const [showReturnModal, setShowReturnModal] = useState<boolean>(false);
   const [modalAPIStatus, setModalAPIStatus] = useState<APIStatus>(
      APIStatus.IDLE
   );

   const { showErrorFlag } = useFlagMethods();

   const { data, fetchData } = useFetchData<Book>(getBooks);

   const isEditingBook = useMemo(
      () => Object.values(editingBook).length > 0,
      [editingBook]
   );

   // Books fetching
   const onSearch = (searchText: string) => {
      fetchData(searchText);
   };

   const importBooks = async () => {
      try {
         await getBooksFromFrappe();
         fetchData();
      } catch (error) {
         let errorMessage = getAxiosError(
            error,
            "Error while fetching books from Frappe API"
         );
         showErrorFlag(errorMessage);
      }
   };

   // Add/Edit book
   const openAddEditModal = () => {
      setShowAddEditModal(true);
   };

   const onCloseAddEditModal = () => {
      setEditingBook({} as Book);
      setShowAddEditModal(false);
   };

   const handleEditBook = (book: Book) => {
      setEditingBook(book);
      setShowAddEditModal(true);
   };

   const onSubmitAddEditBook = async (values: Book) => {
      setModalAPIStatus(APIStatus.LOADING);

      const payload = { ...values };
      payload.rental_fee = Number.parseFloat(payload.rental_fee as string);
      payload.available_count = Number.parseFloat(
         payload.available_count as string
      );
      payload.published_date = format(payload.published_date, "dd-MM-yyyy");

      try {
         if (isEditingBook) await editBook(editingBook.id, payload);
         else await addBook(payload);
         setModalAPIStatus(APIStatus.IDLE);
         fetchData();
         onCloseAddEditModal();
      } catch (error) {
         let errorMessage = getAxiosError(error, "Unable to add/edit book");
         showErrorFlag(errorMessage);
         setModalAPIStatus(APIStatus.FAILED);
      }
   };

   // Issue/Return book
   const openIssueModal = () => {
      setShowIssueModal(true);
   };

   const closeIssueModal = () => {
      setShowIssueModal(false);
   };

   const onSubmitIssueBook = async (values: IssueBookPayload) => {
      setModalAPIStatus(APIStatus.LOADING);
      try {
         await issueBook(values);
         setModalAPIStatus(APIStatus.IDLE);
         closeIssueModal();
      } catch (error) {
         let errorMessage = getAxiosError(error, "Unable to issue book");
         showErrorFlag(errorMessage);
         setModalAPIStatus(APIStatus.FAILED);
      }
   };

   const openReturnModal = () => {
      setShowReturnModal(true);
   };

   const closeReturnModal = () => {
      setShowReturnModal(false);
   };

   const onSubmitReturnBook = async (values: ReturnBookPayload) => {
      setModalAPIStatus(APIStatus.LOADING);
      const payload = { ...values };
      payload.fee_paid = payload.fee_paid
         ? Number.parseFloat(payload.fee_paid as string)
         : 0;
      try {
         await returnBook(payload);
         setModalAPIStatus(APIStatus.IDLE);
         closeReturnModal();
      } catch (error) {
         let errorMessage = getAxiosError(error, "Unable to return book");
         showErrorFlag(errorMessage);
         setModalAPIStatus(APIStatus.FAILED);
      }
   };

   const handleDeleteBook = async (id: string) => {
      await deleteBook(id);
      fetchData();
   };

   useEffect(() => {
      fetchData();
   }, []);

   const actions = useMemo(
      () => [
         { label: "Import books", onClick: importBooks },
         { label: "Add book", onClick: openAddEditModal },
         { label: "Issue book", onClick: openIssueModal },
         { label: "Return book", onClick: openReturnModal },
      ],
      []
   );

   const booksTableData = useMemo(
      () =>
         data.map((book) => ({
            id: book.id.toString(),
            content: { ...book },
            hasChildren: false,
         })),
      [data]
   );

   const modalAPIInProgress = useMemo(
      () => modalAPIStatus === APIStatus.LOADING,
      [modalAPIStatus]
   );

   return (
      <Box xcss={xcss({ width: "100%" })}>
         <AppHeader onSearch={onSearch} actions={actions} />
         <TableTree>
            <Headers>
               <Header width={100}>Id</Header>
               <Header width={300}>Title</Header>
               <Header width={200}>Authors</Header>
               <Header width={150}>Rental fee</Header>
               <Header width={150}>Available count</Header>
               <Header width={200} />
            </Headers>
            <Rows
               items={booksTableData}
               render={({ id, content }) => {
                  const { title, authors, rental_fee, available_count } =
                     content;
                  return (
                     <Row itemId={id} items={null}>
                        <Cell width={100}>{id.toString()}</Cell>
                        <Cell width={300}>{title}</Cell>
                        <Cell width={200}>{authors}</Cell>
                        <Cell width={150}>{rental_fee}</Cell>
                        <Cell width={150}>{available_count}</Cell>
                        <Cell width={200}>
                           <Flex gap="space.100">
                              <Button onClick={() => handleEditBook(content)}>
                                 Edit
                              </Button>
                              <Button
                                 appearance="danger"
                                 onClick={() => handleDeleteBook(id)}
                              >
                                 Delete
                              </Button>
                           </Flex>
                        </Cell>
                     </Row>
                  );
               }}
            />
         </TableTree>

         <Modal
            open={showAddEditModal}
            onClose={onCloseAddEditModal}
            title={isEditingBook ? "Edit book" : "Add book"}
         >
            <AddEditBookForm
               book={editingBook}
               onCancel={onCloseAddEditModal}
               onSubmit={onSubmitAddEditBook}
               apiInProgress={modalAPIInProgress}
            />
         </Modal>

         <Modal
            open={showIssueModal}
            onClose={closeIssueModal}
            title="Issue book"
         >
            <IssueBookForm
               onCancel={closeIssueModal}
               onSubmit={onSubmitIssueBook}
               apiInProgress={modalAPIInProgress}
            />
         </Modal>

         <Modal
            open={showReturnModal}
            onClose={closeReturnModal}
            title="Return book"
         >
            <ReturnBookForm
               onCancel={closeReturnModal}
               onSubmit={onSubmitReturnBook}
               apiInProgress={modalAPIInProgress}
            />
         </Modal>
      </Box>
   );
};

export default Books;
