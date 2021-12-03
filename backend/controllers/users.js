import { db } from '../db/connection.js';

export const createUser = (req, res) => {
    const { newUser } = req.body;
    const sql = `INSERT INTO users SET ?`

    db.query(sql, newUser, (err, result) => {
        if (err) throw err;
        res.send(`User with the name ${newUser.first_name} added to the database!`)
    });
}

export const getAllUsers = (req, res) => {
    const sql = ` SELECT * FROM users ORDER BY users.first_name`;

    db.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
}

export const getUser = (req, res) => {
    const sql = `SELECT * FROM users WHERE id=${req.params.id}`;

    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
}

export const updateUser = (req, res) => {
    const { id } = req.params;
    let query = '';
    const params = [];
    for (const key in req.body) {
        query = `${query} ${key} = ?`;
        params.push(req.body[key])
    }
    const sql = `UPDATE users SET ${query} WHERE id=${id}`;

    db.query(sql, params, (err, result) => {
        if (err) throw err;
        res.send(`User with the id:${id} updated in the database!`)
    });
}

export const deleteUser = (req, res) => {
    const { id } = req.params;
    const sql = `DELETE FROM users WHERE id=${id}`;

    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send(`User with the id:${id} deleted from the database!`)
    });
}