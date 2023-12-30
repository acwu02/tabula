import { createPool } from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

function createDatabasePool() {
//   const pool = createPool({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
//     waitForConnections: true,
//     connectionLimit: 10,
//     queueLimit: 0,
//   });

  const pool = createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'Mike_trout27',
    database: 'app',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });

  return pool;
}

export default createDatabasePool;