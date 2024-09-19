const axios = require("axios");
const { getAccessToken } = require("./spotifyService");

const fetchNewReleases = async () => {
  try {
    const accessToken = await getAccessToken();
    const response = await axios.get(
      "https://api.spotify.com/v1/browse/new-releases",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data.albums.items;
  } catch (error) {
    console.error("Error fetching new releases:", error);
    throw new Error("Unable to fetch new releases");
  }
};

module.exports = { fetchNewReleases };
