import mysql from 'mysql';
import { connData } from './connData.js';

export const db = mysql.createConnection(connData);
export const initConnection = () => {
    db.connect((err) => {
        if (err) {
            throw err;
        }
        console.log('MySql Connected..')
    });
}