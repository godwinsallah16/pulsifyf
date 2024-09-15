import React from "react";
import { FaPlayCircle } from "react-icons/fa";
import Card from "./Card"; // Adjust the import path as needed
import { Link } from "react-router-dom";


const Home = () => {
  let Aimage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8nnTYwTslXh4tT-yFINoz8HF7fhs7D7X7dA&s";

  const recentlyPlayed = [
    { id: 1, title: "Chill Vibes", image: Aimage },
    { id: 2, title: "Workout Mix", image: Aimage },
    { id: 3, title: "Focus Beats", image: Aimage },
    { id: 4, title: "Chill Vibes", image: Aimage },
    { id: 5, title: "Workout Mix", image: Aimage },
    { id: 6, title: "Focus Beats", image: Aimage },
    { id: 7, title: "Focus Beats", image: Aimage },
  ];

  // Dummy data for Artists section
  const artists = [
    { id: 1, name: "Artist A", image: Aimage },
    { id: 2, name: "Artist B", image: Aimage },
    { id: 3, name: "Artist C", image: Aimage },
    { id: 4, name: "Artist D", image: Aimage },
    { id: 5, name: "Artist E", image: Aimage },
    { id: 6, name: "Artist F", image: Aimage },
  ];

  // Dummy data for Recommended sections
  const recommendedSongs = [
    { id: 1, title: "Song A", image: Aimage },
    { id: 2, title: "Song B", image: Aimage },
    { id: 3, title: "Song C", image: Aimage },
    { id: 4, title: "Song D", image: Aimage },
    { id: 5, title: "Song E", image: Aimage },
    { id: 6, title: "Song F", image: Aimage },
  ];

  const recommendedPlaylists = [
    { id: 1, title: "Playlist A", image: Aimage },
    { id: 2, title: "Playlist B", image: Aimage },
  ];

  const recommendedAlbums = [
    { id: 1, title: "Album A", image: Aimage },
    { id: 2, title: "Album B", image: Aimage },
  ];

  const radioStations = [
    { id: 1, title: "Radio 1", image: Aimage },
    { id: 2, title: "Radio 2", image: Aimage },
  ];
  
 return (
    <div className="w-full p-6 bg-transparent text-white h-screen scrollable-container">
      {/* Recently Played Section */}
      <div className="relative">
        <h2 className="text-xl font-semibold mb-4">Recently Played</h2>
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {recentlyPlayed.map((song) => (
            <div
              key={song.id}
              className="relative group w-full sm:w-48 h-12 bg-gray-800 rounded-lg overflow-hidden"
            >
              <img
                src={song.image}
                alt={song.title}
                className="w-1/3 h-full object-cover float-left"
              />
              <div className="ml-16 p-2 text-sm font-semibold">
                {song.title}
              </div>
              <div className="absolute inset-0 flex items-center justify-end p-2">
                <div className="relative w-12 h-12 flex items-center justify-center bg-gray-800 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="text-green-500 text-2xl">
                    <FaPlayCircle />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Artist Section */}
      <div className="relative mt-10">
        <h2 className="text-xl font-semibold mb-4 flex justify-between">
          Artists
          <Link to="/artist" className="text-sm text-green-500">
            Show More
          </Link>
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {artists.map((artist) => (
            <div
              key={artist.id}
              className="flex flex-col items-center rounded-full cursor-pointer"
            >
              <img
                src={artist.image}
                alt={artist.name}
                className="w-24 h-24 rounded-full object-cover"
              />
              <span className="mt-2 text-sm">{artist.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Recommended Songs Section */}
      <div className="relative mt-10">
        <h2 className="text-xl font-semibold mb-4 flex justify-between">
          Recommended Songs
          <Link to="/recommended-songs" className="text-sm text-green-500">
            Show More
          </Link>
        </h2>
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
          {recommendedSongs.map((song) => (
            <Card key={song.id} item={song} />
          ))}
        </div>
      </div>

      {/* Recommended Playlist Section */}
      <div className="relative mt-10">
        <h2 className="text-xl font-semibold mb-4 flex justify-between">
          Recommended Playlists
          <Link to="/recommended-playlists" className="text-sm text-green-500">
            Show More
          </Link>
        </h2>
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
          {recommendedPlaylists.map((playlist) => (
            <Card key={playlist.id} item={playlist} />
          ))}
        </div>
      </div>

      {/* Recommended Albums */}
      <div className="relative mt-10 mb-14">
        <h2 className="text-xl font-semibold mb-4 flex justify-between">
          Recommended Albums
          <Link to="album" className="text-sm text-green-500">
            Show More
          </Link>
        </h2>
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 ">
          {recommendedAlbums.map((album) => (
            <Card key={album.id} item={album} />
          ))}
        </div>
      </div>

      {/* Radio Section */}
      <div className="relative mt-10 mb-14">
        <h2 className="text-xl font-semibold mb-4 flex justify-between">
          Radio
          <Link to="/radio" className="text-sm text-green-500">
            Show More
          </Link>
        </h2>
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 ">
          {radioStations.map((station) => (
            <Card key={station.id} item={station} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;