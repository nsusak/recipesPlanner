<template>
  <div>
    <h1>Register</h1>
    <input
      type="text"
      name="first_name"
      v-model="newUser.first_name"
      placeholder="first name"
    />
    <input
      type="text"
      name="last_name"
      v-model="newUser.last_name"
      placeholder="last name"
    />
    <br />
    <input
      type="email"
      name="email"
      v-model="newUser.email"
      placeholder="email"
    />
    <br />
    <input
      type="text"
      name="location"
      v-model="newUser.location"
      placeholder="location"
    />
    <input
      type="password"
      name="password"
      v-model="newUser.password"
      placeholder="password"
    />
    <button @click="register">Register</button>
  </div>
</template>

<script>
import authenticationService from "../services/authenticationService";
export default {
  data() {
    return {
      newUser: {
        first_name: "",
        last_name: "",
        email: "",
        location: "",
        password: "",
      },
    };
  },
  methods: {
    async register() {
      const response = await authenticationService.register({
        newUser: this.newUser,
      });
      console.log(response.data);
      console.log("the register button has been clicked", this.newUser);
    },
  },
};
</script>
<style></style>
