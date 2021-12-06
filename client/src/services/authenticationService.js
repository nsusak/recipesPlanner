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
  }
};
