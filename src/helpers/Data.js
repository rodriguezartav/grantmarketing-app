import { fetchUtils } from "react-admin";
import { HttpError } from "react-admin";

let apiUrl = process.env.REACT_APP_API_URL + "/api";

const httpClient = fetchUtils.fetchJson;

const getHeaders = () => {
  const token = localStorage.getItem("token");
  return new Headers({
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
  });
};

const mapSpecificResource = (resource) => {
  switch (resource) {
    case "approvals": {
      return "orders";
    }
    default: {
      return resource;
    }
  }
};

const dataProvider = () => {
  return {
    getRoute: (resource, params) => {
      const url = `${apiUrl}/${mapSpecificResource(resource)}/${params.route}`;

      const finalFilters = Object.keys(params.filter).reduce((all, key) => {
        const value = params.filter[key];
        const finalKey = Array.isArray(value) ? `${key},IN` : key;

        return { ...all, [finalKey]: value };
      }, {});

      return httpClient(url, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify({ ...params, filter: finalFilters }),
      }).then(({ headers, json }) => ({
        data: json,
      }));
    },

    getList: (resource, params) => {
      const url = `${apiUrl}/${mapSpecificResource(resource)}/getList`;

      const finalFilters = Object.keys(params.filter).reduce((all, key) => {
        const value = params.filter[key];
        const finalKey = Array.isArray(value) ? `${key},IN` : key;

        return { ...all, [finalKey]: value };
      }, {});

      return httpClient(url, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify({ ...params, filter: finalFilters }),
      }).then(({ headers, json }) => ({
        data: json.results,
        total: json.count,
      }));
    },

    getOne: (resource, params) =>
      httpClient(`${apiUrl}/${mapSpecificResource(resource)}/${params.id}`, {
        headers: getHeaders(),
        method: "GET",
      }).then(({ json }) => ({
        data: json,
      })),

    getMany: (resource, params) => {
      const url = `${apiUrl}/${mapSpecificResource(resource)}/getMany`;
      return httpClient(url, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(params),
      }).then(({ json }) => ({ data: json }));
    },

    getManyReference: (resource, params) => {
      const url = `${apiUrl}/${mapSpecificResource(resource)}/getManyReference`;

      return httpClient(url, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(params),
      }).then(({ headers, json }) => ({
        data: json.results,
        total: json.count,
      }));
    },

    update: (resource, params) => {
      const urlBase = `${apiUrl}/${mapSpecificResource(resource)}`;

      const urlDetail = params.action ? `action/${params.action}` : params.id;

      return httpClient(`${urlBase}/${urlDetail}`, {
        method: params.action ? "POST" : "PUT",
        headers: getHeaders(),
        body: JSON.stringify(params.data),
      }).then(({ json }) => ({ data: json }));
    },

    archive: (resource, params) =>
      httpClient(`${apiUrl}/${mapSpecificResource(resource)}/archive/`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(params),
      }).then(({ json }) => ({ data: json })),

    updateMany: (resource, params) => {
      return httpClient(
        `${apiUrl}/${mapSpecificResource(resource)}/updateMany`,
        {
          method: "PUT",
          headers: getHeaders(),
          body: JSON.stringify(params),
        }
      ).then(({ json }) => ({ data: json }));
    },

    create: (resource, params) =>
      httpClient(`${apiUrl}/${mapSpecificResource(resource)}`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(params),
      }).then(({ json }) => ({
        data: { ...params.data, id: json.id },
      })),

    delete: (resource, params) =>
      httpClient(`${apiUrl}/${mapSpecificResource(resource)}/${params.id}`, {
        method: "DELETE",
        headers: getHeaders(),
      }).then(({ json }) => ({ data: json })),

    deleteMany: (resource, params) => {
      return httpClient(`${apiUrl}/${mapSpecificResource(resource)}`, {
        method: "DELETE",
        headers: getHeaders(),
        body: JSON.stringify(params),
      }).then(({ json }) => ({ data: json }));
    },
  };
};

export default dataProvider();
