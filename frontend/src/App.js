import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LeftNav from "./components/LeftNav";
import MusicPlayer from "./components/MusicPlayer";
import Home from "./components/Home";
import Artists from "./components/Artists";
import RecommendedSongs from "./components/RecommendedSongs";
import RecommendedPlaylists from "./components/RecommendedPlaylist";
import Radio from "./components/Radio";
import Albums from "./components/Albums";
import Discover from "./components/Discover";

function App() {
  const [currentSongUrl, setCurrentSongUrl] = useState("");

  // Function to handle setting the song URL from card
  const handleSongPlay = (url) => {
    setCurrentSongUrl(url);
  };

  return (
    <div className="App w-full h-full">
      <div className="background"></div>
      <Router>
        <div className="flex h-screen overflow-hidden">
          {/* Left Navigation */}
          <LeftNav />

          {/* Main content that takes the remaining screen width */}
          <main className="flex-grow pb-[56px]">
            <Routes>
              <Route path="/" element={<Home onPlay={handleSongPlay} />} />
              <Route
                path="/artists"
                element={<Artists onPlay={handleSongPlay} />}
              />
              <Route
                path="/recommended-songs"
                element={<RecommendedSongs onPlay={handleSongPlay} />}
              />
              <Route
                path="/recommended-playlists"
                element={<RecommendedPlaylists onPlay={handleSongPlay} />}
              />
              <Route
                path="/albums"
                element={<Albums onPlay={handleSongPlay} />}
              />
              <Route
                path="/radio"
                element={<Radio onPlay={handleSongPlay} />}
              />
              <Route
                path="/discover"
                element={<Discover onPlay={handleSongPlay} />}
              />
            </Routes>
          </main>
        </div>

        {/* Music Player at the bottom */}
        <MusicPlayer songUrl={currentSongUrl} />
      </Router>
    </div>
  );
}

export default App;
