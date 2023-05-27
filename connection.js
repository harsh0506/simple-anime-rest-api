const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.URL,
});
// Create the 'animes' table
async function createAnimesTable() {
    try {
        const client = await pool.connect();
        const query = `
      CREATE TABLE IF NOT EXISTS animes (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255),
        rating FLOAT,
        protagonist VARCHAR(255)
      );
    `;
        await client.query(query);
        client.release();
        console.log('Animes table created successfully');
    } catch (err) {
        console.error('Error creating animes table:', err);
    }
}

// Call the function to create the 'animes' table
createAnimesTable();
