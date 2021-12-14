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
      :rows="recipes"
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
            <q-popup-edit
              v-model="props.row.title"
              title="Edit the Title"
              auto-save
              v-slot="scope"
            >
              <q-input
                v-model="scope.value"
                dense
                autofocus
                counter
                @keyup.enter="editRecipe"
              />
            </q-popup-edit>
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

          <q-popup-edit buttons v-model="props.row.body" v-slot="scope">
            <q-input
              type="textarea"
              v-model="scope.value"
              autofocus
              counter
              @keyup.enter.stop
            />
          </q-popup-edit>

          <q-separator />
          <q-card-actions align="center">
            <q-btn flat label="Edit" @click="editRecipe(props.row)" />
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
      // recipes: [],
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
    createRecipe() {
      this.newRecipe = true;
    },
    editRecipe(id) {
      console.log(id);
      for (const row of this.rows) {
        if (id.id === row.id) {
          console.log(row);
        }
      }
    },
    async deleteRecipe(id) {
      await this.$store.dispatch("recipes/deleteRecipe", id);
      // await authenticationService.deleteRecipe(id);
      // await this.getAllRecipes();
    },
    recipeCreated() {
      this.newRecipe = false;
      this.getAllRecipes();
    },
  },
  async created() {
    // await this.getAllRecipes();
    await this.$store.dispatch("recipes/setAllRecipes");
  },
  computed: {
    recipes() {
      return this.$store.getters["recipes/getAllRecipes"];
    },
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

.text-h6 {
  color: teal;
}
</style>

