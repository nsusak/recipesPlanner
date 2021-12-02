import express from 'express';
import { getAllIngredients, createIngredient, getIngredient, updateIngredient, deleteIngredient } from '../controllers/ingredients.js';

const router = express.Router();

//routes start with /ingredients
//GET ALL INGREDIENTS
router.get('/', getAllIngredients);

//CREATE NEW INGREDIENT
router.post('/', createIngredient);

//GET A SINGLE INGREDIENT
router.get('/:id', getIngredient);

//UPDATE INGREDIENT
router.patch('/:id', updateIngredient)

//DELETE INGREDIENT
router.delete('/:id', deleteIngredient);

export default router;