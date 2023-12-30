/* Run this script once to initialize user database. */

import { Router } from 'express';
import { createPool } from 'mysql2/promise';

import dotenv from 'dotenv';
dotenv.config();

const router = Router();

const pool = createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

(async () => {
  try {
    const connection = await pool.getConnection();

    // create db
    await connection.query('CREATE DATABASE IF NOT EXISTS app');

    await connection.query(`USE app`);

    // create user table
    await connection.query(`CREATE TABLE users (
      user_id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL
    )`);

    // create content table
    await connection.query(`CREATE TABLE content (
      content_id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT NOT NULL,
      content_src TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(user_id)
    )`);

    connection.release();
    console.log('App database initialized successfully');
    pool.end();
  } catch (err) {
    console.error('Error creating user table:', err);
  }
})();

export { router };