import { Facebook, Instagram, Twitter, X, Youtube } from "lucide-react";

const SidebarSocial = ({ open, onClose }) => (
  <div
    className={`md:hidden fixed top-0 left-0 h-full w-56 bg-zinc-900 shadow-lg z-50 transform transition-transform duration-300 ${
      open ? "translate-x-0" : "-translate-x-full"
    }`}
  >
    <button
      className="absolute top-4 right-4 text-white text-2xl"
      onClick={onClose}
      aria-label="Cerrar"
    >
      <X className="w-7 h-7" />
    </button>
    <nav className="flex flex-col items-start mt-20 px-8 gap-6">
      <a
        href="https://www.facebook.com/StarWars"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 text-white hover:text-yellow-400 transition-all text-lg"
      >
        <Facebook className="w-7 h-7" />
        Facebook
      </a>
      <a
        href="https://www.instagram.com/starwars/"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 text-white hover:text-yellow-400 transition-all text-lg"
      >
        <Instagram className="w-7 h-7" />
        Instagram
      </a>
      <a
        href="https://x.com/starwars"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 text-white hover:text-yellow-400 transition-all text-lg"
      >
        <Twitter className="w-7 h-7" />
        Twitter
      </a>
      <a
        href="https://www.youtube.com/user/starwars"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 text-white hover:text-yellow-400 transition-all text-lg"
      >
        <Youtube className="w-7 h-7" />
        Youtube
      </a>
    </nav>
  </div>
);

export default SidebarSocial;