import GalaxyButton from "./GalaxyButton";
import { Heart } from "lucide-react";
import { useAppContext } from "../context/AppContext";

const IMG_URL = import.meta.env.VITE_IMG_URL;

export default function Card({ char, type }) {
  const { favorites, addFavorite, removeFavorite } = useAppContext();
  const isFav = favorites.some(
    (fav) => fav.uid === char.uid && fav.type === type
  );

  const favClasses = isFav
    ? "bg-yellow-400/20 hover:bg-yellow-400/30 text-yellow-400 border border-yellow-500"
    : "bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700";

  return (
    <div className="relative bg-zinc-900 rounded-lg shadow p-4 flex flex-col items-center">
      <img
        src={`${IMG_URL}/${type}/${char.uid}.jpg`}
        alt={char.name}
        className="object-contain w-full"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "https://placehold.co/600x400?text=No+Image";
        }}
      />

      <div className="p-3 flex flex-col justify-between h-full w-full">
        <h3 className="text-[#ffe81f] text-sm font-semibold truncate">
          {char.name}
        </h3>
        <div className="mt-4 flex justify-between items-center gap-4">
          <GalaxyButton text="Details" type={type} id={char.uid} item={char} />
          <button
            type="button"
            className={`p-2 rounded-md transitions-all cursor-pointer ${favClasses}`}
            onClick={() =>
              isFav
                ? removeFavorite({ ...char, type })
                : addFavorite({ ...char, type })
            }
            title={isFav ? "Quitar de favoritos" : "Agregar a favoritos"}
          >
            <Heart
              className="w-5 h-5"
              color={isFav ? "#ffe81f" : "#fff"}
              fill={isFav ? "#ffe81f" : "none"}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
