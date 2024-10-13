import { useEffect, useMemo, useState } from "react";
import AppHeader from "./AppHeader";
import { Member } from "../helpers/types";
import { useFetchData } from "../hooks/useFetchData";
import {
   addMember,
   deleteMember,
   editMember,
   getMembers,
} from "../helpers/apis";
import TableTree, {
   Cell,
   Header,
   Headers,
   Row,
   Rows,
} from "@atlaskit/table-tree";
import { Box, xcss } from "@atlaskit/primitives";
import Button from "@atlaskit/button/new";
import Modal from "./Modal";
import AddEditMemberForm from "./AddEditMemberForm";
import { APIStatus } from "../helpers/constants";
import { useFlagMethods } from "../hooks/usrFlagMethods";
import { getAxiosError } from "../helpers/utils";

const Members = () => {
   const [editingMember, setEditingMember] = useState<Member>({} as Member);
   const [showAddEditModal, setShowAddEditModal] = useState<boolean>(false);
   const [apiStatus, setAPIStatus] = useState<APIStatus>(APIStatus.IDLE);

   const { data, fetchData } = useFetchData<Member>(getMembers);
   const { showErrorFlag } = useFlagMethods();

   const isEditingMember = useMemo(
      () => Object.values(editingMember).length > 0,
      [editingMember]
   );

   const openAddEditModal = () => {
      setShowAddEditModal(true);
   };

   const onCloseAddEditModal = () => {
      setEditingMember({} as Member);
      setShowAddEditModal(false);
   };

   const onSubmitAddEditMember = async (member: Member) => {
      setAPIStatus(APIStatus.LOADING);
      try {
         if (isEditingMember) await editMember(editingMember.id, member);
         else await addMember(member);
         setAPIStatus(APIStatus.IDLE);
         fetchData();
         onCloseAddEditModal();
      } catch (error) {
         let errorMessage = getAxiosError(error, "Unable to add/edit member");
         showErrorFlag(errorMessage);
         setAPIStatus(APIStatus.FAILED);
      }
   };

   const handleEditMember = (member: Member) => {
      setEditingMember(member);
      setShowAddEditModal(true);
   };

   const handleDeleteMember = async (id: string) => {
      await deleteMember(id);
      fetchData();
   };

   const onSearch = (searchText: string) => {
      fetchData(searchText);
   };

   useEffect(() => {
      fetchData();
   }, []);

   const actions = useMemo(
      () => [{ label: "Add member", onClick: openAddEditModal }],
      []
   );

   const membersTableData = useMemo(
      () =>
         data.map((member) => ({
            id: member.id.toString(),
            content: { ...member },
            hasChildren: false,
         })),
      [data]
   );

   return (
      <>
         <AppHeader onSearch={onSearch} actions={actions} />
         <TableTree>
            <Headers>
               <Header width={100}>Id</Header>
               <Header width={200}>Name</Header>
               <Header width={300}>Email</Header>
               <Header width={150}>Phone number</Header>
               <Header width={150}>Debt</Header>
               <Header width={200} />
            </Headers>
            <Rows
               items={membersTableData}
               render={({ id, content }) => {
                  const { name, email, phone_number, debt } = content;
                  return (
                     <Row itemId={id} items={null}>
                        <Cell width={100}>{id.toString()}</Cell>
                        <Cell width={200}>{name}</Cell>
                        <Cell width={300}>{email}</Cell>
                        <Cell width={150}>{phone_number}</Cell>
                        <Cell width={150}>{debt.toString()}</Cell>
                        <Cell width={200}>
                           <Box
                              xcss={xcss({ display: "flex", gap: "space.100" })}
                           >
                              <Button onClick={() => handleEditMember(content)}>
                                 Edit
                              </Button>
                              <Button
                                 appearance="danger"
                                 onClick={() => handleDeleteMember(id)}
                              >
                                 Delete
                              </Button>
                           </Box>
                        </Cell>
                     </Row>
                  );
               }}
            />
         </TableTree>

         <Modal
            open={showAddEditModal}
            onClose={onCloseAddEditModal}
            title={isEditingMember ? "Edit member" : "Add member"}
         >
            <AddEditMemberForm
               member={editingMember}
               onCancel={onCloseAddEditModal}
               onSubmit={onSubmitAddEditMember}
               apiInProgress={apiStatus === APIStatus.LOADING}
            />
         </Modal>
      </>
   );
};

export default Members;
