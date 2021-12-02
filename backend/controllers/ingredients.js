import { db } from '../db/connection.js';

export const createIngredient = (req, res) => {
    const newIngredient = req.body;

    const sql = `INSERT INTO ingredients SET ?`
    db.query(sql, newIngredient, (err, result) => {
        if (err) throw err;
        res.send(`Ingredient ${newIngredient.name} added to the database!`)
    });
}

export const getAllIngredients = (req, res) => {
    const sql = ` SELECT * FROM ingredients ORDER BY ingredients.name`;

    db.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
}

export const getIngredient = (req, res) => {
    const sql = `SELECT * FROM ingredients WHERE id=${req.params.id}`;

    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
}

export const updateIngredient = (req, res) => {
    const { id } = req.params;
    let query = '';
    const params = [];
    for (const key in req.body) {
        query = `${query} ${key} = ?`;
        params.push(req.body[key])
    }
    const sql = `UPDATE ingredients SET ${query} WHERE id=${id}`;

    db.query(sql, params, (err, result) => {
        if (err) throw err;
        res.send(`Ingredient with the id:${id} updated in the database!`)
    });
}

export const deleteIngredient = (req, res) => {
    const { id } = req.params;
    const sql = `DELETE FROM ingredients WHERE id=${id}`;

    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send(`Ingredient with the id:${id} deleted from the database!`)
    });
}