const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors');
const pool = require('../dbConnect/connect'); // Adjust the path as needed

require('dotenv').config();

app.use(cors());

// Middleware to log when the server is connected to the database
pool.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
  } else {
    console.log('Connected to the database');
  }
});

// Middleware to log incoming requests
app.use((req, res, next) => {
  console.log(`Received request from front end: ${req.method} ${req.url}`);
  next();
});
app.use(express.json()); // Add this line to parse JSON request bodies


// Define a POST route to handle the cookie and increment the view count
app.post('/increment-view-count', async (req, res) => {
  try {
    const client = await pool.connect();

    // Extract the cookie value from the request body
    const { cookie } = req.body;

    if (!cookie) {
      return res.status(400).json({ error: 'Cookie is required in the request body' });
    }

    // Check if the cookie already exists
    const checkCookie = await client.query('SELECT * FROM user_visits WHERE cookie = $1', [cookie]);

    if (checkCookie.rows.length === 0) {
      // Insert new cookie record
      await client.query('INSERT INTO user_visits (cookie, first_visit, last_visit, visit_count) VALUES ($1, NOW(), NOW(), 1)', [cookie]);
    } else {
      // Update existing cookie record
      await client.query('UPDATE user_visits SET last_visit = NOW(), visit_count = visit_count + 1 WHERE cookie = $1', [cookie]);
    }

    client.release();
    res.status(200).json({ message: 'Cookie count incremented successfully' });
  } catch (error) {
    console.error('Error handling cookie:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.get('/data', async (req, res) => {
  try {
    const client = await pool.connect();
    
    // Assuming you want to get the total of all visit_counts
    const result = await client.query('SELECT SUM(visit_count) AS total_count FROM user_visits');
    client.release();

    const totalViewCount = result.rows[0].total_count;

    res.json({ totalViewCount });
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
// Fetch user visit data based on their ID
app.get('/user-visits/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const client = await pool.connect();

    // Query to fetch user visit data for a specific ID
    const result = await client.query('SELECT * FROM user_visits WHERE id = $1', [userId]);
    client.release();

    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ error: 'User data not found' });
    }
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
