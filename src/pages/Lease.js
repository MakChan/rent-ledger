import React from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import styled from "styled-components";

import PaymentsChart from "../components/PaymentsChart";
import PaymentsTable from "../components/PaymentsTable";

import { Loader } from "../components/Loader";
import { LEASE_WITH_PAYMENTS } from "../utils/queries";

import EditLease from "../components/EditLease";

const Box = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
`;

const ViewLease = ({ lease }) => (
  <>
    <PaymentsTable payments={lease.payments} rent={lease.rent} />
    <PaymentsChart payments={lease.payments} />
  </>
);

function Lease({ match }) {
  const { loading, data } = useQuery(LEASE_WITH_PAYMENTS, {
    variables: { leaseId: match.params.leaseId }
  });

  const editMatch = useRouteMatch({
    path: `${match.path}/edit`,
    exact: true
  });

  if (loading) return <Loader size="large" />;

  const lease = data.leaseWithPayments;
  return (
    <div style={{ padding: "1rem 2rem" }}>
      <Box>
        <h3 style={{ marginBottom: "1rem", fontWeight: 600 }}>
          {lease.room.roomNo} - {lease.tenant.name}
        </h3>
        {!editMatch && <Link to={`${match.url}/edit`}>Edit</Link>}
      </Box>
      {editMatch ? <EditLease lease={lease} /> : <ViewLease lease={lease} />}
    </div>
  );
}

export default Lease;
