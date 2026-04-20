// server.js
const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// PostgreSQL connection
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'cst_student_records',
  password: 'Dechen_postgre2026',
  port: 5432
});

// Test database connection
pool.connect()
  .then(client => {
    console.log('✅ Connected to PostgreSQL database');
    client.release();
  })
  .catch(err => {
    console.error('❌ PostgreSQL connection error:', err);
  });

// Root endpoint
app.get('/', (req, res) => {
  res.send('Student Records API is running');
});

// GET all students
app.get('/api/student', async (req, res) => {
  console.log("Received GET request at /api/student"); // Debug
  try {
    const result = await pool.query('SELECT * FROM student');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching student:', err);
    res.status(500).json({ error: 'Failed to fetch students' });
  }
});

// POST new student
app.post('/api/student', async (req, res) => {
  const { name, email, course, time } = req.body;
  console.log("POST request received:", req.body); // Debug

  if (!name || !email || !course || !time) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO student (name, email, course, time) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, email, course, time]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    
    console.error('Error adding student:', err);
    res.status(500).json({ error: 'Failed to add student' });
  }
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});