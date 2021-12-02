import { db } from '../db/connection.js';

export const createRecipe = (req, res) => {
    const newRecipe = req.body;

    const sql = `INSERT INTO recipes SET ?`
    db.query(sql, newRecipe, (err, result) => {
        if (err) throw err;
        res.send(`Recipe for ${newRecipe.title} added to the database!`)
    });
}

export const getAllRecipes = (req, res) => {
    const sql = `SELECT * FROM recipes ORDER BY recipes.title`;

    db.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
}

export const getRecipe = (req, res) => {
    const sql = `SELECT * FROM recipes WHERE id=${req.params.id}`;

    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
}

export const updateRecipe = (req, res) => {
    const { id } = req.params;
    let query = '';
    const params = [];
    for (const key in req.body) {
        query = `${query} ${key} = ?`;
        params.push(req.body[key])
    }
    const sql = `UPDATE recipes SET ${query} WHERE id=${id}`;

    db.query(sql, params, (err, result) => {
        if (err) throw err;
        res.send(`Recipe with the id:${id} updated in the database!`)
    });
}

export const deleteRecipe = (req, res) => {
    const { id } = req.params;
    const sql = `DELETE FROM recipes WHERE id=${id}`;

    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send(`Recipe with the id:${id} deleted from the database!`)
    });
}