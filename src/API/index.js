import axios from "axios";

const baseURL = `http://localhost:5000/api`;
axios.defaults.baseURL = baseURL;

const GET = "GET";
const POST = "POST";

export default {
  voter: {
    get: async params => {
      const url = "/voter?" + params;
      const r = await axios({
        url,
        method: GET
      });
      return r.data;
    }
  },
  buses: {
    post: async (title, id, latitude, longitude) => {
      const url = "/buses";
      const r = await axios({
        url,
        method: POST,
        data: {
          title,
          id,
          latitude,
          longitude
        }
      });
      return r.data;
    }
  }
};
