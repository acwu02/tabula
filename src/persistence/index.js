const { Client } = require('pg');

const client = new Client({
  user: 'your-username',
  host: 'your-hostname',
  database: 'your-database-name',
  password: 'your-password',
  port: 5432, 
});

client.connect()
  .then(() => console.log('Connected to PostgreSQL database'))
  .catch(error => console.error('Error connecting to database:', error));

const sqlQuery = 'SELECT * FROM your_table_name';

client.query(sqlQuery)
  .then(result => {
    console.log('Fetched data:', result.rows);
    client.end(); // Close the database connection
  })
  .catch(error => console.error('Error executing SQL query:', error));
