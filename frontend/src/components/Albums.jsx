import Card from "./Card";

const Albums = () => {
  const Aimage =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8nnTYwTslXh4tT-yFINoz8HF7fhs7D7X7dA&s";

  const Albums = [
    { id: 1, title: "Albums 1", image: Aimage },
    { id: 2, title: "Albums 1", image: Aimage },
    { id: 3, title: "Albums 1", image: Aimage },
    { id: 4, title: "Albums 1", image: Aimage },
    { id: 5, title: "Albums 1", image: Aimage },
    { id: 6, title: "Albums 1", image: Aimage },
    { id: 7, title: "Albums 1", image: Aimage },
    { id: 8, title: "Albums 1", image: Aimage },
    { id: 9, title: "Albums 1", image: Aimage },
    { id: 6, title: "Albums 1", image: Aimage },
    { id: 7, title: "Albums 1", image: Aimage },
    { id: 8, title: "Albums 1", image: Aimage },
    { id: 9, title: "Albums 1", image: Aimage },
    // More items...
  ];

  return (
    <div className="relative flex flex-grow flex-col h-full w-full">
      {/* Sticky Albums Heading */}
      <div className="sticky top-0 bg-transparent z-10 p-4">
        <h2 className="text-xl font-bold text-white">Albums</h2>
      </div>

      {/* Scrollable Albums Items */}
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full p-6 scrollable-container flex-grow">
        {Albums.map((album) => (
          <Card key={album.id} item={album} />
        ))}
      </div>
    </div>
  );
};

export default Albums;
