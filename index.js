const express = require("express");
const app = express();
const bodyParser = require("body-parser");
require("./connection/DB");
require("dotenv").config();
const cors = require("cors");
const multer = require("multer");

// CORS configuration
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Configure multer for file uploads
const upload = multer();
app.use(upload.any());

// Middleware for parsing request bodies
app.use(bodyParser.text({ type: "/" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// dashboard Routes

app.use("/admin", require("./route/admin.route.js")); // All user-related APIs



// Grouped API Routes
app.use("/user", require("./route/User.route.js")); // All user-related APIs
app.use("/club", require("./route/club.route")); // All club-related APIs
app.use("/tournament", require("./route/tournament.route")); // All tournament-related APIs
app.use("/team", require("./route/team.route")); // All team-related APIs
app.use("/game", require("./route/game.route")); // All game-related APIs
app.use("/ground", require("./route/ground.route")); // All ground-related APIs

// Route to serve the welcome message
app.get("/", (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Welcome to Conqore</title>
      </head>
      <body>
        <h1>Welcome to Conqore!</h1>
        <p>Your app is up and running!</p>
      </body>
    </html>
  `);
});

// Server setup
const PORT = process.env.PORT || 4001;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
