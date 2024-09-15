import React, { useState, useRef, useEffect, useCallback } from 'react';
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute, FaRandom, FaStepForward, FaStepBackward, FaRedo, FaHeart } from 'react-icons/fa';
import { LuRepeat1 } from 'react-icons/lu'; 
import { MdOutlineQueueMusic } from 'react-icons/md'; 
import { PiMicrophoneStageBold } from "react-icons/pi";
import song from '../assets/music/Dull.mp3';

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1); 
  const [isMuted, setIsMuted] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);
  const [repeatMode, setRepeatMode] = useState(0); 
  const [isLiked, setIsLiked] = useState(false); // New state for the like button
  const audioRef = useRef(null);

  // Set volume on the audio element when volume changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // Toggle play/pause and manage state
  const togglePlayPause = useCallback(() => {
    setIsPlaying((prevState) => {
      if (prevState) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      return !prevState;
    });
  }, []);

  // Format time in mm:ss format
  const formatTime = useCallback((time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }, []);

  // Update current time and duration while song is playing
  const handleTimeUpdate = useCallback(() => {
    const current = audioRef.current.currentTime;
    const dur = audioRef.current.duration;
    setDuration(dur);
    if (Math.abs(current - currentTime) > 0.25) {
      setCurrentTime(current);
    }
  }, [currentTime]);

  // Update time when slider is changed
  const handleSliderChange = useCallback((e) => {
    const newTime = e.target.value;
    setCurrentTime(newTime);
    audioRef.current.currentTime = newTime;
    if (!isPlaying) {
      setIsPlaying(true);
      audioRef.current.play();
    }
  }, [isPlaying]);

  // Toggle mute state
  const toggleMute = useCallback(() => {
    setIsMuted((prevState) => {
      audioRef.current.muted = !prevState;
      return !prevState;
    });
  }, []);

  // Handle song end based on repeat mode
  const handleSongEnd = useCallback(() => {
    if (repeatMode === 2) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    } else if (repeatMode === 1) {
      setCurrentTime(0);
      audioRef.current.play();
    } else {
      setIsPlaying(false);
    }
  }, [repeatMode]);

  // Add/remove event listeners for the song end
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.addEventListener('ended', handleSongEnd);
    }

    return () => {
      if (audio) {
        audio.removeEventListener('ended', handleSongEnd);
      }
    };
  }, [handleSongEnd]);

  // Toggle repeat mode (off, repeat all, repeat one)
  const toggleRepeat = useCallback(() => {
    setRepeatMode((prevMode) => (prevMode + 1) % 3);
  }, []);

  // Get appropriate repeat icon based on repeat mode
  const getRepeatIcon = useCallback(() => {
    if (repeatMode === 0) return <FaRedo className="text-white" title="Repeat Off" />;
    if (repeatMode === 1) return <FaRedo className="text-green-500" title="Repeat All" />;
    return <LuRepeat1 className="text-green-500" title="Repeat One" />;
  }, [repeatMode]);

  // Toggle like button (favorite/unfavorite)
  const toggleLike = useCallback(() => {
    setIsLiked((prevState) => !prevState);
  }, []);

  return (
    <div className="fixed bottom-0 md:left-[78px] lg:left-64 w-[calc(100%-78px)] lg:w-[calc(100%-16rem)] h-[50px] bg-gray-800 border-solid text-white flex justify-between items-center sm:hidden md:flex">
      <audio ref={audioRef} onTimeUpdate={handleTimeUpdate} src={song} />

      {/* Album Art and Song Details */}
      <div className="flex items-center w-1/3">
        <div className={`h-10 w-10 rounded-full overflow-hidden ${isPlaying ? 'animate-spin' : ''}`}>
          <img src="/path-to-song-cover.jpg" alt="Song Cover" className="w-full h-full object-cover" />
        </div>
        <div className="ml-4 overflow-hidden">
          <div className="flex items-center">
            <div className="text-sm md:text-xs font-semibold whitespace-nowrap overflow-hidden hover:animate-scroll-right">
              Song Name
            </div>
            {/* Heart Icon for Favorite */}
            <FaHeart
              className={`ml-2 cursor-pointer ${isLiked ? 'text-green-500' : ' text-white'}`}
              onClick={toggleLike}
              title={isLiked ? 'Unlike' : 'Like'}
            />
          </div>
          <div className="text-xs text-gray-400 whitespace-nowrap overflow-hidden hover:animate-scroll-right">
            Artist Name
          </div>
        </div>
      </div>

      {/* Controls Column */}
      <div className="flex flex-col items-center w-1/3">
        <div className="flex items-center justify-center space-x-6 mb-1 md:space-x-4">
          <FaRandom
            className={`text-sm md:text-xs cursor-pointer ${isShuffling ? 'text-green-500' : 'text-white'}`}
            title="Shuffle"
            onClick={() => setIsShuffling(!isShuffling)}
          />
          <FaStepBackward className="text-lg md:text-sm cursor-pointer hover:text-blue-400" title="Previous" />
          <div onClick={togglePlayPause} className="text-2xl md:text-lg cursor-pointer hover:text-blue-400" title={isPlaying ? 'Pause' : 'Play'}>
            {isPlaying ? <FaPause /> : <FaPlay />}
          </div>
          <FaStepForward className="text-sm md:text-xs cursor-pointer hover:text-blue-400" title="Next" />
          <div onClick={toggleRepeat} className="text-sm md:text-xs cursor-pointer">
            {getRepeatIcon()}
          </div>
        </div>

        {/* Music Slider */}
        <div className="flex items-center w-full">
          <span className="mr-2 md:mr-1 text-sm md:text-xs">{formatTime(currentTime)}</span>
          <input
            type="range"
            min="0"
            max={duration}
            value={currentTime}
            onChange={handleSliderChange}
            className="w-full h-1"
          />
          <span className="ml-2 md:ml-1 text-sm md:text-xs">{formatTime(duration)}</span>
        </div>
      </div>

      {/* Volume Control Column with Queue and Microphone */}
      <div className="flex items-center space-x-2 md:space-x-1 w-1/3 justify-end ml-1">
        <MdOutlineQueueMusic className="text-lg cursor-pointer" title="Queue" />
        <PiMicrophoneStageBold className="text-lg cursor-pointer" title="Lyrics" />
        {isMuted ? (
          <FaVolumeMute onClick={toggleMute} className="text-lg md:text-sm cursor-pointer" title="Unmute" />
        ) : (
          <FaVolumeUp onClick={toggleMute} className="text-lg md:text-sm cursor-pointer" title="Mute" />
        )}
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(e) => setVolume(e.target.value)}
          className="w-16 md:w-14"
        />
      </div>
    </div>
  );
};

export default MusicPlayer;
