import React from "react";
import Button from "@atlaskit/button";
import { FormFooter } from "@atlaskit/form";
import { Form, Field } from "react-final-form";

import { Field as AtlasField } from "@atlaskit/form";
import TextArea from "@atlaskit/textarea";
import TextField from "@atlaskit/textfield";
import { Checkbox } from "@atlaskit/checkbox";
import Select from "@atlaskit/select";
import { DatePicker } from "@atlaskit/datetime-picker";
import Spinner from "@atlaskit/spinner";
import CheckCircleOutlineIcon from "@atlaskit/icon/glyph/check-circle-outline";

import styled from "styled-components";

import { useQuery, useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

import { useAuthContext } from "../utils/authContext";
import { GET_CURRENT_LEASES } from "../utils/queries";
import { PER_UNIT_CHARGE } from "../utils/constants";

import createDecorator from "final-form-calculate";

const Wrapper = styled.div`
  text-align: center;
  margin-top: 2rem;
`;

const StyledDiv = styled.div`
  margin: 1.25rem 0;
  font-size: 1rem;

  span {
    font-size: 1.2rem;
  }
`;

const Balance = styled.span`
  font-size: 1.5rem;
  color: ${props => (props.value >= 0 ? "#00b700" : "palevioletred")};
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 0 -0.25rem;

  & > div {
    flex: 1 1 0;
    padding: 0.25rem;
  }

  @media (max-width: 576px) {
    flex-direction: column;
  }
`;

const ADD_PAYMENT = gql`
  mutation createPayment($payment: PaymentInput!, $leaseId: String!) {
    createPayment(payment: $payment, leaseId: $leaseId) {
      _id
    }
  }
`;

const calculateElectricity = (reading, lease) => {
  let charges = 0;
  // if (!lease.lastPayment && !lease.lastPayment.reading)
  if (!lease.lastPayment)
    charges = (reading - lease.initialReading) * PER_UNIT_CHARGE;
  else charges = (reading - lease.lastPayment.reading) * PER_UNIT_CHARGE;
  return charges > 0 ? charges : 0;
};

const calculator = createDecorator(
  {
    field: ["lease", "payment.reading"],
    updates: (reading, name, values, prev) => {
      if (!values.lease) return {};

      let charges = 0;
      let totalRent = 0;

      if (name === "lease") {
        totalRent = reading.value.rent;
        if (values.payment.reading)
          charges = calculateElectricity(
            values.payment.reading,
            values.lease.value
          );
      } else charges = calculateElectricity(reading, values.lease.value);

      const balance =
        values.lease.value.lastPayment &&
        (values.lease.value.lastPayment.balance
          ? values.lease.value.lastPayment.balance
          : 0);

      const extraCharges = values.lease.value.extraCharges
        ? values.lease.value.extraCharges
        : 0;
      totalRent = values.lease.value.rent + charges + balance + extraCharges;
      return {
        "payment.electricityCharges": charges,
        totalRent: totalRent
      };
    }
  },
  {
    field: ["payment.totalPaid", "payment.reading"],
    updates: (reading, name, values, prev) => {
      if (name === "payment.reading" && !values.payment.totalPaid) return {};
      return {
        "payment.balance": values.payment.totalPaid - values.totalRent
      };
    }
  }
);

const AddTenant = () => {
  //   const { userState } = useAuthContext();

  const { data, loading } = useQuery(GET_CURRENT_LEASES);

  const [addPayment, { data: paymentData }] = useMutation(ADD_PAYMENT, {
    onCompleted: data => {
      console.log("data", data);
      // Redirect to the room page
      // Update cache
      //   setUser(data.logIn);
      //   history.push("/");
    }
  });

  if (loading)
    return (
      <Wrapper>
        <Spinner size="large" />
      </Wrapper>
    );

  const options = data.currentLeases.map(lease => ({
    label: `${lease.room.roomNo} - ${lease.tenant.name}`,
    value: lease
  }));

  const date = new Date();

  const handleSubmit = data => {
    const leaseId = data.lease.value._id;
    let payment = { ...data.payment };
    payment.datePaid = new Date(data.payment.datePaid);
    payment.reading = payment.reading
      ? payment.reading
      : data.lease.value.lastPayment.reading
      ? data.lease.value.lastPayment.reading
      : data.lease.value.initialRading;
    if (payment.balanceIsElectricity) {
      payment.paidElectricityCharges = payment.balance;
      payment.balance = 0;
    } else {
      payment.paidElectricityCharges = payment.electricityCharges;
    }
    addPayment({ variables: { leaseId, payment } });
  };

  if (paymentData)
    return (
      <Wrapper>
        <CheckCircleOutlineIcon size="xlarge" primaryColor="green" />
        <div>Saved</div>
      </Wrapper>
    );

  return (
    <div style={{ padding: "1rem 2rem" }}>
      <h3>Accept Payment</h3>
      <Form
        onSubmit={handleSubmit}
        decorators={[calculator]}
        initialValues={{
          payment: { datePaid: date }
        }}
      >
        {({ handleSubmit, submitting, values, pristine }) => (
          <form onSubmit={handleSubmit}>
            <Row>
              <Field name="payment.datePaid" label="Date">
                {({ input }) => (
                  <AtlasField name="date" label="Date" isRequired>
                    {() => <DatePicker {...input} />}
                  </AtlasField>
                )}
              </Field>

              <Field name="lease" label="Room">
                {({ input }) => (
                  <AtlasField name="lease" label="Room" isRequired>
                    {() => (
                      <Select
                        {...input}
                        options={options}
                        placeholder="Choose a room"
                      />
                    )}
                  </AtlasField>
                )}
              </Field>
            </Row>
            {values.lease && (
              <>
                <StyledDiv>
                  Previous Reading :{" "}
                  <span>
                    {values.lease.value.lastPayment &&
                    values.lease.value.lastPayment.reading
                      ? values.lease.value.lastPayment.reading
                      : values.lease.value.initialReading}
                  </span>
                </StyledDiv>
                <Field
                  name="payment.reading"
                  label="Current Reading"
                  parse={value => value && parseInt(value)}
                >
                  {({ input }) => (
                    <AtlasField name="reading" label="Current Reading">
                      {() => (
                        <TextField
                          autoComplete="off"
                          placeholder={
                            values.lease.value.lastPayment && values.lease.value.lastPayment.reading
                              ? values.lease.value.lastPayment.reading
                              : values.lease.value.initialReading
                          }
                          {...input}
                          type="number"
                        />
                      )}
                    </AtlasField>
                  )}
                </Field>
                <StyledDiv>
                  Calculated Electricity Charges :{" "}
                  <span>{values.payment.electricityCharges}</span>
                </StyledDiv>

                {values.lease.value.extraCharges > 0 && (
                  <StyledDiv>
                    Extra Charges :{" "}
                    <span>{values.lease.value.extraCharges}</span>
                  </StyledDiv>
                )}

                {values.lease.value.lastPayment &&
                  values.lease.value.lastPayment.balance !== 0 && (
                    <StyledDiv>
                      Last Balance :{" "}
                      <span>{values.lease.value.lastPayment.balance}</span>
                    </StyledDiv>
                  )}

                <StyledDiv>
                  Total Rent : <span>{values.totalRent}</span>
                </StyledDiv>
                <Field
                  name="payment.totalPaid"
                  parse={value => value && parseInt(value)}
                >
                  {({ input }) => (
                    <AtlasField name="reading" label="Total Paid" isRequired>
                      {() => (
                        <TextField
                          autoComplete="off"
                          {...input}
                          type="number"
                        />
                      )}
                    </AtlasField>
                  )}
                </Field>
                <StyledDiv>
                  Curent Balance :{" "}
                  <Balance
                    value={
                      values.payment.balanceIsElectricity
                        ? 0
                        : values.payment.balance
                    }
                  >
                    {values.payment.balanceIsElectricity
                      ? 0
                      : values.payment.balance}
                  </Balance>
                </StyledDiv>
                {!values.payment.reading && values.payment.balance > 0 && (
                  <Field name="payment.balanceIsElectricity" type="checkbox">
                    {({ input }) => (
                      <Checkbox
                        label="Mark balance as Electricity Charge"
                        {...input}
                        isChecked={input.value}
                      />
                    )}
                  </Field>
                )}

                {values.payment.balanceIsElectricity && (
                  <StyledDiv>
                    Paid Electricity Charges :{" "}
                    <span>{values.payment.balance}</span>
                  </StyledDiv>
                )}

                <Field name="lease.remark">
                  {({ input }) => (
                    <AtlasField name="remark" label="Remarks">
                      {() => <TextArea resize="smart" {...input} />}
                    </AtlasField>
                  )}
                </Field>

                <FormFooter>
                  <Button
                    type="submit"
                    appearance="primary"
                    isDisabled={
                      submitting || pristine || !values.payment.totalPaid
                    }
                    isLoading={submitting}
                  >
                    Submit
                  </Button>
                </FormFooter>
              </>
            )}
          </form>
        )}
      </Form>
    </div>
  );
};

export default AddTenant;
