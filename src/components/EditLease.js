import React from "react";

import Form, { Field, FormFooter } from "@atlaskit/form";
import TextField from "@atlaskit/textfield";
import { DatePicker } from "@atlaskit/datetime-picker";
import TextArea from "@atlaskit/textarea";

import Button from "../components/ThemedButton";

import { GET_ROOMS, GET_CURRENT_LEASES } from "../utils/queries";
import { useMutation } from "@apollo/react-hooks";
import { EDIT_TENANT } from "../utils/mutations";

function sanitizeLease(leaseId, _lease) {
  let lease = Object.assign({ _id: leaseId }, _lease);
  if (lease.rent) lease.rent = parseInt(lease.rent);
  if (lease.date) lease.date = new Date(lease.date);
  if (lease.extraCharges) lease.extraCharges = parseInt(lease.extraCharges);
  if (lease.initialReading)
    lease.initialReading = parseInt(lease.initialReading);
  return lease;
}

function EditLease({ lease }) {
  const [editTenant, { loading }] = useMutation(EDIT_TENANT, {
    refetchQueries: [
      {
        query: GET_ROOMS
      },
      {
        query: GET_CURRENT_LEASES
      }
    ]
  });

  const handleSubmit = data => {
    const newLease = sanitizeLease(lease._id, data.lease);
    const tenant = Object.assign({ _id: lease.tenant._id }, data.tenant);
    editTenant({ variables: { lease: newLease, tenant } });
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        {({ formProps }) => (
          <form {...formProps}>
            <Field
              name="tenant.name"
              label="Name"
              isRequired
              defaultValue={lease.tenant.name}
            >
              {({ fieldProps }) => (
                <TextField autoComplete="off" {...fieldProps} />
              )}
            </Field>
            <Field
              name="tenant.phoneNumber"
              label="Phone Number"
              defaultValue={lease.tenant.phoneNumber || ""}
            >
              {({ fieldProps }) => (
                <TextField autoComplete="off" {...fieldProps} type="number" />
              )}
            </Field>
            <Field
              name="tenant.aadharNumber"
              label="Aadhar Number"
              defaultValue={lease.tenant.aadharNumber || ""}
            >
              {({ fieldProps }) => (
                <TextField autoComplete="off" {...fieldProps} type="number" />
              )}
            </Field>
            <Field name="lease.rent" label="Rent" defaultValue={lease.rent}>
              {({ fieldProps }) => (
                <TextField autoComplete="off" {...fieldProps} type="number" />
              )}
            </Field>
            <Field
              name="lease.initialReading"
              label="Reading"
              defaultValue={lease.initialReading || ""}
            >
              {({ fieldProps }) => (
                <TextField autoComplete="off" {...fieldProps} type="number" />
              )}
            </Field>
            <Field name="lease.date" label="Date" defaultValue={lease.date}>
              {({ fieldProps }) => <DatePicker {...fieldProps} />}
            </Field>
            <Field
              name="lease.extraCharges"
              label="Extra Charges"
              defaultValue={lease.extraCharges || ""}
            >
              {({ fieldProps }) => (
                <TextField autoComplete="off" {...fieldProps} type="number" />
              )}
            </Field>
            <Field
              name="lease.remark"
              label="Remarks"
              defaultValue={lease.remark || ""}
            >
              {({ fieldProps }) => <TextArea resize="smart" {...fieldProps} />}
            </Field>

            <FormFooter>
              <Button
                type="submit"
                appearance="primary"
                disabled={loading}
                isLoading={loading}
              >
                Save
              </Button>
            </FormFooter>
          </form>
        )}
      </Form>
    </div>
  );
}

export default EditLease;
