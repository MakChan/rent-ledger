import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import styled from "styled-components";

import PaymentsChart from "../components/PaymentsChart";
import PaymentsTable from "../components/PaymentsTable";

import { Loader } from "../components/Loader";
import { LEASE_WITH_PAYMENTS } from "../utils/queries";

const Box = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
`;

function Lease({ match }) {
  const { loading, data } = useQuery(LEASE_WITH_PAYMENTS, {
    variables: { leaseId: match.params.leaseId }
  });

  if (loading) return <Loader size="large" />;

  const lease = data.leaseWithPayments;

  return (
    <div style={{ padding: "1rem 2rem" }}>
      <Box>
        <h3 style={{ marginBottom: "1rem", fontWeight: 600 }}>
          {lease.room.roomNo} - {lease.tenant.name}
        </h3>
        <Link to={`/edit/lease/${lease.room.roomNo}/${match.params.leaseId}`}>
          Edit
        </Link>
      </Box>
      <PaymentsTable payments={lease.payments} rent={lease.rent} />
      <PaymentsChart payments={lease.payments} />
    </div>
  );
}

export default Lease;
