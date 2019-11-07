import React from "react";
import Form, { Field, FormFooter } from "@atlaskit/form";
import TextField from "@atlaskit/textfield";
import Select from "@atlaskit/select";
import { DatePicker } from "@atlaskit/datetime-picker";
import TextArea from "@atlaskit/textarea";
import CheckCircleOutlineIcon from "@atlaskit/icon/glyph/check-circle-outline";

import { useQuery, useMutation } from "@apollo/react-hooks";

import { useAuthContext } from "../utils/authContext";
import { GET_ROOMS, GET_CURRENT_LEASES } from "../utils/queries";
import { ADD_TENANT } from "../utils/mutations";

import { Loader, Wrapper } from "../components/Loader";
import Button from "../components/ThemedButton";

const AddTenant = () => {
  const { userState } = useAuthContext();

  const { data, loading } = useQuery(GET_ROOMS, {
    variables: { landlordId: userState.user.landlord._id }
  });

  const [addTenant, { data: tenantData }] = useMutation(ADD_TENANT, {
    refetchQueries: [
      {
        query: GET_ROOMS
      },
      {
        query: GET_CURRENT_LEASES
      }
    ]
  });

  if (loading) return <Loader size="large" />;

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
