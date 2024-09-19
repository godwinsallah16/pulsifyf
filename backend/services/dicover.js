const axios = require("axios");
const { getAccessToken } = require("./spotifyService");

// Function to get discovery data from Spotify
const getDiscoverData = async (pageNumber = 1) => {
  try {
    const token = await getAccessToken();

    // Fetch new releases (albums)
    const newReleases = axios.get(
      "https://api.spotify.com/v1/browse/new-releases",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    // Fetch featured playlists
    const featuredPlaylists = axios.get(
      "https://api.spotify.com/v1/browse/featured-playlists",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    // Fetch categories (including playlists and podcasts)
    const categories = axios.get(
      "https://api.spotify.com/v1/browse/categories",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    // Fetch recommended tracks
    const recommendations = axios.get(
      "https://api.spotify.com/v1/recommendations",
      {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          seed_genres: "pop,rock", // Customize this to your needs
        },
      }
    );

    // Await all API calls
    const [
      newReleasesResponse,
      featuredPlaylistsResponse,
      categoriesResponse,
      recommendationsResponse,
    ] = await Promise.all([
      newReleases,
      featuredPlaylists,
      categories,
      recommendations,
    ]);

    // Aggregate and return the data
    return {
      newReleases: newReleasesResponse.data,
      featuredPlaylists: featuredPlaylistsResponse.data,
      categories: categoriesResponse.data,
      recommendations: recommendationsResponse.data,
      hasMore: pageNumber < 5, // Example: change this logic based on your pagination
    };
  } catch (error) {
    console.error("Error fetching discovery data:", error);
    throw new Error("Unable to fetch discovery data");
  }
};

module.exports = { getDiscoverData };
