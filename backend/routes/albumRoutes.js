const express = require("express");
const { getTrendingAlbums } = require("../services/albumService");
const router = express.Router();

// Define a route to get trending albums
router.get("/album", async (req, res) => {
  try {
    const albums = await getTrendingAlbums();
    res.json(albums);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch trending albums" });
  }
});

module.exports = router;
