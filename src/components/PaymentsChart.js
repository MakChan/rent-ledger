import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

function PaymentsChart({ payments }) {
  const data = payments.map(payment => ({
    month: new Intl.DateTimeFormat("en-US", { month: "long" }).format(
      new Date(payment.datePaid)
    ),
    reading: payment.reading,
    electricity: payment.paidElectricityCharges
  }));

  return (
    <LineChart
      width={400}
      height={250}
      data={data}
      margin={{
        left: -20,
        top: 20
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="month" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey="electricity"
        stroke="#8884d8"
        activeDot={{ r: 8 }}
      />
    </LineChart>
  );
}

export default PaymentsChart;
