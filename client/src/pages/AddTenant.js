import React from "react";
import Button from "@atlaskit/button";
import Form, {
  Field,
  FormFooter,
  HelperMessage,
  ErrorMessage,
  ValidMessage
} from "@atlaskit/form";
import TextField from "@atlaskit/textfield";
import Select from "@atlaskit/select";
import { DatePicker } from "@atlaskit/datetime-picker";
import TextArea from "@atlaskit/textarea";
import Spinner from "@atlaskit/spinner";
import CheckCircleOutlineIcon from "@atlaskit/icon/glyph/check-circle-outline";

import styled from "styled-components";

import { useQuery, useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

import { useAuthContext } from "../utils/authContext";
import { GET_ROOMS } from "../utils/queries";

const Wrapper = styled.div`
  text-align: center;
  margin-top: 2rem;
`;

const ADD_TENANT = gql`
  mutation addTenant($lease: LeaseInput!, $tenant: TenantInput!) {
    createTenantWithLease(lease: $lease, tenant: $tenant) {
      _id
      rent
    }
  }
`;

const AddTenant = () => {
  const { userState } = useAuthContext();

  const { data, loading } = useQuery(GET_ROOMS, {
    variables: { landlordId: userState.user.landlord._id }
  });

  const [addTenant, { data: tenantData }] = useMutation(ADD_TENANT, {
    onCompleted: data => {
      console.log("data", data);
      // Redirect to the room page
      // Update rooms cache
      //   setUser(data.logIn);
      //   history.push("/");
    },
    update(
      cache,
      {
        data: { addTenant }
      }
    ) {
      // const { rooms } = cache.readQuery({ query: GET_ROOMS });
      // cache.writeQuery({
      //   query: GET_ROOMS,
      //   data: { todos: todos.concat([addTodo]) }
      // });
    }
  });

  if (loading)
    return (
      <Wrapper>
        <Spinner size="large" />
      </Wrapper>
    );

  const options = data.rooms
    .filter(room => !room.currentLease)
    .map(option => ({
      label: option.roomNo,
      value: option._id
    }));

  if (options.length === 0)
    return (
      <h4 style={{ textAlign: "center", marginTop: "2rem" }}>
        No vacant rooms.
      </h4>
    );

  const date = new Date();

  const handleSubmit = data => {
    let lease = Object.assign({}, data.lease);
    lease.room = data.lease.room.value;
    lease.date = new Date(
      data.lease.date ? data.lease.date : data["lease.date"]
    );
    lease.rent = lease.rent && parseInt(lease.rent);
    lease.extraCharges = lease.extraCharges && parseInt(lease.extraCharges);
    lease.initialReading =
      lease.initialReading && parseInt(lease.initialReading);
    addTenant({ variables: { lease, tenant: data.tenant } });
  };

  if (tenantData)
    return (
      <Wrapper>
        <CheckCircleOutlineIcon size="xlarge" primaryColor="green" />
        <div>Saved</div>
      </Wrapper>
    );

  return (
    <div style={{ padding: "1rem 2rem" }}>
      <h3>Add Tenant</h3>
      <Form onSubmit={handleSubmit}>
        {({ formProps, submitting }) => (
          <form {...formProps}>
            <Field name="lease.room" label="Room" isRequired defaultValue="">
              {({ fieldProps }) => (
                <Select
                  {...fieldProps}
                  options={options}
                  placeholder="Choose a room"
                />
              )}
            </Field>
            <Field name="tenant.name" label="Name" isRequired defaultValue="">
              {({ fieldProps }) => (
                <TextField autoComplete="off" {...fieldProps} />
              )}
            </Field>
            <Field
              name="tenant.phoneNumber"
              label="Phone Number"
              defaultValue=""
            >
              {({ fieldProps }) => (
                <TextField autoComplete="off" {...fieldProps} type="number" />
              )}
            </Field>
            <Field
              name="tenant.aadharNumber"
              label="Aadhar Number"
              defaultValue=""
            >
              {({ fieldProps }) => (
                <TextField autoComplete="off" {...fieldProps} type="number" />
              )}
            </Field>
            <Field name="lease.rent" label="Rent" defaultValue={undefined}>
              {({ fieldProps }) => (
                <TextField autoComplete="off" {...fieldProps} type="number" />
              )}
            </Field>
            <Field name="lease.initialReading" label="Reading" defaultValue="">
              {({ fieldProps }) => (
                <TextField autoComplete="off" {...fieldProps} type="number" />
              )}
            </Field>
            <Field name="lease.date" label="Date" defaultValue={date}>
              {({ fieldProps }) => <DatePicker {...fieldProps} />}
            </Field>
            <Field
              name="lease.extraCharges"
              label="Extra Charges"
              defaultValue=""
            >
              {({ fieldProps }) => (
                <TextField autoComplete="off" {...fieldProps} type="number" />
              )}
            </Field>
            <Field name="lease.remark" label="Remarks" defaultValue="">
              {({ fieldProps }) => <TextArea resize="smart" {...fieldProps} />}
            </Field>

            <FormFooter>
              <Button
                type="submit"
                appearance="primary"
                disabled={submitting}
                isLoading={submitting}
              >
                Submit
              </Button>
            </FormFooter>
          </form>
        )}
      </Form>
    </div>
  );
};

export default AddTenant;
