import { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { useNavigate } from "react-router";

export default function DatabankSearch() {
  const [query, setQuery] = useState("");
  const { people, planets, vehicles } = useAppContext();
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  const handleQueryChange = (searchValue) => {
    setQuery(searchValue);
    const allItems = [
      ...people.map((p) => ({ ...p, type: "people" })),
      ...planets.map((p) => ({ ...p, type: "planets" })),
      ...vehicles.map((p) => ({ ...p, type: "vehicles" })),
    ];
    setSearchResults(
      allItems.filter((item) =>
        item.name.toLowerCase().includes(searchValue.toLowerCase())
      )
    );
  };

  const handleResultClick = (result) => {
    setQuery("");
    setSearchResults([]);
    navigate(`/${result.type}/${result.uid}/details`, {
      state: { item: result },
    });
  };

  return (
    <div className="bg-black text-white py-6 px-4 border-t border-gray-800">
      <div className="max-w-4xl mx-auto">
        <input
          type="text"
          onChange={(event) => handleQueryChange(event.target.value)}
          placeholder="Search Databank"
          value={query}
          className="w-full px-4 py-3 rounded bg-zinc-800 text-white placeholder-gray-400 focus:outline-none"
        />
        {query !== "" && searchResults.length > 0 && (
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {searchResults.map((result, index) => (
              <button
                key={index}
                className="flex items-center gap-4 bg-zinc-900 rounded-lg p-3 shadow hover:bg-zinc-800 transition w-full text-left cursor-pointer"
                onClick={() => handleResultClick(result)}
              >
                <img
                  src={`${import.meta.env.VITE_IMG_URL}/${result.type}/${
                    result.uid
                  }.jpg`}
                  alt={result.name}
                  className="w-16 h-16 object-cover rounded-full border border-zinc-700"
                />
                <span className="text-lg font-semibold text-white">
                  {result.name}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
