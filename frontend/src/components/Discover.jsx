import React, { useEffect, useState, useCallback } from "react";
import Card from "./Card";
import '../App.css';

const Discover = () => {
  const [discoverData, setDiscoverData] = useState({
    newReleases: { albums: { items: [] } },
    featuredPlaylists: { playlists: { items: [] } },
    recommendations: { tracks: [] },
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchDiscoverData = useCallback(async (pageNumber) => {
    if (!hasMore) return;

    try {
      setLoading(true);
      const response = await fetch(`http://localhost:5000/api/discover?page=${pageNumber}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();

      console.log("Fetched data:", data);

      setDiscoverData(prevData => {
        const existingIds = new Set([
          ...prevData.newReleases.albums.items.map(item => item.id),
          ...prevData.featuredPlaylists.playlists.items.map(item => item.id),
          ...prevData.recommendations.tracks.map(item => item.id),
        ]);

        const newReleasesItems = data.newReleases.albums.items.filter(item => !existingIds.has(item.id));
        const featuredPlaylistsItems = data.featuredPlaylists.playlists.items.filter(item => !existingIds.has(item.id));
        const recommendationsTracks = data.recommendations.tracks.filter(item => !existingIds.has(item.id));

        console.log("New Releases Items:", newReleasesItems);
        console.log("Featured Playlists Items:", featuredPlaylistsItems);
        console.log("Recommendations Tracks:", recommendationsTracks);

        return {
          newReleases: {
            albums: {
              items: [...prevData.newReleases.albums.items, ...newReleasesItems],
            }
          },
          featuredPlaylists: {
            playlists: {
              items: [...prevData.featuredPlaylists.playlists.items, ...featuredPlaylistsItems],
            }
          },
          recommendations: {
            tracks: [...prevData.recommendations.tracks, ...recommendationsTracks],
          }
        };
      });

      setHasMore(data.hasMore);
      setPage(pageNumber + 1);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [hasMore]);

  useEffect(() => {
    fetchDiscoverData(page);
  }, [fetchDiscoverData, page]);

  const handleScroll = useCallback(() => {
    if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
      fetchDiscoverData(page);
    }
  }, [fetchDiscoverData, page]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  if (loading && page === 1) return <div className="text-center py-4">Loading...</div>;
  if (error) return <div className="text-center py-4 text-red-500">Error: {error}</div>;

  const allItems = [
    ...discoverData.newReleases.albums.items,
    ...discoverData.featuredPlaylists.playlists.items,
    ...discoverData.recommendations.tracks,
  ];

  return (
    <div className="relative flex flex-grow flex-col h-full w-full bg-gray-800">
      <div className="sticky top-0 bg-gray-900 z-10 p-4">
        <h2 className="text-3xl font-bold text-center text-white">Discover</h2>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4 scrollable-container">
        {allItems.map((item, index) => {
          // Handle images for both albums and other items
          const imageUrl = item.images?.length > 0 ? item.images[0].url : 
                           item.album?.images?.length > 0 ? item.album.images[0].url : 
                           ''; // Check for images in album

          console.log("Rendering item:", item);

          return (
            <Card
              key={index}
              item={{
                image: imageUrl,
                title: item.name,
                artist: item.artists?.[0]?.name || ''
              }}
            />
          );
        })}
      </div>
      {loading && <div className="text-center py-4 text-white">Loading more...</div>}
    </div>
  );
};

export default Discover;
