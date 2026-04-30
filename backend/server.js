const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = Number(process.env.PORT || 4000);

const pool = new Pool({
  host: process.env.DB_HOST || 'db',
  port: Number(process.env.DB_PORT || 5432),
  database: process.env.POSTGRES_DB || 'uber_clone',
  user: process.env.POSTGRES_USER || 'postgres',
  password: process.env.POSTGRES_PASSWORD || 'example'
});

app.get('/api/status', (req, res) => {
  res.json({ status: 'ok', service: 'googoo-api', timestamp: new Date().toISOString() });
});

app.get('/api/rides', async (req, res) => {
  try {
    const result = await pool.query('SELECT 1 AS example');
    res.json({ rides: [], db: result.rows[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Googoo API running on port ${port}`);
});
