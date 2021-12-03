<template>
  <div>
    <div class="form">
      <h1 class="text-h3 q-ma-lg">Register</h1>

      <q-input
        class="q-ma-lg"
        rounded
        outlined
        v-model="newUser.first_name"
        placeholder="first name"
      />
      <q-input
        class="q-ma-lg"
        rounded
        outlined
        v-model="newUser.last_name"
        placeholder="last name"
      />
      <q-input
        class="q-ma-lg"
        rounded
        outlined
        v-model="newUser.email"
        placeholder="email"
      />
      <q-input
        class="q-ma-lg"
        rounded
        outlined
        v-model="newUser.location"
        placeholder="location"
      />
      <q-input
        class="q-ma-lg"
        rounded
        outlined
        v-model="newUser.password"
        placeholder="password"
      />
      <q-btn
        class="glossy q-ma-lg"
        color="teal"
        label="Register"
        @click="register"
      />
    </div>
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
      this.$router.push({ name: "Home" });
    },
  },
};
</script>
<style>
.form {
  margin: 0 auto;
  width: 600px;
}
</style>
