<template>
  <div>
    <q-timeline-entry heading> All Ingredients </q-timeline-entry>

    <q-btn
      color="secondary"
      label="Create a new ingredient!"
      @click="createIngredient"
    />
    <IngredientForm
      v-on:ingredientCreated="ingredientCreated"
      v-if="newIngredient"
    />

    <div class="q-pa-md" style="max-width: 350px">
      <q-list bordered separator>
        <q-item
          clickable
          v-ripple
          v-for="ingredient of ingredients"
          :key="ingredient.id"
        >
          <q-item-section>
            <q-item-label overline
              >CATEGORY {{ ingredient.category }}</q-item-label
            >
            <q-item-label
              >{{ ingredient.name }} added
              {{ formatDate(ingredient.date_added) }}
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </div>
</template>
<script>
import authenticationService from "../services/authenticationService";
import IngredientForm from "./IngredientForm.vue";
import moment from "moment";

export default {
  data() {
    return {
      newIngredient: false,
      ingredients: [],
    };
  },
  filters: {},
  components: {
    IngredientForm,
  },
  async created() {
    await this.getAllIngredients();
  },
  methods: {
    async getAllIngredients() {
      const response = await authenticationService.getAllIngredients();
      this.ingredients = response.data;
      console.log(this.ingredients);
      this.ingredients.sort((a, b) => {
        if (a.category < b.category) {
          return -1;
        }
        return 1;
      });
    },
    formatDate(value) {
      if (value) {
        return moment(String(value)).format("MM/DD/YYYY hh:mm");
      }
    },
    createIngredient() {
      this.newIngredient = true;
    },
    async ingredientCreated() {
      await this.getAllIngredients();
    },
  },
};
</script>
<style scoped>
</style>