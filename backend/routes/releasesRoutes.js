const express = require("express");
const { fetchNewReleases } = require("../services/newReleasesService");
const router = express.Router();

router.get("/new-releases", async (req, res) => {
  try {
    const releases = await fetchNewReleases();
    res.json(releases);
  } catch (error) {
    console.error("Error fetching new releases:", error);
    res.status(500).send("Error fetching new releases");
  }
});

module.exports = router;
