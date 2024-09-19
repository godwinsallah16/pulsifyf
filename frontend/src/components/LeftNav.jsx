// src/components/Navbar.js
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaPodcast, FaPlus, FaBroadcastTower, FaMicrophoneAlt, FaTrash } from 'react-icons/fa';
import { BiSearchAlt, BiPulse } from 'react-icons/bi';
import { BsFillHouseFill, BsJournalAlbum } from 'react-icons/bs';
import '../App.css';

const LeftNav = () => {
  const [playlists, setPlaylists] = useState([
    { id: 1, name: 'Chill Vibes', imageUrl: '/path-to-image1.png' },
    { id: 2, name: 'Workout Mix', imageUrl: '/path-to-image2.png' },
  ]);
  
  const [activeItem, setActiveItem] = useState(null);

  const location = useLocation(); // Track the current route
  const navigate = useNavigate();


  useEffect(() => {
    // Update the active item based on the current route
    switch (location.pathname) {
      case '/':
        setActiveItem('home');
        break;
      case '/artists':
        setActiveItem('artists');
        break;
      case '/albums':
        setActiveItem('albums');
        break;
      case '/podcast':
        setActiveItem('podcast');
        break;
      case '/radio':
        setActiveItem('radio');
        break;
      default:
        setActiveItem('discover'); // All other routes go to discover
        break;
    }
  }, [location.pathname]);

  const handleItemClick = (itemName) => {
    setActiveItem(itemName);

    // Navigate to the corresponding route
    switch (itemName) {
      case 'home':
        navigate('/');
        break;
      case 'radio':
        navigate('/radio');
        break;
      case 'artist':
        navigate('/artists');
        break;
      case 'albums':
        navigate('/albums');
        break;
      case 'podcast':
        navigate('/podcast');
        break;
      default:
        navigate('/discover');
    }
  };

  const handleAddPlaylist = () => {
    // Function to handle adding a new playlist
  };

  const handleDeletePlaylist = (id) => {
    setPlaylists(playlists.filter(playlist => playlist.id !== id));
  };


  return (
    <div className="scrollable-container w-16 sm:w-0 md:w-[76px] lg:w-64 bg-opacity-20 bg-gray-100 text-black h-screen flex-col md:flex navbar">
      <div className="flex items-center justify-around p-4 b">
        <img src="../assets/img/profile.jpg" alt="App Logo" className="w-8 h-8 lg:w-12 lg:h-12" />
        <h5 className="ml-2 text-lg font-bold hidden lg:inline">Pulsify</h5>
      </div>
      
      <div className="flex flex-col flex-1 mt-4">
        <div className="flex flex-col space-y-2 px-4">
          <div
            className={`flex items-center px-2 py-2 hover:bg-gray-700 cursor-pointer transition-transform transform hover:scale-110 ${activeItem === 'search' ? 'bg-gray-400' : ''}`}
            onClick={() => handleItemClick('search')}
          >
            <input
              type="text"
              placeholder="Search"
              className="hidden lg:block px-2 py-1 bg-gray-700 border border-gray-600 rounded w-full focus:bg-white"
            />
            <div className="sm:hidden md:block lg:hidden">
              <BiSearchAlt className="text-2xl" />
            </div>
          </div>

          <div
            className={`flex items-center px-2 py-2 hover:bg-gray-700 cursor-pointer transition-transform transform hover:scale-110 ${activeItem === 'home' ? 'bg-gray-600' : ''}`}
            onClick={() => handleItemClick('home')}
          >
            <BsFillHouseFill className="text-2xl" />
            <span className="ml-2 hidden lg:inline">Home</span>
          </div>

          <div
            className={`flex items-center px-2 py-2 hover:bg-gray-700 cursor-pointer transition-transform transform hover:scale-110 ${activeItem === 'discover' ? 'bg-gray-600' : ''}`}
            onClick={() => handleItemClick('discover')}
          >
            <BiPulse className="text-2xl" />
            <span className="ml-2 hidden lg:inline">Discover</span>
          </div>

          <div
            className={`flex items-center px-2 py-2 hover:bg-gray-700 cursor-pointer transition-transform transform hover:scale-110 ${activeItem === 'radio' ? 'bg-gray-600' : ''}`}
            onClick={() => handleItemClick('radio')}
          >
            <FaBroadcastTower className="text-2xl" />
            <span className="ml-2 hidden lg:inline">Radio</span>
          </div>

          <div
            className={`flex items-center px-2 py-2 hover:bg-gray-700 cursor-pointer transition-transform transform hover:scale-110 ${activeItem === 'artist' ? 'bg-gray-600' : ''}`}
            onClick={() => handleItemClick('artist')}
          >
            <FaMicrophoneAlt className="text-2xl" />
            <span className="ml-2 hidden lg:inline">Artists</span>
          </div>

          <div
            className={`flex items-center px-2 py-2 hover:bg-gray-700 cursor-pointer transition-transform transform hover:scale-110 ${activeItem === 'album' ? 'bg-gray-600' : ''}`}
            onClick={() => handleItemClick('albums')}
          >
            <BsJournalAlbum className="text-2xl" />
            <span className="ml-2 hidden lg:inline">Albums</span>
          </div>

          <div
            className={`flex items-center px-2 py-2 hover:bg-gray-700 cursor-pointer transition-transform transform hover:scale-110 ${activeItem === 'podcast' ? 'bg-gray-600' : ''}`}
            onClick={() => handleItemClick('podcast')}
          >
            <FaPodcast className="text-2xl" />
            <span className="ml-2 hidden lg:inline">Podcast</span>
          </div>
        </div>
        
        <div className="flex flex-col mt-auto px-4 py-2">
          <div
            className="flex items-center justify-between py-2 hover:bg-gray-700 cursor-pointer"
            onClick={handleAddPlaylist}
          >
            <FaPlus className="text-xl transition-transform transform hover:scale-110" />
            <span className="ml-2 hidden lg:inline text-gray-100">Create Playlist</span>
          </div>
          <div className="flex flex-col mt-2 ">
            {playlists.map(playlist => (
              <div key={playlist.id} className="flex items-center py-2 justify-between">
                <img src={playlist.imageUrl} alt={playlist.name} className="w-8 h-8 rounded" />
                <span className="ml-2 hidden lg:inline">{playlist.name}</span>
                <FaTrash
                  className="text-gray-400 hover:text-red-500 cursor-pointer ml-2 hidden lg:inline transition-transform transform hover:scale-110"
                  onClick={() => handleDeletePlaylist(playlist.id)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftNav;
