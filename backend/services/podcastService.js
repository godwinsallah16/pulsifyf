const axios = require("axios");
const { getAccessToken } = require("./spotifyService");

// Function to search for podcasts
const podcasts = async (query) => {
  try {
    // Get the access token
    const accessToken = await getAccessToken();

    // Make a request to the Spotify API to get shows (type 'show')
    const response = await axios.get("https://api.spotify.com/v1/search", {
      params: {
        q: "technology", // Replace with a valid search term
        type: "show", // Use 'show' for podcasts/shows
        limit: 10,
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    // Return the show (podcast) data from the response
    return response.data.shows.items;
  } catch (error) {
    console.error("Error fetching shows:", error);
    throw new Error("Unable to fetch shows");
  }
};

module.exports = { podcasts };
