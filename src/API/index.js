import axios from "axios";

let baseURL = "http://votaciones-telematica.herokuapp.com/api";
if (window.location.hostname === "localhost") baseURL = "http://localhost:5000/api";
axios.defaults.baseURL = baseURL;

const GET = "GET";
const POST = "POST";
const PATCH = "PATCH";
const DELETE = "DELETE";

export default {
  charge: {
    get: async query => {
      const url = "/charge?" + (query ? query : "");
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
    get: async query => {
      const url = "/place?" + (query ? query : "");
      const r = await axios({
        url,
        method: GET
      });
      return r.data;
    },
    post: async (name, address, city, state) => {
      const url = "/place";
      const r = await axios({
        url,
        method: POST,
        data: { name, address, city, state }
      });
      return r.data;
    },
    patch: async (id, name, address, city, state) => {
      const url = "/place";
      const r = await axios({
        url,
        method: PATCH,
        data: { id, name, address, city, state }
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
    get: async query => {
      const url = "/party?" + (query ? query : "");
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
    get: async query => {
      const url = "/candidate?" + (query ? query : "");
      const r = await axios({
        url,
        method: GET
      });
      return r.data;
    },
    post: async (name, identification, charge, party, photo, plan, resume, location) => {
      const url = "/candidate";
      const r = await axios({
        url,
        method: POST,
        data: { name, identification, charge, party, photo, plan, resume, location }
      });
      return r.data;
    },
    patch: async (id, name, identification, charge, party, photo, plan, resume, location) => {
      const url = "/candidate";
      const r = await axios({
        url,
        method: PATCH,
        data: { id, name, identification, charge, party, photo, plan, resume, location }
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
    get: async query => {
      const url = "/voter?" + (query ? query : "");
      const r = await axios({
        url,
        method: GET
      });
      return r.data;
    },
    post: async (name, identification, city, place, state) => {
      const url = "/voter";
      const r = await axios({
        url,
        method: POST,
        data: { name, identification, city, place, state }
      });
      return r.data;
    },
    patch: async (id, name, identification, city, place, state) => {
      const url = "/voter";
      const r = await axios({
        url,
        method: PATCH,
        data: { id, name, identification, city, place, state }
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
  },
  vote: {
    get: async query => {
      const url = "/vote?" + (query ? query : "");
      const r = await axios({
        url,
        method: GET
      });
      return r.data;
    },
    post: async (voter, candidate, charge, location, place) => {
      const url = "/vote";
      const r = await axios({
        url,
        method: POST,
        data: { voter, candidate, charge, location, place }
      });
      return r.data;
    }
  },
  getParams: data => {
    return Object.keys(data)
      .map(k => {
        return `${k}=${data[k]}`;
      })
      .join("&");
  },
  baseURL
};
