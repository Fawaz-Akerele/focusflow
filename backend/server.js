const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv")

const sessionRoutes = require("./routes/sessions");

const app = express();
dotenv.config()
app.use(cors());
app.use(express.json());

app.use("/api", sessionRoutes);

app.get("/", (req, res) => {
    res.json({
        app: "FocusFlow API",
        status: "Running"
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});