const express = require("express");
const router = express.Router();
const { fetchTrendingSongs } = require("../services/trendingSongs"); // Adjust the path as needed

router.get("/trending-songs", async (req, res) => {
  try {
    const trendingSongs = await fetchTrendingSongs();
    res.json(trendingSongs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
