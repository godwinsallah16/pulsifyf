const express = require("express");
const cors = require("cors");
const path = require("path");
const { exec } = require("child_process");
const fs = require("fs"); // To check for the existence of the build folder
const artistsRoutes = require("./routes/artistsRoutes");
const releasesRoutes = require("./routes/releasesRoutes");
const podcastRoutes = require("./routes/podcastRoutes");
const albumRoutes = require("./routes/albumRoutes");
const topSongsRoute = require("./routes/topSongsRoutes");
const trendingSongsRouter = require("./routes/trendingSongs");
const discover = require("./routes/discover");

const app = express();
const PORT = process.env.PORT || 5000;

// Load environment variables
require("dotenv").config();

// Use the CORS middleware
app.use(cors());

// Function to build frontend if needed
const buildFrontendIfNeeded = () => {
  // Check if the build folder exists
  const buildFolderPath = path.join(__dirname, "frontend", "build");

  if (!fs.existsSync(buildFolderPath)) {
    // If build folder doesn't exist, install and build the frontend
    console.log("No build folder found. Installing and building frontend...");
    exec(
      "cd frontend && npm install && npm run build",
      (err, stdout, stderr) => {
        if (err) {
          console.error(`Error during frontend build: ${err}`);
          return;
        }
        console.log(`Frontend build output: ${stdout}`);
        if (stderr) console.error(`Frontend build errors: ${stderr}`);
      }
    );
  } else {
    console.log("Build folder exists, skipping build process...");
  }
};

// Call the function to check and build frontend
if (process.env.NODE_ENV === "production") {
  buildFrontendIfNeeded();
}

// Use route modules
app.use("/api", artistsRoutes);
app.use("/api", releasesRoutes);
app.use("/api", podcastRoutes);
app.use("/api", albumRoutes);
app.use("/api", trendingSongsRouter);
app.use("/api", discover);

// Serve static files from the React app in production
if (process.env.NODE_ENV === "production") {
  // Set the static folder
  app.use(express.static(path.join(__dirname, "frontend/build")));

  // Handle React routing, return all requests to the React app
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
}

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
