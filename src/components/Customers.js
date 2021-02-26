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
import useFetch from "react-fetch-hook";

export function CustomerCreate(props) {
  const { isLoading, data } = useFetch(
    process.env.REACT_APP_API_URL + "/vpi/schemas/" + props.resource
  );

  if (isLoading) return "loading";
  const keys = Object.keys(data.properties).filter(
    (item) => ["id", "created_at", "updated_at"].indexOf(item) == -1
  );

  return (
    <Create {...props}>
      <SimpleForm>
        {keys.map((key) => {
          return <TextInput source={key} />;
        })}
      </SimpleForm>
    </Create>
  );
}

export const CustomerEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput disabled label="Id" source="id" />
      <TextInput source="name" validate={required()} />
    </SimpleForm>
  </Edit>
);
