// service/albumService.js
const axios = require("axios");
const { getAccessToken } = require("./spotifyService");

const getTrendingAlbums = async () => {
  try {
    // Get the access token from spotifyService
    const accessToken = await getAccessToken();

    // Make a request to the Spotify API to get trending albums
    const response = await axios.get(
      "https://api.spotify.com/v1/browse/new-releases",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    // Extract and return the top 5 trending albums
    const albums = response.data.albums.items.slice(0, 5).map((album) => ({
      name: album.name,
      artist: album.artists.map((artist) => artist.name).join(", "),
      releaseDate: album.release_date,
      imageUrl: album.images[0].url,
      albumUrl: album.external_urls.spotify,
    }));

    return albums;
  } catch (error) {
    console.error("Error fetching trending albums:", error);
    throw error;
  }
};

module.exports = { getTrendingAlbums };
