import Form, { ErrorMessage, Field, FormFooter } from "@atlaskit/form";
import Textfield from "@atlaskit/textfield";
import { FC, Fragment } from "react";
import { Book } from "../helpers/types";
import { DatePicker } from "@atlaskit/datetime-picker";
import { Box, Flex, xcss } from "@atlaskit/primitives";
import Button from "@atlaskit/button/new";

interface Props {
   book?: Book;
   onCancel: () => void;
   onSubmit: (values: Book) => void;
   apiInProgress: boolean;
}

const AddEditBookForm: FC<Props> = (props) => {
   const { book = {} as Book, onCancel, onSubmit, apiInProgress } = props;

   return (
      <Form onSubmit={onSubmit}>
         {({ formProps }) => {
            return (
               <form {...formProps}>
                  <Field
                     name="title"
                     label="Title"
                     isRequired
                     validate={(value) =>
                        !value || value.trim().length === 0
                           ? "Title is required"
                           : ""
                     }
                     defaultValue={book.title}
                  >
                     {({ fieldProps, error }) => (
                        <Fragment>
                           <Textfield placeholder="Title" {...fieldProps} />
                           {error && <ErrorMessage>{error}</ErrorMessage>}
                        </Fragment>
                     )}
                  </Field>

                  <Field
                     name="authors"
                     label="Authors"
                     isRequired
                     validate={(value) =>
                        !value || value.trim().length === 0
                           ? "Authors are required"
                           : ""
                     }
                     defaultValue={book.authors}
                  >
                     {({ fieldProps, error }) => (
                        <Fragment>
                           <Textfield placeholder="Authors" {...fieldProps} />
                           {error && <ErrorMessage>{error}</ErrorMessage>}
                        </Fragment>
                     )}
                  </Field>

                  <Field
                     name="publisher"
                     label="Publisher"
                     isRequired
                     validate={(value) =>
                        !value || value.trim().length === 0
                           ? "Publisher is required"
                           : ""
                     }
                     defaultValue={book.publisher}
                  >
                     {({ fieldProps, error }) => (
                        <Fragment>
                           <Textfield placeholder="Publisher" {...fieldProps} />
                           {error && <ErrorMessage>{error}</ErrorMessage>}
                        </Fragment>
                     )}
                  </Field>

                  <Field
                     name="published_date"
                     label="Published date"
                     isRequired
                     validate={(value) =>
                        !value ? "Published date is required" : ""
                     }
                     defaultValue={book.published_date}
                  >
                     {({ fieldProps, error }) => (
                        <Fragment>
                           <DatePicker
                              {...fieldProps}
                              placeholder="Published date"
                              dateFormat="DD-MM-YYYY"
                           />
                           {error && <ErrorMessage>{error}</ErrorMessage>}
                        </Fragment>
                     )}
                  </Field>

                  <Field
                     name="rental_fee"
                     label="Rental fee"
                     isRequired
                     validate={(value) =>
                        !value || value.trim().length === 0
                           ? "Rental fee is required"
                           : isNaN(Number.parseFloat(value))
                           ? "Rental fee should be number"
                           : ""
                     }
                     defaultValue={book.rental_fee?.toString()}
                  >
                     {({ fieldProps, error }) => (
                        <Fragment>
                           <Textfield
                              {...fieldProps}
                              placeholder="Rental fee"
                           />
                           {error && <ErrorMessage>{error}</ErrorMessage>}
                        </Fragment>
                     )}
                  </Field>

                  <Field
                     name="available_count"
                     label="Available count"
                     isRequired
                     validate={(value) =>
                        !value || value.trim().length === 0
                           ? "Available count is required"
                           : isNaN(Number.parseFloat(value))
                           ? "Available count should be number"
                           : ""
                     }
                     defaultValue={book.available_count?.toString()}
                  >
                     {({ fieldProps, error }) => (
                        <Fragment>
                           <Textfield
                              {...fieldProps}
                              placeholder="Available count"
                           />
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

export default AddEditBookForm;
