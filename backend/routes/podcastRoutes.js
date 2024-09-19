const express = require("express");
const router = express.Router();
const { podcasts } = require("../services/podcastService");

// Route to search for podcasts
router.get("/podcast", async (req, res) => {
  try {
    // Fetch all available shows using the service
    const shows = await podcasts();
    res.json(shows);
  } catch (error) {
    console.error("Error fetching shows:", error);
    res.status(500).json({ error: "Unable to fetch shows" });
  }
});

module.exports = router;
