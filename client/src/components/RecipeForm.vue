<template>
  <div>
    <form>
      <q-input
        class="form-input"
        filled
        v-model="newRecipe.title"
        id="title"
        label="Title"
      />
      <q-input
        class="form-input"
        filled
        v-model="newRecipe.ingredients_needed"
        id="ingredients"
        label="Ingredients"
      />
      <q-input
        class="form-input"
        filled
        v-model="newRecipe.body"
        id="preparation"
        type="textarea"
        label="Preparation"
      />
      <q-btn
        class="submit-button"
        color="secondary"
        label="Submit"
        @click="createRecipe(newRecipe)"
      />
    </form>
  </div>
</template>
<script>
import authenticationService from "../services/authenticationService";
export default {
  data() {
    return {
      newRecipe: {
        title: "",
        body: "",
        ingredients_needed: "",
      },
    };
  },
  methods: {
    async createRecipe(newRecipe) {
      await authenticationService.createNewRecipe(newRecipe);
      this.$emit("recipeCreated");
    },
  },
};
</script>

<style scoped>
.form-input {
  margin: 5px;
  width: 50%;
  margin: 5px auto;
}
form {
  text-align: center;
}
</style>