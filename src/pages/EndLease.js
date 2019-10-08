import React from 'react';
import { Link } from "react-router-dom";
import { FormFooter } from "@atlaskit/form";
import { Form, Field } from "react-final-form";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { Field as AtlasField } from "@atlaskit/form";
import Select from "@atlaskit/select";

import { GET_CURRENT_LEASES, GET_ROOMS } from "../utils/queries";
import { END_LEASE } from "../utils/mutations";
import { Loader, Wrapper } from "../components/Loader";
import Button from "../components/ThemedButton";

const EndLease = () => {
  const { data, loading } = useQuery(GET_CURRENT_LEASES);
  const [endLease, { data: updatedLease }] = useMutation(END_LEASE, {
    refetchQueries: [{ query: GET_CURRENT_LEASES }, {query : GET_ROOMS}]
  });

  if (loading) return <Loader size="large" />;

  if (updatedLease)
    return (
      <Wrapper>
        <h3>Lease successfully ended!</h3>
        <Link to="/">Go Home</Link>
      </Wrapper>
    );
  

  const options = data.currentLeases.map(lease => ({
    label: `${lease.room.roomNo} - ${lease.tenant.name}`,
    value: lease
  }));

  const handleSubmit = data => {
    endLease({ variables: { leaseId: data.lease.value._id } });
  };
  return (
    <div style={{ padding: "1rem 2rem" }}>
      <h3>End Tenant Lease</h3>
      <Form onSubmit={handleSubmit}>
        {({ handleSubmit, submitting, pristine }) => (
          <form onSubmit={handleSubmit}>
            <Field name="lease" label="Room/Tenant">
              {({ input }) => (
                <AtlasField name="lease" label="Tenant" isRequired>
                  {() => (
                    <Select
                      {...input}
                      options={options}
                      placeholder="Choose a tenant"
                    />
                  )}
                </AtlasField>
              )}
            </Field>
            <FormFooter>
              <Button
                type="submit"
                appearance="danger"
                isDisabled={submitting || pristine}
                isLoading={submitting}
              >
                End
              </Button>
            </FormFooter>
          </form>
        )}
      </Form>
    </div>
  );
};

export default EndLease;