import express from 'express';
import { getAllRecipes, createRecipe, getRecipe, updateRecipe, deleteRecipe } from '../controllers/recipes.js';

const router = express.Router();

//routes start with /recipes
//GET ALL RECIPES
router.get('/', getAllRecipes);

//POST NEW RECIPE
router.post('/', createRecipe);

//GET A SINGLE RECIPE
router.get('/:id', getRecipe);


//UPDATE A RECIPE
router.patch('/:id', updateRecipe);

//DELETE A RECIPE
router.delete('/:id', deleteRecipe);


export default router;