import React from "react";
import { FormFooter } from "@atlaskit/form";
import { Form, Field } from "react-final-form";

import { Field as AtlasField } from "@atlaskit/form";
import TextArea from "@atlaskit/textarea";
import TextField from "@atlaskit/textfield";
import { Checkbox } from "@atlaskit/checkbox";
import Select from "@atlaskit/select";
import { DatePicker } from "@atlaskit/datetime-picker";
import CheckCircleOutlineIcon from "@atlaskit/icon/glyph/check-circle-outline";

import styled from "styled-components";
import createDecorator from "final-form-calculate";

import { useQuery, useMutation } from "@apollo/react-hooks";

// import { useAuthContext } from "../utils/authContext";
import { GET_CURRENT_LEASES } from "../utils/queries";
import { getUnitRate, getPreviousReading } from "../utils";
import { PER_UNIT_CHARGE } from "../utils/constants";
import { ADD_PAYMENT } from "../utils/mutations";

import { Loader, Wrapper } from "../components/Loader";
import Button from "../components/ThemedButton";

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

const calculateElectricity = (reading, lease, unitRate) => {
  const lastReading = getPreviousReading(lease);
  const charges = (reading - lastReading) * unitRate;
  return charges > 0 ? charges : 0;
};

const calculateTotalRent = (lease, reading, unitRate) => {
  const charges = calculateElectricity(reading, lease.value, unitRate);

  const balance =
    lease.value.lastPayment &&
    (lease.value.lastPayment.balance ? lease.value.lastPayment.balance : 0);

  const extraCharges = lease.value.extraCharges ? lease.value.extraCharges : 0;
  return {
    charges: charges,
    totalRent: lease.value.rent + charges + balance + extraCharges
  };
};

const calculator = createDecorator(
  {
    field: ["lease", "payment.reading"],
    updates: (reading, name, values) => {
      if (!values.lease) return {};

      let { charges, totalRent } = calculateTotalRent(
        values.lease,
        name === "payment.reading" ? reading : values.payment.reading,
        values.unitRate
      );

      return {
        "payment.electricityCharges": charges,
        totalRent: totalRent
      };
    }
  },
  {
    field: ["payment.datePaid"],
    updates: (datePaid, name, values) => {
      const unitRate = getUnitRate(datePaid);

      if (!values.lease) return { unitRate: unitRate };

      let { charges, totalRent } = calculateTotalRent(
        values.lease,
        values.payment.reading,
        unitRate
      );

      return {
        "payment.electricityCharges": charges,
        totalRent: totalRent,
        unitRate: unitRate
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

const AcceptPayment = () => {
  const { data, loading } = useQuery(GET_CURRENT_LEASES);

  const [
    addPayment,
    { loading: mutationLoading, data: paymentData }
  ] = useMutation(ADD_PAYMENT, {
    refetchQueries: [{ query: GET_CURRENT_LEASES }]
  });

  if (loading || mutationLoading) return <Loader size="large" />;

  const options = data.currentLeases.map(lease => ({
    label: `${lease.room.roomNo} - ${lease.tenant.name}`,
    value: lease
  }));

  const date = new Date();

  const handleSubmit = data => {
    const leaseId = data.lease.value._id;
    // TODO:  Move this logic to backend
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
      if (payment.balance > 0)
        payment.paidElectricityCharges = payment.electricityCharges;
      else
        payment.paidElectricityCharges =
          payment.electricityCharges + payment.balance;
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
          payment: { datePaid: date },
          unitRate: 0
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
                  <span>{getPreviousReading(values.lease.value)}</span>
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
                          placeholder={`Should be more than ${getPreviousReading(
                            values.lease.value
                          )}`}
                          {...input}
                          type="number"
                        />
                      )}
                    </AtlasField>
                  )}
                </Field>
                <StyledDiv>
                  Unit Rate : <span>{values.unitRate}</span>
                </StyledDiv>

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

export default AcceptPayment;
