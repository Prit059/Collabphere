const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "clubs_db"
});

db.connect(err => {
    if (err) console.error("Database connection failed:", err);
    else console.log("Connected to database");
});

// Student APIs
app.get("/students", (req, res) => {
    db.query("SELECT * FROM students", (err, result) => {
        if (err) res.status(500).send(err);
        else res.json(result);
    });
});
app.put("/update-status", (req, res) => {
    const { id, status } = req.body;

    if (!id || !status) {
        return res.status(400).json({ error: "Student ID and status are required." });
    }

    const sql = "UPDATE students SET status = ? WHERE id = ?";
    db.query(sql, [status, id], (err, result) => {
        if (err) {
            console.error("SQL Error:", err);
            return res.status(500).json({ error: err.sqlMessage });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Student not found." });
        }

        console.log("Update successful:", result);
        res.json({ message: "Status updated successfully!" });
    });
});

app.get("/student-counts", (req, res) => {
    const query = `
        SELECT 
            (SELECT COUNT(*) FROM students WHERE status = 'pending') AS pending_students,
            (SELECT COUNT(*) FROM students WHERE status = 'accepted') AS total_students;
    `;

    db.query(query, (err, result) => {
        if (err) {
            console.error("SQL Error:", err);
            return res.status(500).json({ error: "Failed to fetch student counts." });
        }
        res.json(result[0]);
    });
});

app.post("/join-club", (req, res) => {
    const { name, student_id, email, year, semester } = req.body;
    if (!name || !student_id || !email || !year || !semester) {
        return res.status(400).json({ error: "All fields are required." });
    }

    db.query("INSERT INTO students (name, student_id, email, year, semester) VALUES (?, ?, ?, ?, ?)",
        [name, student_id, email, year, semester],
        (err, result) => {
            if (err) return res.status(500).json({ error: err.sqlMessage });
            res.status(201).json({ message: "Student registered successfully!" });
        }
    );
});

// Club APIs
app.post("/add-club", (req, res) => {
    const { club_name, description, faclty, student } = req.body;
    if (!club_name || !description || !faclty || !student) {
        return res.status(400).json({ error: "All fields are required." });
    }

    db.query("INSERT INTO clubs (club_name, description, faclty, student) VALUES (?, ?, ?, ?)",
        [club_name, description, faclty, student],
        (err, result) => {
            if (err) return res.status(500).json({ error: "Database insertion failed." });
            res.json({ message: "Club added successfully!", insertId: result.insertId });
        }
    );
});

// Start server on a single port
app.listen(5000, () => console.log("Server running on port 5000"));
