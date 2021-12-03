import api from "./api.js";

export default {
  register(credentials) {
    return api().post("users", credentials);
  },
};
