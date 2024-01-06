// connect.js
const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  database: 'portfoliodb', // Update to the correct database name
  port: process.env.DB_PORT || 5432,
});

module.exports = pool;
