const { Pool } = require('pg');

// Create a connection pool
const pool = new Pool({
  user: 'pstgres',
  host: 'localhost',
  database: 'cst_student_records',
  password: 'Dechen_postgre2026', // add your password here
  port: 5432
});

// Test the connection and run a query
async function testConnection() {
  let client;

  try {
    // Get a client from the pool
    client = await pool.connect();
    console.log('Connected to PostgreSQL database!');

    // Run a simple query
    const result = await client.query('SELECT * FROM student');

    // Print the results
    console.log('student in database:');
    console.table(result.rows);

    // Count rows
    console.log(`Total students: ${result.rowCount}`);
  } catch (err) {
    console.error('Database connection error:', err);
  } finally {
    // Release the client back to the pool
    if (client) client.release();

    // Close the pool
    await pool.end();
    console.log('Connection pool closed');
  }
}

// Run the test
testConnection();