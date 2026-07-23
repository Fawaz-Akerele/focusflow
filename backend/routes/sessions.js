const express = require("express");
const router = express.Router();
const pool = require("../db");

router.get("/sessions", async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT * FROM focus_sessions ORDER BY created_at DESC"
        );

        res.json(result.rows);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post("/sessions", async (req, res) => {

    const { task, category, duration, mood } = req.body;

    try {

        await pool.query(
            `INSERT INTO focus_sessions
            (task, category, duration, mood)
            VALUES ($1,$2,$3,$4)`,
            [task, category, duration, mood]
        );

        res.json({
            message: "Session added successfully"
        });

    } catch (err) {

        res.status(500).json({
            error: err.message
        });

    }

});

module.exports = router;