import api from "./api.js";

export default {
  register(credentials) {
    return api().post("users", credentials);
  },
  getAllRecipes() {
    return api().get('recipes');
  },
  createNewRecipe(newRecipe) {
    return api().post('recipes', newRecipe)
  },
  deleteRecipe(recipeId) {
    return api().delete(`recipes/${recipeId}`)
  },
  getAllIngredients() {
    return api().get('ingredients');
  },
  createIngredient(newIngredient) {
    return api().post('ingredients', newIngredient);
  },
  getAllUnits() {
    return api().get('units');
  }
};
