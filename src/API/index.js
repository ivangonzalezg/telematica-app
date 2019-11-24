import axios from "axios";

const { hostname, protocol } = window.location;
const baseURL = `${protocol}//${hostname}:5000/api`;
axios.defaults.baseURL = baseURL;

const GET = "GET";
const POST = "POST";
const PATCH = "PATCH";
const DELETE = "DELETE";

export default {
  charge: {
    get: async () => {
      const url = "/charge";
      const r = await axios({
        url,
        method: GET
      });
      return r.data;
    },
    post: async name => {
      const url = "/charge";
      const r = await axios({
        url,
        method: POST,
        data: { name }
      });
      return r.data;
    },
    patch: async (id, name) => {
      const url = "/charge";
      const r = await axios({
        url,
        method: PATCH,
        data: { id, name }
      });
      return r.data;
    },
    delete: async id => {
      const url = "/charge";
      const r = await axios({
        url,
        method: DELETE,
        data: { id }
      });
      return r.data;
    }
  },
  place: {
    get: async () => {
      const url = "/place";
      const r = await axios({
        url,
        method: GET
      });
      return r.data;
    },
    post: async (name, address, city) => {
      const url = "/place";
      const r = await axios({
        url,
        method: POST,
        data: { name, address, city }
      });
      return r.data;
    },
    patch: async (id, name, address, city) => {
      const url = "/place";
      const r = await axios({
        url,
        method: PATCH,
        data: { id, name, address, city }
      });
      return r.data;
    },
    delete: async id => {
      const url = "/place";
      const r = await axios({
        url,
        method: DELETE,
        data: { id }
      });
      return r.data;
    }
  },
  party: {
    get: async () => {
      const url = "/party";
      const r = await axios({
        url,
        method: GET
      });
      return r.data;
    },
    post: async name => {
      const url = "/party";
      const r = await axios({
        url,
        method: POST,
        data: { name }
      });
      return r.data;
    },
    patch: async (id, name) => {
      const url = "/party";
      const r = await axios({
        url,
        method: PATCH,
        data: { id, name }
      });
      return r.data;
    },
    delete: async id => {
      const url = "/party";
      const r = await axios({
        url,
        method: DELETE,
        data: { id }
      });
      return r.data;
    }
  },
  candidate: {
    get: async () => {
      const url = "/candidate";
      const r = await axios({
        url,
        method: GET
      });
      return r.data;
    },
    post: async (name, identification, charge, party, photo, plan, resume) => {
      const url = "/candidate";
      const r = await axios({
        url,
        method: POST,
        data: { name, identification, charge, party, photo, plan, resume }
      });
      return r.data;
    },
    patch: async (id, name, identification, charge, party, photo, plan, resume) => {
      const url = "/candidate";
      const r = await axios({
        url,
        method: PATCH,
        data: { id, name, identification, charge, party, photo, plan, resume }
      });
      return r.data;
    },
    delete: async id => {
      const url = "/candidate";
      const r = await axios({
        url,
        method: DELETE,
        data: { id }
      });
      return r.data;
    }
  },
  voter: {
    get: async () => {
      const url = "/voter";
      const r = await axios({
        url,
        method: GET
      });
      return r.data;
    },
    post: async (name, identification, city, place) => {
      const url = "/voter";
      const r = await axios({
        url,
        method: POST,
        data: { name, identification, city, place }
      });
      return r.data;
    },
    patch: async (id, name, identification, city, place) => {
      const url = "/voter";
      const r = await axios({
        url,
        method: PATCH,
        data: { id, name, identification, city, place }
      });
      return r.data;
    },
    delete: async id => {
      const url = "/voter";
      const r = await axios({
        url,
        method: DELETE,
        data: { id }
      });
      return r.data;
    }
  }
};
