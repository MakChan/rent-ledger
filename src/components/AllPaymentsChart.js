import React from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

function AllPaymentsChart(props) {
  const data = props.payments.map(item => {
    const date = new Date(item._id.year, item._id.month);
    item.month = new Intl.DateTimeFormat("en-US", { month: "short" }).format(
      date
    );
    item.electricity = item.totalPaidElectricity;
    item.rent = item.totalPaid - item.totalPaidElectricity;

    return item;
  });

  return (
    <>
      <h4 style={{ marginTop: 20 }}>Total Monthly Payments</h4>
      <BarChart
        width={400}
        height={250}
        data={data}
        margin={{
          top: 30,
          left: -10
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="rent" stackId="a" fill="#8884d8" />
        <Bar dataKey="electricity" stackId="a" fill="#82ca9d" />
      </BarChart>
    </>
  );
}

export default AllPaymentsChart;
