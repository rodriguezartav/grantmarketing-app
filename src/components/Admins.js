import * as React from "react";
import {
  Create,
  Edit,
  SimpleForm,
  TextInput,
  DateInput,
  ReferenceManyField,
  Datagrid,
  TextField,
  required,
  DateField,
  EditButton,
} from "react-admin";

export const AdminCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="description" options={{ multiLine: true }} />
    </SimpleForm>
  </Create>
);

export const AdminEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput disabled label="Id" source="id" />
      <TextInput source="name" validate={required()} />
    </SimpleForm>
  </Edit>
);
