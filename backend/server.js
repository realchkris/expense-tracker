const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 3001; // Port in .env or 3001
const API_BASE = process.env.API_BASE; // Secure API URL from .env

app.use(cors()); // Enable CORS for all routes
app.use(express.json());

// Middleware function to authenticate the admin
const authenticateAdmin = (req, res, next) => {

  const adminPassword = process.env.ADMIN_PASSWORD; // Secure password
  const sentPassword = req.headers["x-admin-password"]; // Read password from request header

  if (!sentPassword || sentPassword !== adminPassword) {
    return res.status(403).json({ message: "Unauthorized: Admin access required" });
  }

  next(); // Proceed if password is correct

};

// Route to fetch expenses (acts as a proxy) (built-in fetch)
app.get("/api/expenses", async (req, res) => {

  try {

    console.log("Fetching expenses from MockAPI:", `${API_BASE}/expenses`);
    const response = await fetch(`${API_BASE}/expenses`);
    
    if (!response.ok) throw new Error(`MockAPI responded with status: ${response.status}`);

    const data = await response.json();
    res.json(data);

  } catch (error) {
    console.error("Backend Error:", error);
    res.status(500).json({ message: "Error fetching expenses", error: error.message });
  }

});

// Route to add a new expense
app.post("/api/expenses", authenticateAdmin, async (req, res) => {

  try {

    const response = await fetch(`${API_BASE}/expenses`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });

    if (!response.ok) throw new Error(`Failed to add expense: ${response.statusText}`);

    const data = await response.json();
    res.json(data);

  } catch (error) {
    res.status(500).json({ message: "Error adding expense" });
  }

});

// Route to delete an expense
app.delete("/api/expenses/:id", authenticateAdmin, async (req, res) => {

  try {

    const response = await fetch(`${API_BASE}/expenses/${req.params.id}`, {
      method: "DELETE",
    });

    if (!response.ok) throw new Error(`Failed to delete expense: ${response.statusText}`);

    res.json({ success: true });

  } catch (error) {
    res.status(500).json({ message: "Error deleting expense" });
  }

});

// Route to update an expense
app.put("/api/expenses/:id", authenticateAdmin, async (req, res) => {
  try {

    const response = await fetch(`${API_BASE}/expenses/${req.params.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });

    if (!response.ok) throw new Error(`Failed to update expense: ${response.statusText}`);

    const updatedExpense = await response.json();
    res.json(updatedExpense);
    
  } catch (error) {
    console.error("Error updating expense:", error);
    res.status(500).json({ message: "Error updating expense", error: error.message });
  }
});

// Start the server
app.listen(PORT, () => console.log(`Proxy server running on port ${PORT}`));
