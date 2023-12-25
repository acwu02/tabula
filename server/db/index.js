const express = require('express');
const { Pool } = require('pg');
const router = express.Router();

const pool = new Pool({
  user: 'postgresql',
  host: 'localhost',
  database: 'test_database',
  password: 'password',
  port: 5432,
});

router.post('/api/initialize-table', async (req, res) => {
  try {
      const createTableQuery = `
          CREATE TABLE IF NOT EXISTS user_data (
              id serial PRIMARY KEY,
              texts text,
              images text,
              links text
          );
      `;
      await pool.query(createTableQuery);

      res.status(200).json({ message: 'Table initialized successfully' });
  } catch (err) {
      console.error('Error initializing table:', err);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});


module.exports = router;