import { getTransactions } from "../helpers/apis";
import { useFetchData } from "../hooks/useFetchData";
import { Transaction } from "../helpers/types";
import { useEffect, useMemo } from "react";
import TableTree, {
   Cell,
   Header,
   Headers,
   Row,
   Rows,
} from "@atlaskit/table-tree";
import { getFormattedDate } from "../helpers/utils";

const Transactions = () => {
   const { data, fetchData } = useFetchData<Transaction>(getTransactions);

   useEffect(() => {
      fetchData();
   }, []);

   const transactionsTableData = useMemo(
      () =>
         data.map((transaction) => ({
            id: transaction.id.toString(),
            content: { ...transaction },
            hasChildren: false,
         })),
      [data]
   );

   return (
      <TableTree>
         <Headers>
            <Header width={100}>Id</Header>
            <Header width={150}>Book id</Header>
            <Header width={150}>Member id</Header>
            <Header width={200}>Issued date</Header>
            <Header width={200}>Returned date</Header>
            <Header width={150}>Overdue fee</Header>
            <Header width={150}>Fee paid</Header>
         </Headers>
         <Rows
            items={transactionsTableData}
            render={({
               id,
               content: {
                  book_id,
                  member_id,
                  issued_datetime,
                  returned_datetime,
                  overdue_fee,
                  fee_paid,
               },
            }) => (
               <Row itemId={id} items={null}>
                  <Cell width={100}>{id.toString()}</Cell>
                  <Cell width={150}>{book_id?.toString() ?? "--"}</Cell>
                  <Cell width={150}>{member_id?.toString() ?? "--"}</Cell>
                  <Cell width={200}>{getFormattedDate(issued_datetime)}</Cell>
                  <Cell width={200}>
                     {returned_datetime
                        ? getFormattedDate(returned_datetime)
                        : "--"}
                  </Cell>
                  <Cell width={150}>{overdue_fee.toString()}</Cell>
                  <Cell width={150}>{fee_paid.toString()}</Cell>
               </Row>
            )}
         />
      </TableTree>
   );
};

export default Transactions;
