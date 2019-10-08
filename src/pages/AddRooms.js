import React from "react";
import { Link } from "react-router-dom";
import { FormFooter } from "@atlaskit/form";
import { Form, Field } from "react-final-form";
import arrayMutators from 'final-form-arrays'
import { FieldArray } from 'react-final-form-arrays'

import { useMutation } from "@apollo/react-hooks";
import { Field as AtlasField } from "@atlaskit/form";
import CrossIcon from '@atlaskit/icon/glyph/cross';
import TextField from "@atlaskit/textfield";

import { GET_ROOMS } from "../utils/queries";
import { ADD_ROOMS } from "../utils/mutations";
import Button from "../components/ThemedButton";
import { Wrapper } from "../components/Loader";

const initialValue = [{ roomNo: "" }];

const AddRooms = props => {
  const [addRooms, { data: addedRooms }] = useMutation(ADD_ROOMS, {
    refetchQueries: [{ query: GET_ROOMS }]
  });
      
  const handleSubmit = data => {
    console.log("data =>", data);
    addRooms({ variables: { rooms: data.rooms } });
  };

  if (addedRooms)
  return (
    <Wrapper>
      <h3>Rooms successfully ended!</h3>
      <Link to="/">Go Home</Link>
    </Wrapper>
  );


  return (
    <div style={{ padding: "1rem 2rem" }}>
      <h3>Add Rooms</h3>
      <Form
        onSubmit={handleSubmit}
        mutators={{
          ...arrayMutators
        }}
      >
        {({
          handleSubmit,
          submitting,
          pristine,
          form: {
            mutators: { push, pop }
          },
          values
        }) => (
          <form onSubmit={handleSubmit}>
            <FieldArray name="rooms" initialValue={initialValue}>
              {({ fields }) =>
                fields.map((name, index) => (
                  <Field name={`${name}.roomNo`} label="Room Number" key={name}>
                    {({ input }) => (
                      <div style={{ display: "flex", alignItems: "flex-end" }}>
                        <AtlasField name="Room No" isRequired>
                          {() => (
                            <TextField
                              autoComplete="off"
                              placeholder={`Room ${index + 1}`}
                              {...input}
                            />
                          )}
                        </AtlasField>

                        <Button
                          appearance="subtle"
                          iconBefore={<CrossIcon size="" />}
                          onClick={() => fields.remove(index)}
                        ></Button>
                      </div>
                    )}
                  </Field>
                ))
              }
            </FieldArray>
            <Button
              onClick={() => push("rooms", {})}
              style={{ marginTop: ".75rem", marginLeft: 0 }}
            >
              Add Room
            </Button>
            <FormFooter>
              <Button
                type="submit"
                appearance="primary"
                isDisabled={
                  submitting ||
                  (values.rooms && values.rooms.length === 0) ||
                  pristine
                }
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

export default AddRooms;