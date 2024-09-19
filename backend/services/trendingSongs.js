const axios = require("axios");
const { getAccessToken } = require("./spotifyService"); // Adjust the path as needed

const fetchTrendingSongs = async () => {
  try {
    // Get access token
    const accessToken = await getAccessToken();

    // Fetch trending songs from Spotify (using a sample playlist or top tracks endpoint)
    const response = await axios.get(
      "https://api.spotify.com/v1/playlists/37i9dQZF1DXcBWIGoYBM5M", // Example playlist ID
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    // Extract the top 5 songs from the response
    const topSongs = response.data.tracks.items.slice(0, 5).map((item) => ({
      name: item.track.name,
      artist: item.track.artists.map((artist) => artist.name).join(", "),
      album: item.track.album.name,
      preview_url: item.track.preview_url,
      image_url: item.track.album.images[0].url,
    }));

    return topSongs;
  } catch (error) {
    console.error("Error fetching trending songs:", error);
    throw new Error("Unable to fetch trending songs");
  }
};

module.exports = { fetchTrendingSongs };
