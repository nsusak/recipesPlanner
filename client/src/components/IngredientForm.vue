<template>
  <div>
    <q-input
      rounded
      outlined
      label="Enter Ingredient"
      v-model="newIngredient.name"
    />
    <q-input
      rounded
      outlined
      label="Category"
      v-model="newIngredient.category"
    />
    <q-btn color="secondary" label="Submit" @click="createNewIngredient" />
  </div>
</template>
<script>
import authenticationService from "../services/authenticationService";

export default {
  data() {
    return {
      newIngredient: {
        name: "",
        category: "",
      },
    };
  },
  methods: {
    async createNewIngredient() {
      await authenticationService.createIngredient(this.newIngredient);
      this.newIngredient = {};
      this.$emit("ingredientCreated");
    },
  },
};
</script>
