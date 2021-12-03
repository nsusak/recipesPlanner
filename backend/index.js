import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
//bodyparser 
import { initConnection } from './db/connection.js';
import usersRoutes from './routes/users.js';
import ingredientsRoutes from './routes/ingredients.js';
import recipesRoutes from './routes/recipes.js';

initConnection();

const PORT = 5000;
const app = express();

app.use(express.json());
app.use(morgan('combined'));
app.use(cors());
app.use('/users', usersRoutes);
app.use('/ingredients', ingredientsRoutes);
app.use('/recipes', recipesRoutes);


app.get('/', (req, res) => res.send('Hello from Home page'));


app.listen(PORT, () => console.log('Server started on port', PORT));