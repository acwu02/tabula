import createDatabasePool from '../db/pool.js';
const pool = createDatabasePool();

class User {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }

    async existsInDB() {
        try {
            const [rows, fields] = await pool.query(`
                SELECT *
                FROM users
                WHERE username = ?`, [this.username]);
            return (rows.length > 0);
        } catch (e) {
            console.error('Error executing query:', e);
        }
    }

    async validatePassword() {
        try {
            const [rows, fields] = await pool.query(`
                SELECT *
                FROM users
                WHERE username = ? AND password = ?`, [this.username, this.password]);
            return (rows.length > 0);
        } catch (e) {
            console.error('Error executing query:', e);
        }
    }

    async login() {
        try {
            const [rows, fields] = await pool.query(`
                SELECT *
                FROM users
                WHERE username = ?`, [this.username]);
            console.log(rows);
        } catch (e) {
            console.error('Error executing query:', e);
        }
    }

    async retrieveContent() {
        try {

        } catch (e) {
            console.error('Error executing query:', e);
        }
    }

    async create() {
        try {
            await pool.query(`
                INSERT INTO
                users (username, password)
                VALUES (?, ?);`, [this.username, this.password]);
        } catch (e) {
            console.error('Error executing query:', e);
        }
    }

    // For debugging
    async dumpDB() {
        try {
            let response = await pool.query(`
                SELECT *
                FROM users;`);
            return response;
        } catch (e) {
            console.error('Error executing query:', e);
        }
    }
}

export { User };