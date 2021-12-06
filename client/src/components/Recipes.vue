<template>
  <div class="q-pa-md">
    <q-btn
      color="secondary"
      label="Create a new recipe!"
      @click="createRecipe"
    />
    <RecipeForm v-if="newRecipe" v-on:recipeCreated="recipeCreated" />

    <q-table
      :rows-per-page-options="[8, 12, 16]"
      grid
      title="All Recipes"
      :rows="rows"
      :columns="columns"
      row-key="name"
      :filter="filter"
      hide-header
      card-class="grid-items"
    >
      <template v-slot:top-right>
        <q-input
          borderless
          dense
          debounce="300"
          v-model="filter"
          placeholder="Search"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
    </q-table>
  </div>
</template>
<script>
import { ref } from "vue";
import authenticationService from "../services/authenticationService";
import RecipeForm from "./RecipeForm.vue";

export default {
  setup() {
    return {
      filter: ref(""),
      //   columns,
      //   rows,
    };
  },
  components: {
    RecipeForm,
  },
  data() {
    return {
      recipes: [],
      rows: [],
      columns: [
        {
          name: "desc",
          required: true,
          label: "Recipe title",
          align: "left",
          field: (row) => row.title,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "published_date",
          align: "center",
          label: "Date published",
          field: "published_date",
          sortable: true,
        },
        {
          name: "ingredients_needed",
          label: "Ingredients needed",
          field: "ingredients_needed",
          sortable: true,
        },
        { name: "body", label: "Preparation", field: "body" },
      ],
      newRecipe: false,
    };
  },
  methods: {
    async getAllRecipes() {
      const response = await authenticationService.getAllRecipes();
      const recipesIn = response.data;
      this.rows = recipesIn;
      //   this.recipes = response.data;
      //   console.log(this.recipes);
    },
    createRecipe() {
      if (confirm("Do you want to create a new recipe?")) {
        this.newRecipe = true;
      }
    },
    recipeCreated() {
      this.newRecipe = false;
      this.getAllRecipes();
    },
  },
  async created() {
    await this.getAllRecipes();
  },
};
</script>

<style>
.grid-items {
  height: 350px;
  margin: 20px 40px;
  overflow: hidden;
  overflow: auto;
}

.q-table__grid-item-title {
  color: teal;
}
</style>

