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
  ReferenceField,
  ImageInput,
  FileInput,
  CheckboxGroupInput,
  NumberField,
  DataTimeField,
  ReferenceInput,
  SelectInput,
  DateField,
  EditButton,
  List,
  BooleanField,
} from "react-admin";
import useFetch from "react-fetch-hook";

import { cloneElement, useMemo } from "react";
import PropTypes from "prop-types";
import {
  useListContext,
  TopToolbar,
  CreateButton,
  ExportButton,
  Button,
  sanitizeListRestProps,
} from "react-admin";
import IconEvent from "@material-ui/icons/Event";

export default function StandardForm(props) {
  const { isLoading, data } = useFetch(
    process.env.REACT_APP_API_URL + "/api/schemas/" + props.resource
  );

  if (isLoading) return "loading";
  const keys = Object.keys(data.properties).filter(
    (item) => ["id", "created_at", "updated_at"].indexOf(item) == -1
  );

  function getInput(key, data) {
    if (!data.ui_type) data.ui_type = data.type;
    if (data.ui_type === "boolean") return <BooleanInput source={key} />;

    if (data.ui_type === "number") return <NumberInput source={key} />;
    if (data.ui_type === "date") return <DateInput source={key} />;
    if (data.ui_type === "datetime") return <DateTimeInput source={key} />;

    if (data.ui_type === "select")
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

const ListActions = (props) => {
  const { className, exporter, filters, maxResults, ...rest } = props;
  const {
    currentSort,
    resource,
    displayedFilters,
    filterValues,
    hasCreate,
    basePath,
    selectedIds,
    showFilter,
    total,
  } = useListContext();
  return (
    <TopToolbar className={className} {...sanitizeListRestProps(rest)}>
      {filters &&
        cloneElement(filters, {
          resource,
          showFilter,
          displayedFilters,
          filterValues,
          context: "button",
        })}
      <CreateButton basePath={basePath} />

      {/* Add your custom actions */}
      <Button
        onClick={() => {
          alert("Your custom action");
        }}
        label="Show calendar"
      >
        <IconEvent />
      </Button>
    </TopToolbar>
  );
};

export function StandardList(props) {
  const { isLoading, data } = useFetch(
    process.env.REACT_APP_API_URL + "/api/schemas/" + props.resource
  );

  if (isLoading) return "loading";
  const keys = data.list
    ? data.list
    : Object.keys(data.properties).filter(
        (item) => ["id", "created_at", "updated_at"].indexOf(item) === -1
      );

  function getInput(key, data) {
    if (!data.ui_type) data.ui_type = data.type;
    else if (data.ui_type === "boolean") return <BooleanField source={key} />;
    else if (data.ui_type === "number") return <NumberField source={key} />;
    else if (data.ui_type === "date") return <DateField source={key} />;
    else if (data.ui_type === "datetime") return <TextField source={key} />;
    else if (data.ui_type === "select") return <TextField source={key} />;
    else if (data.ui_type === "checkbox") return <TextField source={key} />;
    else if (data.ui_type === "reference")
      return (
        <ReferenceField label={key} source={key} reference={data.reference}>
          <TextField source={data.source || "name"} />
        </ReferenceField>
      );
    else if (data.ui_type === "deep_reference") {
      debugger;
      return (
        <ReferenceField
          link={false}
          label={key}
          source={key}
          reference={data.reference}
        >
          <ReferenceManyField
            reference={data.sub_reference}
            target={data.target || "id"}
            addLabel={false}
          >
            <TextField source={data.source || "name"} />
          </ReferenceManyField>
        </ReferenceField>
      );
    } else return <TextField source={key} />;
  }

  return (
    <List {...props}>
      <Datagrid>
        {keys.map((key) => {
          return getInput(key, data.properties[key]);
        })}
      </Datagrid>
    </List>
  );
}
