import createDatabasePool from '../db/pool.js';
const pool = createDatabasePool();

const INITIAL_POSITION = 5;
const INITIAL_TEXT_HEIGHT = 200;
const INITIAL_TEXT_WIDTH = 200;

class UserContent {
    constructor(userID) {
        this.userID = userID;
    }

    async fetchContent() {
        try {
            // TODO query across tables
            // TODO decide if I want multiple tables?
            const [images, fieldsImages] = await pool.query(`
                SELECT *
                FROM images
                WHERE user_id = ?
            `, [this.userID]);
            const [texts, fieldsTexts] = await pool.query(`
                SELECT *
                FROM texts
                WHERE user_id = ?
            `, [this.userID]);
            return { images: images, texts: texts };
        } catch (e) {
            console.error('Error executing query:', e);
        }
    }

    async uploadImage(newContent, height, width) {
        try {
            const [rows, fields] = await pool.query(`
                INSERT INTO images
                (user_id, filename, originalname, mimetype, size, x, y, height, width)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            `, [this.userID,
                newContent.filename,
                newContent.originalname,
                newContent.mimetype,
                newContent.size,
                INITIAL_POSITION,
                INITIAL_POSITION,
                height,
                width
            ]);
        } catch (e) {
            console.error('Error executing query:', e);
        }
    }

    async updateImageCoords(newCoords, filename) {
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

    async updateImageSize(newSize, filename) {
        try {
            const [rows, fields] = await pool.query(`
                UPDATE images
                SET height = ?, width = ?
                WHERE filename = ?
            `, [newSize.height, newSize.width, filename]);
        } catch (e) {
            console.error('Error executing query:', e);
        }
    }

    async uploadText(text) {
        try {
            const [rows, fields] = await pool.query(`
                INSERT INTO texts
                (user_id, content, x, y, height, width)
                VALUES (?, ?, ?, ?, ?, ?)
            `, [this.userID, text, INITIAL_POSITION, INITIAL_POSITION, INITIAL_TEXT_HEIGHT, INITIAL_TEXT_WIDTH])
        } catch (e) {
            console.error('Error executing query:', e);
        }
    }

    async updateTextCoords(newCoords, textID) {
        try {
            const [rows, fields] = await pool.query(`
                UPDATE texts
                SET x = ?, y = ?
                WHERE text_id = ?
            `, [newCoords.x, newCoords.y, textID])
        } catch (e) {
            console.error('Error executing query:', e);
        }
    }

    async updateTextContent(newContent, textID) {
        try {
            const [rows, fields] = await pool.query(`
                UPDATE texts
                SET content = ?
                WHERE text_id = ?
            `, [newContent, textID])
        } catch (e) {
            console.error('Error executing query:', e);
        }
    }

    async updateTextSize(newSize, id) {
        try {
            const [rows, fields] = await pool.query(`
                UPDATE texts
                SET height = ?, width = ?
                WHERE text_id = ?
            `, [newSize.height, newSize.width, id]);
        } catch (e) {
            console.error('Error executing query:', e);
        }
    }
}

export { UserContent };