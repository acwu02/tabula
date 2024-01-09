import createDatabasePool from '../db/pool.js';
const pool = createDatabasePool();

class User {
    constructor(username, password) {
        this.username = username;
        this.password = password;
        this.id = null;
    }

    setID(id) {
        this.id = id;
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
            return rows[0].user_id;
        } catch (e) {
            console.error('Error executing query:', e);
        }
    }

    // TODO

    async fetchContent() {
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
                VALUES (?, ?);`,
            [this.username, this.password]);
            return await this.login();
        } catch (e) {
            console.error('Error executing query:', e);
        }
    }

    async getRandomUser() {
        try {
            const [rows, fields] = await pool.query(`
                SELECT *
                FROM users
                ORDER BY RANDOM()
                LIMIT 1;`,
            );
            return rows;
        } catch (e) {
            console.error('Error executing query:', e);
        }
    }
}

export { User };