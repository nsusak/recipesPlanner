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
      <div class="row form-input">
        <div class="col-4">
          <q-select
            filled
            emit-value
            map-options
            class="full-width"
            v-model="newIngredient.ingredientId"
            option-value="id"
            option-label="name"
            use-input
            hide-selected
            fill-input
            input-debounce="0"
            :options="ingredients"
            @filter="filterFn"
            hint="Basic filtering"
            style="width: 250px; padding-bottom: 32px"
          >
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey"> No results </q-item-section>
              </q-item>
            </template>
          </q-select>
        </div>
        <div class="col-4">
          <q-select
            filled
            emit-value
            map-options
            class="full-width"
            v-model="newIngredient.measureUnit"
            option-value="id"
            option-label="unit_name"
            use-input
            hide-selected
            fill-input
            input-debounce="0"
            :options="measuring_units"
            @filter="filterFn"
            hint="Basic filtering"
            style="width: 250px; padding-bottom: 32px"
          >
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey"> No results </q-item-section>
              </q-item>
            </template>
          </q-select>
        </div>
        <div class="col-4">
          <q-input
            v-model="newIngredient.quantity"
            type="text"
            label="Quantity"
            @keyup.enter="submitIngredient"
          />
        </div>
      </div>
      <!-- <div v-if="ingredientsAdded">
        <div v-for="item of ingredientsAdded" :key="item.ingredientId">
          {{ item.quantity }} {{ item.measureUnit }} of {{ item.ingredientId }}
        </div>
      </div> -->

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
        ingredients_needed: [],
      },
      measuring_units: [],
      ingredients: [],
      search: "",
      quantity: "",
      newIngredient: {
        quantity: "",
        measureUnit: "",
        ingredientId: "",
      },
      ingredientsAdded: [],
    };
  },
  async created() {
    const response = await authenticationService.getAllUnits();
    this.measuring_units = response.data;

    const responseIng = await authenticationService.getAllIngredients();
    this.ingredients = responseIng.data;
  },
  methods: {
    async createRecipe(newRecipe) {
      await authenticationService.createNewRecipe(newRecipe);
      this.$emit("recipeCreated");
    },
    submitIngredient() {
      this.ingredientsAdded.push(this.newIngredient);
      this.newIngredient = {};
      console.log(this.ingredientsAdded);
    },
    // filterFn(val, update, abort) {
    //   update(() => {
    //     const needle = val.toLowerCase();
    //     ingredients.name = stringOptions.filter(
    //       (v) => v.toLowerCase().indexOf(needle) > -1
    //     );
    //   });
    // },
  },
  computed: {
    filteredList() {
      console.log(this.ingredients);
      return this.ingredients.filter((ingredient) => {
        return ingredient.name.toLowerCase().includes(this.search.toLowerCase);
      });
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

.ingredient-form {
  display: flex;
  justify-content: center;
}
</style>