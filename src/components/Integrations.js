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
  SelectInput,
  ReferenceInput,
  EditButton,
} from "react-admin";

export const IntegrationCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="provider_name" />
      <TextInput source="description" options={{ multiLine: true }} />
      <ReferenceInput
        label="Customer"
        source="customer_id"
        reference="customers"
      >
        <SelectInput optionText="name" />
      </ReferenceInput>
      <TextInput source="auth_token" />
      <TextInput source="refresh_token" />
      <TextInput source="external_user_id" />
      <TextInput source="expiry_date" />
      <TextInput source="client_id" />
      <TextInput source="client_secret" />
    </SimpleForm>
  </Create>
);

export const IntegrationEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput disabled label="Id" source="id" />
      <TextInput source="provider_name" validate={required()} />
      <ReferenceInput
        label="Customer"
        source="customer_id"
        reference="customers"
      >
        <SelectInput optionText="name" />
      </ReferenceInput>
      <TextInput source="auth_token" />
      <TextInput source="refresh_token" />
      <TextInput source="external_user_id" />
      <TextInput source="expiry_date" />
      <TextInput source="client_id" />
      <TextInput source="client_secret" />
    </SimpleForm>
  </Edit>
);
