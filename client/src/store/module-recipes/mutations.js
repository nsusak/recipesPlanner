import state from "./state"

export function getAllRecipes(state, payload) {
    state.allRecipes = payload;
}

export function deleteRecipe(state, payload) {
    let output = [];
    state.allRecipes.forEach(recipe => {
        if (recipe.id !== payload) {
            output.push(recipe)
        }
    });
    state.allRecipes = output;
}