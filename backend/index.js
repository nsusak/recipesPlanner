import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
//bodyparser 
import { initConnection } from './db/connection.js';
import usersRoutes from './routes/users.js';
import ingredientsRoutes from './routes/ingredients.js';
import recipesRoutes from './routes/recipes.js';

import { db } from '../backend/db/connection.js';
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

app.get('/units', (req, res) => {
    const sql = `SELECT * FROM measuring_units`;

    db.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

app.listen(PORT, () => console.log('Server started on port', PORT));