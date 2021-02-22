import React, { useState, useEffect } from "react";
import { Admin, Resource, ListGuesser } from "react-admin";
import buildHasuraProvider from "ra-data-hasura";
import StandardForm, {
  StandardFormEdit,
  StandardList,
} from "./components/Standard";
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
        name="providers"
        create={StandardForm}
        edit={StandardFormEdit}
        list={StandardList}
      />

      <Resource
        name="customers"
        create={StandardForm}
        edit={StandardFormEdit}
        list={StandardList}
      />

      <Resource
        name="integrations"
        create={StandardForm}
        edit={StandardFormEdit}
        list={StandardList}
      />

      <Resource
        name="scripts"
        create={StandardForm}
        edit={StandardFormEdit}
        list={StandardList}
      />

      <Resource
        name="script_assignments"
        create={StandardForm}
        edit={StandardFormEdit}
        list={StandardList}
      />

      <Resource
        name="schedules"
        create={StandardForm}
        edit={StandardFormEdit}
        list={StandardList}
      />

      <Resource
        name="jobs"
        create={StandardForm}
        edit={StandardFormEdit}
        list={StandardList}
      />

      <Resource name="script_logs" list={StandardList} />

      <Resource
        name="executions"
        create={StandardForm}
        edit={StandardFormEdit}
        list={StandardList}
      />

      <Resource
        name="users"
        create={StandardForm}
        edit={StandardFormEdit}
        list={StandardList}
      />
      <Resource
        name="admins"
        create={StandardForm}
        edit={StandardFormEdit}
        list={StandardList}
      />
    </Admin>
  );
}
