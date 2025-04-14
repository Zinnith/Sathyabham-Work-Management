require("dotenv").config();
const express = require("express");
const mysql = require("mysql2/promise");  // ✅ Use the promise-based version
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// **Asynchronous function to connect to MySQL**
let db;
async function connectDB() {
    try {
        db = await mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "Tamizh004",
            database: "workmanagement",
        });
        console.log("✅ Connected to MySQL database");
    } catch (err) {
        console.error("❌ Database connection failed:", err);
        process.exit(1);  // Exit if the connection fails
    }
}

// Call the connection function
connectDB();

// **API Routes**

// Create a new ticket
app.post("/tickets", async (req, res) => {
    const { raised_by, department, ticket_description, status } = req.body;

    // Validate user input before database insertion
    if (!raised_by?.trim() || !department?.trim() || !ticket_description?.trim()) {
        return res.status(400).json({ error: "All fields are required!" });
    }

    try {
        const [result] = await db.execute(
            "INSERT INTO tickets (raised_by, department, ticket_description, status, created_at, updated_at) VALUES (?, ?, ?, ?, NOW(), NOW())",
            [raised_by, department, ticket_description, status || "Pending"]
        );

        res.status(201).json({ message: "✅ Ticket created successfully!", id: result.insertId });
    } catch (error) {
        console.error("❌ Error creating ticket:", error);
        res.status(500).json({ error: "Server error, please try again!" });
    }
});


// Get all tickets
app.get("/tickets", async (req, res) => {
    try {
        const [results] = await db.execute("SELECT * FROM tickets");
        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a ticket
app.put("/tickets/:id", async (req, res) => {
    const { id } = req.params;
    const { department, ticket_description, status } = req.body;

    try {
        await db.execute(
            "UPDATE tickets SET department = ?, ticket_description = ?, status = ?, updated_at = NOW() WHERE id = ?",
            [department, ticket_description, status, id]
        );

        res.status(200).json({ message: "Ticket updated successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete a ticket
app.delete("/tickets/:id", async (req, res) => {
    const { id } = req.params;

    try {
        await db.execute("DELETE FROM tickets WHERE id = ?", [id]);
        res.status(200).json({ message: "Ticket deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}); 

// Start Server
app.listen(5000, () => {
    console.log("🚀 Server running on port 5000");
});
