import createDatabasePool from '../db/pool.js';
const pool = createDatabasePool();

class UserContent {
    constructor(user) {
        this.userID = userID;
        this.date = new Date();
    }

    async fetchContent() {
        try {
            const [rows, fields] = await pool.query(`
                SELECT *
                FROM content
                WHERE user_id = ?
            `, [this.userID]);
            return rows;
        } catch (e) {
            console.error('Error executing query:', e);
        }
    }

    async uploadContent(newContent) {
        try {
            const [rows, fields] = await pool.query(`
                INSERT INTO content
                (user_id, content_src, created_at)
                VALUES (?, ?, ?)
            `, [this.userID, newContent, this.date.getTime()]);
        } catch (e) {
            console.error('Error executing query:', e);
        }
    }
}

export { UserContent };