const express = require("express");
const cors = require("cors");
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

// Use route modules
app.use("/api", artistsRoutes);
app.use("/api", releasesRoutes);
app.use("/api", podcastRoutes);
app.use("/api", albumRoutes);
app.use("/api", trendingSongsRouter);
app.use("/api", discover);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
