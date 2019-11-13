import React from "react";
import { DynamicTableStateless } from "@atlaskit/dynamic-table";

const head = {
  cells: [
    {
      key: "name",
      content: "Rent"
    },
    {
      key: "reading",
      content: "Reading"
    },
    {
      key: "paidElectricityCharges",
      content: "Electricity"
    },
    {
      key: "datePaid",
      content: "Date"
    }
  ]
};

function PaymentsTable({ payments, rent }) {
  const rows = payments.map(payment => ({
    key: payment._id,
    cells: [
      {
        key: "1",
        content: rent
      },
      {
        key: "2",
        content: payment.reading
      },
      {
        key: "3",
        content: payment.paidElectricityCharges
      },
      {
        key: "4",
        content: new Date(payment.datePaid).toLocaleDateString("en-US", {
          day: "numeric",
          month: "short",
          year: "numeric"
        })
      }
    ]
  }));
  return (
    <DynamicTableStateless
      // caption={caption}
      head={head}
      rows={rows}
      // rowsPerPage={10}
      // page={this.state.pageNumber}
      // loadingSpinnerSize="large"

      // isLoading={false}
      // isFixedSize
      // sortKey="term"
      // sortOrder="DESC"
      // onSort={() => console.log("onSort")}
      // onSetPage={() => console.log("onSetPage")}
    />
  );
}

export default PaymentsTable;
