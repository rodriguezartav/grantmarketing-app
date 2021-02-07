import * as React from "react";
import {
  Create,
  Edit,
  SimpleForm,
  TextInput,
  ReferenceManyField,
  Datagrid,
  TextField,
  required,
  NumberInput,
  BooleanInput,
  DateInput,
  DateTimeInput,
  ImageInput,
  FileInput,
  CheckboxGroupInput,
  ReferenceInput,
  SelectInput,
  DateField,
  EditButton,
} from "react-admin";
import useFetch from "react-fetch-hook";

export default function StandardForm(props) {
  const { isLoading, data } = useFetch(
    process.env.REACT_APP_API_URL + "/api/schemas/" + props.resource
  );

  if (isLoading) return "loading";
  const keys = Object.keys(data.properties).filter(
    (item) => ["id", "created_at", "updated_at"].indexOf(item) == -1
  );

  function getInput(key, data) {
    if (data.ui_type == "boolean") return <BooleanInput source={key} />;

    if (data.ui_type == "number") return <NumberInput source={key} />;
    if (data.ui_type == "date") return <DateInput source={key} />;
    if (data.ui_type == "datetime") return <DateTimeInput source={key} />;

    if (data.ui_type == "select")
      return <SelectInput choices={data.choices} source={key} />;

    if (data.ui_type == "checkbox")
      return <CheckboxGroupInput choices={data.choices} source={key} />;

    if (data.ui_type == "reference")
      return (
        <ReferenceInput label={key} source={key} reference={data.reference}>
          <SelectInput optionText="name" />
        </ReferenceInput>
      );

    return <TextInput source={key} />;
  }

  return (
    <Create {...props}>
      <SimpleForm>
        <TextField label={props.resource.toUpperCase()} />
        {keys.map((key) => {
          return getInput(key, data.properties[key]);
        })}
      </SimpleForm>
    </Create>
  );
}

export function StandardFormEdit(props) {
  const { isLoading, data } = useFetch(
    process.env.REACT_APP_API_URL + "/api/schemas/" + props.resource
  );

  if (isLoading) return "loading";
  const keys = Object.keys(data.properties).filter(
    (item) => ["id", "created_at", "updated_at"].indexOf(item) == -1
  );

  function getInput(key, data) {
    if (data.ui_type == "boolean") return <BooleanInput source={key} />;

    if (data.ui_type == "number") return <NumberInput source={key} />;
    if (data.ui_type == "date") return <DateInput source={key} />;
    if (data.ui_type == "datetime") return <DateTimeInput source={key} />;

    if (data.ui_type == "select")
      return <SelectInput choices={data.choices} source={key} />;

    if (data.ui_type == "checkbox")
      return <CheckboxGroupInput choices={data.choices} source={key} />;

    if (data.ui_type == "reference")
      return (
        <ReferenceInput label={key} source={key} reference={data.reference}>
          <SelectInput optionText="name" />
        </ReferenceInput>
      );

    return <TextInput source={key} />;
  }

  return (
    <Edit {...props}>
      <SimpleForm>
        <TextField label={props.resource.toUpperCase()} />
        {keys.map((key) => {
          return getInput(key, data.properties[key]);
        })}
      </SimpleForm>
    </Edit>
  );
}
