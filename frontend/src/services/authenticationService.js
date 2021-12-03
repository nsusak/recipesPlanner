import api from "@/services/api";

export default {
  register(credentials) {
    return api().post("users", credentials);
  },
};

// AuthenticationService.register({
//     first_name, last_name, email, password, location
// })
