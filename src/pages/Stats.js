import React from "react";
import { useQuery } from "@apollo/react-hooks";

import { Loader } from "../components/Loader";

import { GET_ALL_PAYMENTS } from "../utils/queries";

import AllPaymentsChart from "../components/AllPaymentsChart";

function Stats(props) {
  const { loading, data } = useQuery(GET_ALL_PAYMENTS);

  if (loading) return <Loader size="large" />;

  return (
    <>
      <AllPaymentsChart payments={data.allPayments} />
    </>
  );
}

export default Stats;
