const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcrypt');

const app = express();
app.use(express.json());
app.use(cors());

// Database Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Tamizh004',  // Ensure this is correct
    database: 'workmanagement'
});

db.connect(err => {
    if (err) {
        console.error('❌ Database connection failed:', err.message);
    } else {
        console.log('✅ Connected to MySQL database');
    }
});

// Login API
app.post('/', (req, res) => {
    const { userID, password, role } = req.body;
    console.log("🔍 Login attempt:", { userID,password, role });

    // Validate input fields
    if (!userID || !password || !role) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    // Fixing SQL query to prevent incorrect role matching
    const sql = `SELECT * FROM users WHERE userID = ? AND LOWER(Role) = LOWER(?)`;

    db.query(sql, [userID, role], (err, results) => {
        if (err) {
            console.error("❌ SQL Query Error:", err);
            return res.status(500).json({ error: 'Database query failed' });
        }

        if (results.length === 0) {
            console.warn("⚠️ No matching user found for:", userID);
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const user = results[0];
        console.log("✅ User found:", user.userID);

        // Check if the user is using the default password
        if (user.passwordflag === 0) {
            return res.json({ status: 'default_password', message: 'Please reset your password' });
        }

        // Compare hashed password (use correct column name 'Password' as per your DB)
        bcrypt.compare(password, user.Password, (err, match) => {
            if (err) {
                console.error("❌ bcrypt Error:", err, user.userID);
                return res.status(500).json({ error: 'Error verifying password' });
            }

            if (!match) {
                console.warn("⚠️ Password mismatch for user:", userID);
                return res.status(401).json({ error: 'Invalid password' });
            }

            console.log("✅ Login successful:", user.userID);
            res.json({
                status: 'success',
                userID: user.userID,
                role: user.Role,
                name: user.userName,
                dept: user.Department,
                position : user.position
            });
        });
    });
});

// Start the Express server
const PORT = 5001;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});
