// src/components/Card.js
import React from "react";
import { FaPlayCircle } from "react-icons/fa";
import '../App.css'; // Ensure your CSS file is imported here

const Card = ({ item }) => (
  <div className="relative group w-40 h-40 bg-gray-800 rounded-lg overflow-hidden flex flex-col">
    {/* Outer Card */}
    <div className="w-full h-32 relative overflow-hidden bg-gray-700">
      {/* Inner Card: Image */}
      <img
        src={item.image}
        alt={item.title}
        className="absolute inset-0 w-full h-full object-cover cursor-pointer"
      />
      <div className="absolute bottom-0 right-0 p-2 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <button className="text-green-500 text-3xl">
          <FaPlayCircle />
        </button>
      </div>
    </div>
    {/* Bottom part of card with title and artist */}
    <div className="flex-1 text-center text-sm bg-gray-900 flex flex-col justify-end">
      <div className="font-semibold">{item.title}</div>
      <div className="text-gray-400">{item.artist}</div>
    </div>
  </div>
);

export default Card;
