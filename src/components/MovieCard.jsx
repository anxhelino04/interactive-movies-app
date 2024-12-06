import React, { useState, useEffect } from "react";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "./MovieCard.scss";

const MovieCard = ({ movie }) => {
  const { Title, Poster, Year, imdbID } = movie;
  const navigate = useNavigate();

  // Load favorites from local storage
  const loadFavorites = () =>
    JSON.parse(localStorage.getItem("favorites")) || [];

  const [favorites, setFavorites] = useState(loadFavorites);

  useEffect(() => {
    // Update favorites state if localStorage changes
    const updatedFavorites = loadFavorites();
    setFavorites(updatedFavorites);
  }, []);

  const isFavorited = favorites.some((fav) => fav.imdbID === imdbID);

  const toggleFavorite = (e) => {
    e.stopPropagation(); // Prevent navigation when clicking the "Save" button
    const updatedFavorites = isFavorited
      ? favorites.filter((fav) => fav.imdbID !== imdbID) // Remove
      : [...favorites, movie]; // Add

    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const handleCardClick = () => {
    navigate(`/movie/${imdbID}`); // Navigate to the movie details page
  };

  return (
    <div className="movie-card" onClick={handleCardClick}>
      <div className="poster-container">
        <img
          src={Poster !== "N/A" ? Poster : "https://via.placeholder.com/300"}
          alt={`${Title} Poster`}
          className="movie-poster"
        />
      </div>
      <div className="card-content">
        <h3 className="movie-title">{Title}</h3>
        <p className="movie-year">{Year}</p>
        <button
          className={`favorite-btn ${isFavorited ? "favorited" : ""}`}
          onClick={toggleFavorite}>
          {isFavorited ? (
            <>
              <HeartFilled style={{ color: "red" }} /> Saved
            </>
          ) : (
            <>
              <HeartOutlined /> Save
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default MovieCard;
