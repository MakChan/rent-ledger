import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { DynamicTableStateless as Table } from "@atlaskit/dynamic-table";

import { LEASE_WITH_PAYMENTS } from "../utils/queries";

import { Loader } from "../components/Loader";

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

function Lease({ match }) {
  const { loading, data } = useQuery(LEASE_WITH_PAYMENTS, {
    variables: { leaseId: match.params.leaseId }
  });

  if (loading) return <Loader size="large" />;

  const lease = data.leaseWithPayments;

  const rows = lease.payments.map((payment, index) => ({
    key: payment._id,
    cells: [
      {
        key: "1",
        content: lease.rent
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
    <div style={{ padding: "1rem 2rem" }}>
      <h3 style={{ marginBottom: "1rem" }}>
        {lease.room.roomNo} - {lease.tenant.name}
      </h3>

      <Table
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
    </div>
  );
}

export default Lease;
