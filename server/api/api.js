const express = require('express');
const router = express.Router();
const pool = require('../db/index.js');

router.get('/api/test', (req, res) => {
    res.send({ message: 'Hello, World!' });
});

router.get('/api/data', (req, res) => {
    try {
        pool.query('SELECT * FROM user_data', (error, results) => {
            if (error) {
                console.error('Error executing query:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            } else {
                res.status(200).json(results.rows);
            }
        });
    } catch (err) {
        console.error('Error processing request:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/api/data', (req, res) => {
    try {
        const { files } = req.body;
        if (!files) {
            return res.status(400).json({ error: 'Missing required field' });
        }
        pool.query('INSERT INTO')
    } catch (err) {
        console.error('Error processing request:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.use((req, res) => {
    res.status(404).json({ error: 'Not Found' });
});

module.exports = router;
