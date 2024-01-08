/* Run this script once to initialize user database. */

import { Router } from 'express';
import { createPool } from 'mysql2/promise';

import dotenv from 'dotenv';
dotenv.config();

const router = Router();

const pool = createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
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

    // create image table
    await connection.query(`CREATE TABLE images (
      image_id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT NOT NULL,
      filename VARCHAR(255) NOT NULL,
      originalname VARCHAR(255) NOT NULL,
      mimetype VARCHAR(255) NOT NULL,
      size INT NOT NULL,
      x INT NOT NULL,
      y INT NOT NULL,
      height INT NOT NULL,
      width INT NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(user_id)
    );`);

    await connection.query(`CREATE TABLE texts (
      text_id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT NOT NULL,
      content VARCHAR(255) NOT NULL,
      x INT NOT NULL,
      y INT NOT NULL,
      height INT NOT NULL,
      width INT NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(user_id)
    );`);

    connection.release();
    console.log('App database initialized successfully');
    pool.end();
  } catch (err) {
    console.error('Error creating user table:', err);
  }
})();

export { router };