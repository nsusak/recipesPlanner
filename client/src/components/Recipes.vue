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
      <template v-slot:item="props">
        <q-card class="q-pa-md my-card">
          <q-card-section>
            <div class="text-h6">{{ props.row.title }}</div>
            <div class="text-subtitle2">
              Published: {{ props.row.published_date }}
            </div>
          </q-card-section>
          <q-card-section>
            <div class="text-h6">Ingredients</div>
            <div class="text-subtitle2">
              {{ props.row.ingredients_needed }}
            </div>
          </q-card-section>
          <q-separator />
          <q-card-section>
            <div class="text-subtitle2">Preparation</div>
            {{ props.row.body }}
          </q-card-section>
          <q-separator />
          <q-card-actions align="center">
            <q-btn flat label="Edit" @click="editRecipe(props.row.id)" />
            <q-btn flat label="Delete" @click="deleteRecipe(props.row.id)" />
          </q-card-actions>
        </q-card>
      </template>

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
    editRecipe(id) {
      console.log(id);
    },
    async deleteRecipe(id) {
      await authenticationService.deleteRecipe(id);
      await this.getAllRecipes();
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
.my-card {
  height: 400px;
  margin: 20px 40px;
  overflow: hidden;
  overflow: auto;
  width: 20%;
  min-width: 300px;
}

.q-table__grid-item-title {
  color: teal;
}
</style>

