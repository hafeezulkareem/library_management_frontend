import Form, { ErrorMessage, Field, FormFooter } from "@atlaskit/form";
import Textfield from "@atlaskit/textfield";
import { FC, FormEvent, Fragment } from "react";
import { ReturnBookPayload } from "../helpers/types";
import { Box, Flex, xcss } from "@atlaskit/primitives";
import Button from "@atlaskit/button/new";

interface Props {
   onCancel: () => void;
   onSubmit: (values: ReturnBookPayload) => void;
   apiInProgress: boolean;
}

const ReturnBookForm: FC<Props> = (props) => {
   const { onCancel, onSubmit, apiInProgress } = props;

   return (
      <Form onSubmit={onSubmit}>
         {({ formProps }) => {
            return (
               <form {...formProps}>
                  <Field
                     name="book_id"
                     label="Book id"
                     isRequired
                     validate={(value) =>
                        !value || value.trim().length === 0
                           ? "Book id is required"
                           : ""
                     }
                     transform={(event: FormEvent<HTMLInputElement>) =>
                        event.target.value.trim()
                     }
                  >
                     {({ fieldProps, error }) => (
                        <Fragment>
                           <Textfield placeholder="Book id" {...fieldProps} />
                           {error && <ErrorMessage>{error}</ErrorMessage>}
                        </Fragment>
                     )}
                  </Field>

                  <Field
                     name="member_id"
                     label="Member id"
                     isRequired
                     validate={(value) =>
                        !value || value.trim().length === 0
                           ? "Member id is required"
                           : ""
                     }
                     transform={(event: FormEvent<HTMLInputElement>) =>
                        event.target.value.trim()
                     }
                  >
                     {({ fieldProps, error }) => (
                        <Fragment>
                           <Textfield placeholder="Member id" {...fieldProps} />
                           {error && <ErrorMessage>{error}</ErrorMessage>}
                        </Fragment>
                     )}
                  </Field>

                  <Field
                     name="fee_paid"
                     label="Fee"
                     validate={(value) =>
                        value && isNaN(Number.parseFloat(value))
                           ? "Fee should be number"
                           : ""
                     }
                     defaultValue="0"
                  >
                     {({ fieldProps, error }) => (
                        <Fragment>
                           <Textfield {...fieldProps} placeholder="Fee" />
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

export default ReturnBookForm;
