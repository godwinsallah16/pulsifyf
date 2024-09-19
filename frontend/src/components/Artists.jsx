import React from 'react';
import '../App.css';

const Artists = () => {

  let Aimage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8nnTYwTslXh4tT-yFINoz8HF7fhs7D7X7dA&s";

  const artists = [
    { id: 1, name: "Artist A", image: Aimage },
    { id: 2, name: "Artist B", image: Aimage },
    { id: 3, name: "Artist C", image: Aimage },
    { id: 4, name: "Artist D", image: Aimage },
    { id: 5, name: "Artist E", image: Aimage },
    { id: 6, name: "Artist F", image: Aimage },
    { id: 7, name: "Artist G", image: Aimage },
    { id: 8, name: "Artist H", image: Aimage },
    { id: 1, name: "Artist A", image: Aimage },
    { id: 2, name: "Artist B", image: Aimage },
    { id: 3, name: "Artist C", image: Aimage },
    { id: 4, name: "Artist D", image: Aimage },
    { id: 5, name: "Artist E", image: Aimage },
    { id: 6, name: "Artist F", image: Aimage },
    { id: 7, name: "Artist G", image: Aimage },
    { id: 8, name: "Artist H", image: Aimage },
    { id: 1, name: "Artist A", image: Aimage },
    { id: 2, name: "Artist B", image: Aimage },
    { id: 3, name: "Artist C", image: Aimage },
    { id: 4, name: "Artist D", image: Aimage },
    { id: 5, name: "Artist E", image: Aimage },
    { id: 6, name: "Artist F", image: Aimage },
    { id: 7, name: "Artist G", image: Aimage },
    { id: 8, name: "Artist H", image: Aimage },
  ];

  return (
    <div className="relative flex flex-col h-screen mb-4 w-full">
      {/* Sticky Artist Heading */}
      <div className="sticky top-0 bg-transparent-900 z-10">
        <h2 className="text-xl font-semibold mb-4">
          Artists
        </h2>
      </div>

      {/* Scrollable Artist Items */}
      <div className="w-full p-6 scrollable-container pt-4 mb-14 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
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
  );
};

export default Artists;
