import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Spin, Button, Empty, Tag, notification } from "antd";
import {
  HeartOutlined,
  HeartFilled,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import "./MovieDetails.scss";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://www.omdbapi.com/?i=${id}&apikey=7b4d1853`
        );
        const fetchedMovie = response.data;

        if (fetchedMovie) {
          setMovie(fetchedMovie);

          // Check if the movie is saved in local storage
          const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
          const isSaved = favorites.some(
            (fav) => fav.imdbID === fetchedMovie.imdbID
          );
          setIsFavorited(isSaved);
        } else {
          setError("Movie not found.");
        }
      } catch (err) {
        setError("Failed to fetch movie details.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (isFavorited) {
      // Remove from favorites
      const updatedFavorites = favorites.filter(
        (fav) => fav.imdbID !== movie.imdbID
      );
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      setIsFavorited(false);
      notification.success({ message: "Removed from Favorites!" });
    } else {
      // Add to favorites
      favorites.push(movie);
      localStorage.setItem("favorites", JSON.stringify(favorites));
      setIsFavorited(true);
      notification.success({ message: "Added to Favorites!" });
    }
  };

  if (loading) {
    return (
      <div className="details-loading">
        <Spin size="large" />
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="details-error">
        <Empty description={error || "No movie found"} />
      </div>
    );
  }

  // Extract Rotten Tomatoes Rating
  const rottenTomatoesRating = movie.Ratings?.find(
    (rating) => rating.Source === "Rotten Tomatoes"
  )?.Value;

  return (
    <div className="movie-details-card">
      {/* Movie Poster */}
      <div className="movie-poster">
        <img
          src={
            movie.Poster !== "N/A"
              ? movie.Poster
              : "https://via.placeholder.com/300"
          }
          alt={movie.Title || "No Title Available"}
        />
      </div>

      {/* Movie Information */}
      <div className="movie-info">
        <h1 className="movie-title">{movie.Title || "Title Not Available"}</h1>
        <div className="buttons-div">
          <Button
            type="primary"
            style={{ marginTop: "20px" }}
            onClick={() => window.history.back()}
            icon={<ArrowLeftOutlined />}>
            Back
          </Button>

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

        {/* Movie Meta */}
        <div className="movie-meta">
          <p>
            <strong>Release Year:</strong> {movie.Year || "N/A"}
          </p>
          <p>
            <strong>Genre:</strong> {movie.Genre || "N/A"}
          </p>
          <p>
            <strong>Director:</strong> {movie.Director || "N/A"}
          </p>
          <p>
            <strong>Actors:</strong> {movie.Actors || "N/A"}
          </p>
          <p>
            <strong>Ratings:</strong>{" "}
            {rottenTomatoesRating || "Ratings Not Available"}
          </p>
        </div>

        {/* Movie Plot */}
        <div className="movie-plot">
          <strong>Plot Summary:</strong>
          <p>{movie.Plot || "Plot Not Available"}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
