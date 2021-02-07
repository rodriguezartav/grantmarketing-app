import React, { useState, useEffect } from "react";
import { Admin, Resource, ListGuesser } from "react-admin";
import buildHasuraProvider from "ra-data-hasura";
import StandardForm, { StandardFormEdit } from "./components/Standard";
import Auth from "./helpers/Auth";
import Data from "./helpers/Data";
import Layout from "./components/Layout";
import LoginPage from "./components/Login";

export default function App() {
  const [dataProvider, setDataProvider] = useState(null);

  return (
    <Admin
      layout={Layout}
      authProvider={Auth}
      loginPage={LoginPage}
      dataProvider={Data}
    >
      <Resource
        name="customers"
        create={StandardForm}
        edit={StandardFormEdit}
        list={ListGuesser}
      />

      <Resource
        name="integrations"
        create={StandardForm}
        edit={StandardFormEdit}
        list={ListGuesser}
      />

      <Resource
        name="scripts"
        create={StandardForm}
        edit={StandardFormEdit}
        list={ListGuesser}
      />

      <Resource
        name="schedules"
        create={StandardForm}
        edit={StandardFormEdit}
        list={ListGuesser}
      />

      <Resource
        name="jobs"
        create={StandardForm}
        edit={StandardFormEdit}
        list={ListGuesser}
      />

      <Resource name="script_logs" list={ListGuesser} />

      <Resource
        name="users"
        create={StandardForm}
        edit={StandardFormEdit}
        list={ListGuesser}
      />
      <Resource
        name="admins"
        create={StandardForm}
        edit={StandardFormEdit}
        list={ListGuesser}
      />
    </Admin>
  );
}
