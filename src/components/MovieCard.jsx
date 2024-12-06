import React, { useState, useEffect } from "react";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { MainContext } from "../Context/MainContext";

import "./MovieCard.scss";

const MovieCard = ({ movie }) => {
  const { Title, Poster, Year, imdbID } = movie;
  const navigate = useNavigate();

  // Load favorites from local storage

  const { favorites, toggleFavorite } = useContext(MainContext);

  const isFavorited = favorites.some((fav) => fav.imdbID === imdbID);

  const handleCardClick = () => {
    navigate(`/movie/${imdbID}`); // Navigate to the movie details page
  };

  const handleToggleFavorite = (e) => {
    e.stopPropagation(); // Prevent card navigation when clicking the "Save" button
    toggleFavorite(movie);
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
          onClick={handleToggleFavorite}>
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
