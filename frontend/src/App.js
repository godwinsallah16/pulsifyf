import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LeftNav from "./components/LeftNav";
import MusicPlayer from "./components/MusicPlayer";
import Home from "./components/Home";
import Artists from "./components/Artists";
import RecommendedSongs from "./components/RecommendedSongs";
import RecommendedPlaylists from "./components/RecommendedPlaylist";
import Radio from "./components/Radio";

function App() {
  return (
    <div className="App">
      <div className="background"></div>
      <Router>
        <div className="flex flex-col h-screen">
          <div className="flex flex-1">
            <LeftNav />
            <main className="flex-1 overflow-auto pb-[56px]">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/artists" element={<Artists />} />
                <Route
                  path="/recommended-songs"
                  element={<RecommendedSongs />}
                />
                <Route
                  path="/recommended-playlists"
                  element={<RecommendedPlaylists />}
                />
                <Route path="/radio" element={<Radio />} />
              </Routes>
            </main>
          </div>
          <MusicPlayer />
        </div>
      </Router>
    </div>
  );
}

export default App;
