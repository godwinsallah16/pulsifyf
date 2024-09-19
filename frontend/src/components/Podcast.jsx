import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './Card'; // Ensure this path is correct

const Radio = () => {
  const [radioStations, setRadioStations] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRadioStations = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/radio?limit=20&offset=0&countryCode=GH');
        setRadioStations(response.data);
      } catch (error) {
        console.error('Error fetching radio stations:', error);
        setError('Failed to fetch radio stations');
      }
    };

    fetchRadioStations();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="relative flex flex-grow flex-col h-full w-full">
      <div className="sticky top-0 bg-transparent z-10 p-4">
        <h2 className="text-xl font-bold text-white">Radio Stations</h2>
      </div>
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full p-6 scrollable-container flex-grow">
        {radioStations.map((station) => (
          <Card 
            key={station.id} // Ensure 'station.id' is unique
            item={station} 
          />
        ))}
      </div>
    </div>
  );
};

export default Radio;
