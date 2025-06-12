import { createContext, useState, useEffect, useContext } from "react";

const AppContext = createContext();
const API_URL = import.meta.env.VITE_API_URL;

export const AppProvider = ({ children }) => {
  const [people, setPeople] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [planets, setPlanets] = useState([]);
  const [favorites, setFavorites] = useState(() => {
    const local = localStorage.getItem("favorites");
    return local ? JSON.parse(local) : [];
  });
  const [isLoading, setIsLoading] = useState(true);

  const fetchStarWarsPersons = () => {
    const localData = localStorage.getItem("people");
    if (localData) {
      setPeople(JSON.parse(localData));
      return Promise.resolve();
    } else {
      return fetch(`${API_URL}/people?page=2&limit=90`)
        .then((res) => res.json())
        .then((data) => {
          localStorage.setItem("people", JSON.stringify(data.results));
          setPeople(data.results);
        })
        .catch((err) => console.error(err));
    }
  };

  const fetchStarWarsVehicles = () => {
    const localData = localStorage.getItem("vehicles");
    if (localData) {
      setVehicles(JSON.parse(localData));
      return Promise.resolve();
    } else {
      return fetch(`${API_URL}/vehicles?page=2&limit=90`)
        .then((res) => res.json())
        .then((data) => {
          localStorage.setItem("vehicles", JSON.stringify(data.results));
          setVehicles(data.results);
        })
        .catch((err) => console.error(err));
    }
  };

  const fetchStarWarsPlanets = () => {
    const localData = localStorage.getItem("planets");
    if (localData) {
      setPlanets(JSON.parse(localData));
      return Promise.resolve();
    } else {
      return fetch(`${API_URL}/planets?page=2&limit=90`)
        .then((res) => res.json())
        .then((data) => {
          localStorage.setItem("planets", JSON.stringify(data.results));
          setPlanets(data.results);
        })
        .catch((err) => console.error(err));
    }
  };

  useEffect(() => {
    Promise.all([
      fetchStarWarsPersons(),
      fetchStarWarsVehicles(),
      fetchStarWarsPlanets(),
    ]).then(() => {
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    });
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (item) => {
    setFavorites((prev) => {
      if (prev.some((fav) => fav.uid === item.uid && fav.type === item.type))
        return prev;
      return [...prev, item];
    });
  };

  const removeFavorite = (item) => {
    setFavorites((prev) =>
      prev.filter((fav) => !(fav.uid === item.uid && fav.type === item.type))
    );
  };

  return (
    <AppContext.Provider
      value={{
        people,
        vehicles,
        planets,
        favorites,
        addFavorite,
        removeFavorite,
        isLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
