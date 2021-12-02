import express from 'express';
import { getAllUsers, createUser, getUser, updateUser, deleteUser } from '../controllers/users.js';

const router = express.Router();

//routes start with /users
//GET ALL USERS
router.get('/', getAllUsers);

//POST NEW USER
router.post('/', createUser);

//GET A SINGLE USER
router.get('/:id', getUser);


//UPDATE A USER
router.patch('/:id', updateUser);

//DELETE A USER
router.delete('/:id', deleteUser);


export default router;