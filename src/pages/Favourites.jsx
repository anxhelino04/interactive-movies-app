import React, { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import { Empty, Spin } from "antd";
import "./Favourites.scss";

const Favourites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time for better user experience
    setLoading(true);
    const fetchFavorites = () => {
      const storedFavorites =
        JSON.parse(localStorage.getItem("favorites")) || [];
      setFavorites(storedFavorites);
      setLoading(false);
    };

    fetchFavorites();
  }, []);

  const handleRemoveFavorite = (movieID) => {
    const updatedFavorites = favorites.filter(
      (movie) => movie.imdbID !== movieID
    );
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <div className="favourites-container">
      <h1 className="favourites-title">Your Favourite Movies</h1>
      {loading ? (
        <div className="loading-container">
          <Spin size="large" />
        </div>
      ) : favorites.length > 0 ? (
        <div className="movies-grid">
          {favorites.map((movie) => (
            <MovieCard
              key={movie.imdbID}
              movie={movie}
              isFavorited={true}
              onRemove={() => handleRemoveFavorite(movie.imdbID)}
            />
          ))}
        </div>
      ) : (
        <div className="empty-container">
          <Empty description="No Favourite Movies Found" />
        </div>
      )}
    </div>
  );
};

export default Favourites;
