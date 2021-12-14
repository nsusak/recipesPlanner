import authenticationService from "../../services/authenticationService";

export async function setAllRecipes(context) {
    const response = await authenticationService.getAllRecipes();
    const recipes = response.data;
    context.commit('getAllRecipes', recipes)
}

export async function deleteRecipe(context, payload) {
    await authenticationService.deleteRecipe(payload);
    context.commit("deleteRecipe", payload)
}