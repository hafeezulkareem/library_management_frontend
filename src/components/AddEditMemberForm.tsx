import Form, { ErrorMessage, Field, FormFooter } from "@atlaskit/form";
import Textfield from "@atlaskit/textfield";
import { FC, FormEvent, Fragment } from "react";
import { Member } from "../helpers/types";
import { Box, Flex, xcss } from "@atlaskit/primitives";
import Button from "@atlaskit/button/new";

interface Props {
   member?: Member;
   onCancel: () => void;
   onSubmit: (values: Member) => void;
   apiInProgress: boolean;
}

const AddEditMemberForm: FC<Props> = (props) => {
   const { member = {} as Member, onCancel, onSubmit, apiInProgress } = props;

   return (
      <Form onSubmit={onSubmit}>
         {({ formProps }) => {
            return (
               <form {...formProps}>
                  <Field
                     name="name"
                     label="Name"
                     isRequired
                     validate={(value) =>
                        !value || value.trim().length === 0
                           ? "Name is required"
                           : ""
                     }
                     defaultValue={member.name}
                  >
                     {({ fieldProps, error }) => (
                        <Fragment>
                           <Textfield placeholder="Name" {...fieldProps} />
                           {error && <ErrorMessage>{error}</ErrorMessage>}
                        </Fragment>
                     )}
                  </Field>

                  <Field
                     name="email"
                     label="Email"
                     isRequired
                     validate={(value) =>
                        !value || value.trim().length === 0
                           ? "Email is required"
                           : ""
                     }
                     defaultValue={member.email}
                     transform={(event: FormEvent<HTMLInputElement>) =>
                        event.target.value.trim()
                     }
                  >
                     {({ fieldProps, error }) => (
                        <Fragment>
                           <Textfield placeholder="Email" {...fieldProps} />
                           {error && <ErrorMessage>{error}</ErrorMessage>}
                        </Fragment>
                     )}
                  </Field>

                  <Field
                     name="phone_number"
                     label="Phone number"
                     isRequired
                     validate={(value) =>
                        !value || value.trim().length === 0
                           ? "Phone number is required"
                           : value.trim().length !== 10
                           ? "Phone number is invalid"
                           : ""
                     }
                     defaultValue={member.phone_number}
                     transform={(event: FormEvent<HTMLInputElement>) =>
                        event.target.value.trim()
                     }
                  >
                     {({ fieldProps, error }) => (
                        <Fragment>
                           <Textfield
                              placeholder="Phone number"
                              {...fieldProps}
                           />
                           {error && <ErrorMessage>{error}</ErrorMessage>}
                        </Fragment>
                     )}
                  </Field>

                  <Field
                     name="address"
                     label="Address"
                     isRequired
                     validate={(value) =>
                        !value || value.trim().length === 0
                           ? "Address is required"
                           : ""
                     }
                     defaultValue={member.address}
                  >
                     {({ fieldProps, error }) => (
                        <Fragment>
                           <Textfield placeholder="Address" {...fieldProps} />
                           {error && <ErrorMessage>{error}</ErrorMessage>}
                        </Fragment>
                     )}
                  </Field>

                  <Box
                     xcss={xcss({
                        padding: "space.300",
                        paddingRight: "space.0",
                        marginTop: "space.negative.300",
                     })}
                  >
                     <FormFooter>
                        <Flex gap="space.100">
                           <Button
                              onClick={onCancel}
                              isDisabled={apiInProgress}
                           >
                              Cancel
                           </Button>
                           <Button
                              appearance="primary"
                              type="submit"
                              isLoading={apiInProgress}
                              isDisabled={apiInProgress}
                           >
                              Confirm
                           </Button>
                        </Flex>
                     </FormFooter>
                  </Box>
               </form>
            );
         }}
      </Form>
   );
};

export default AddEditMemberForm;
