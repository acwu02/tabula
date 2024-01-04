import createDatabasePool from '../db/pool.js';
const pool = createDatabasePool();

class UserContent {
    constructor(userID) {
        this.userID = userID;
    }

    async fetchContent() {
        try {
            // TODO query across tables
            // TODO decide if I want multiple tables?
            const [rows, fields] = await pool.query(`
                SELECT *
                FROM images
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
                INSERT INTO images
                (user_id, filename, originalname, mimetype, size, x, y)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            `, [this.userID, newContent.filename, newContent.originalname, newContent.mimetype, newContent.size, 5, 5]);
        } catch (e) {
            console.error('Error executing query:', e);
        }
    }

    async updateCoords(newCoords, filename) {
        console.log(newCoords, filename);
        try {
            const [rows, fields] = await pool.query(`
                UPDATE images
                SET x = ?, y = ?
                WHERE filename = ?
            `, [newCoords.x, newCoords.y, filename]);
        } catch (e) {
            console.error('Error executing query:', e);
        }
    }
}

export { UserContent };