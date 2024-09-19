const express = require("express");
const { getDiscoverData } = require("../services/dicover");

const router = express.Router();

// Route to get discovery data
router.get("/discover", async (req, res) => {
  try {
    const data = await getDiscoverData();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
