require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 5002;

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '', // Empty password as per your config
  database: 'clubs_db'
};

// Middleware
app.use(cors());
app.use(bodyParser.json());


const db = mysql.createConnection(dbConfig);

db.connect(err => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to database.');
});

// Routes
app.get('/api/events', (req, res) => {
  db.query('SELECT * FROM events', (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    // Separate into current and upcoming
    const today = new Date().toISOString().split('T')[0];
    const categorized = {
      current: results.filter(event => event.date === today),
      upcoming: results.filter(event => event.date !== today)
    };

    res.json(categorized);
  });
});

app.post('/api/events', (req, res) => {
  const { title, date, time, location, description, category, image } = req.body;
  const status = date === new Date().toISOString().split('T')[0] ? 'current' : 'upcoming';

  db.query(
    'INSERT INTO events (title, date, time, location, description, category, image, attendees, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [title, date, time, location, description, category, image, 0, status],
    (err, result) => {
      if (err) {
        return res.status(400).json({ error: err.message });
      }
      res.json({ message: 'Event added successfully', id: result.insertId });
    }
  );
});

app.put('/api/events/:id', (req, res) => {
  const { id } = req.params;
  const { title, date, time, location, description, category, image } = req.body;
  const status = date === new Date().toISOString().split('T')[0] ? 'current' : 'upcoming';

  db.query(
    'UPDATE events SET title = ?, date = ?, time = ?, location = ?, description = ?, category = ?, image = ?, status = ? WHERE id = ?',
    [title, date, time, location, description, category, image, status, id],
    (err) => {
      if (err) {
        return res.status(400).json({ error: err.message });
      }
      res.json({ message: 'Event updated successfully' });
    }
  );
});

app.delete('/api/events/:id', (req, res) => {
  const { id } = req.params;

  db.query('DELETE FROM events WHERE id = ?', [id], (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.json({ message: 'Event deleted successfully' });
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});