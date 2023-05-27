const express = require('express');
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.URL,
});

const app = express();
const port = process.env.PORT || 4500; // Change this to your desired port

app.use(express.json());

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Get all animes
app.get('/animes', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM animes');
    const animes = result.rows;
    client.release();
    res.json(animes);
  } catch (err) {
    console.error('Error fetching animes:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get an anime by ID
app.get('/animes/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM animes WHERE id = $1', [id]);
    const anime = result.rows[0];
    client.release();
    if (anime) {
      res.json(anime);
    } else {
      res.status(404).json({ error: 'Anime not found' });
    }
  } catch (err) {
    console.error('Error fetching anime:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create a new anime
app.post('/animes', async (req, res) => {
  const { name, rating, protagonist } = req.body;
  try {
    const client = await pool.connect();
    const result = await client.query('INSERT INTO animes (name, rating, protagonist) VALUES ($1, $2, $3) RETURNING *', [name, rating, protagonist]);
    const anime = result.rows[0];
    client.release();
    res.json(anime);
  } catch (err) {
    console.error('Error creating anime:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update an existing anime
app.put('/animes/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const { name, rating, protagonist } = req.body;
  try {
    const client = await pool.connect();
    const result = await client.query('UPDATE animes SET name = $1, rating = $2, protagonist = $3 WHERE id = $4 RETURNING *', [name, rating, protagonist, id]);
    const updatedAnime = result.rows[0];
    client.release();
    res.json(updatedAnime);
  } catch (err) {
    console.error('Error updating anime:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete an anime
app.delete('/animes/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const client = await pool.connect();
    const result = await client.query('DELETE FROM animes WHERE id = $1 RETURNING *', [id]);
    const deletedAnime = result.rows[0];
    client.release();
    if (deletedAnime) {
      res.json(deletedAnime);
    } else {
      res.status(404).json({ error: 'Anime not found' });
    }
  } catch (err) {
    console.error('Error deleting anime:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});
