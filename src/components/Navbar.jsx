import { useState } from "react";
import {
  Instagram,
  Facebook,
  Youtube,
  Heart,
  X,
  Github,
  Linkedin,
  Twitter,
  Menu,
} from "lucide-react";
import { NavLink } from "react-router";
import { useAppContext } from "../context/AppContext";
import SidebarSocial from "./SideBarSocial";

export default function Navbar() {
  const { favorites, removeFavorite } = useAppContext();
  const [showFavs, setShowFavs] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleBackdropClick = (e) => {
    if (e.target.id === "fav-backdrop") setShowFavs(false);
  };

  return (
    <header className="bg-black text-white border-b border-gray-800 relative z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <button
          className="md:hidden text-white text-2xl mr-2"
          onClick={() => setSidebarOpen(true)}
          aria-label="Abrir menú social"
        >
          <Menu className="w-8 h-8" />
        </button>
        <div className="hidden md:flex items-center gap-3 text-white">
          <a
            href="https://www.instagram.com/starwars/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-yellow-400"
          >
            <Instagram className="w-5 h-5" />
          </a>
          <a
            href="https://www.facebook.com/StarWars"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-yellow-400"
          >
            <Facebook className="w-5 h-5" />
          </a>
          <a
            href="https://www.youtube.com/user/starwars"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-yellow-400"
          >
            <Youtube className="w-5 h-5" />
          </a>
          <a
            href="https://x.com/starwars"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-yellow-400"
          >
            <Twitter className="w-5 h-5" />
          </a>
        </div>

        <div className="flex justify-center flex-1">
          <NavLink to="/">
            <img
              src="https://lumiere-a.akamaihd.net/v1/images/sw_logo_stacked_2x-52b4f6d33087_7ef430af.png?region=0,0,586,254"
              alt="Star Wars Logo"
              className="h-12 object-contain"
            />
          </NavLink>
        </div>

        <div className="relative flex items-center">
          <button
            onClick={() => setShowFavs((prev) => !prev)}
            className="flex items-center gap-2 px-3 py-2 rounded hover:bg-zinc-800 transition text-white"
          >
            <Heart
              className="w-5 h-5"
              color={favorites.length > 0 ? "#ffe81f" : "#fff"}
              fill={favorites.length > 0 ? "#ffe81f" : "none"}
            />
            <span className="font-semibold">Favoritos</span>
            {favorites.length > 0 && (
              <span className="ml-1 bg-gray-600 text-xs rounded-full px-2 py-0.5">
                {favorites.length}
              </span>
            )}
          </button>

          {showFavs && (
            <>
              <div
                id="fav-backdrop"
                className="fixed inset-0 z-40 bg-black/40"
                onClick={handleBackdropClick}
              />
              <div className="absolute right-0 mt-64 w-80 bg-zinc-900/70 border border-zinc-700 rounded-lg shadow-lg z-50 animate-fade-in backdrop-blur-md">
                <div className="flex justify-between items-center px-4 py-3 border-b border-zinc-700">
                  <h3 className="text-lg font-bold text-[#ffe81f]">
                    Tus Favoritos
                  </h3>
                  <button
                    onClick={() => setShowFavs(false)}
                    className="text-zinc-400 hover:text-[#ffe81f]"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="max-h-64 overflow-y-auto px-4 py-2">
                  {favorites.length === 0 ? (
                    <p className="text-zinc-400">No tienes favoritos aún.</p>
                  ) : (
                    <ul className="space-y-2">
                      {favorites.map((fav) => (
                        <li
                          key={fav.uid + fav.type}
                          className="flex items-center gap-3 bg-zinc-800 rounded p-2"
                        >
                          <img
                            src={`${import.meta.env.VITE_IMG_URL}/${fav.type}/${
                              fav.uid
                            }.jpg`}
                            alt={fav.name}
                            className="w-10 h-10 object-cover rounded-full border border-zinc-700"
                          />
                          <span className="flex-1 truncate text-white">
                            {fav.name}
                          </span>
                          <button
                            className="ml-2 text-[#ffe81f] hover:text-yellow-400"
                            onClick={() => removeFavorite(fav)}
                            title="Eliminar de favoritos"
                          >
                            <Heart
                              fill="#ffe81f"
                              color="#ffe81f"
                              className="w-5 h-5"
                            />
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </>
          )}
        </div>

        <SidebarSocial
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
      </div>
    </header>
  );
}
