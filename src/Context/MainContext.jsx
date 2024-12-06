import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const MainContext = createContext();

export const MainProvider = ({ children }) => {
  // Theme state
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light" // Persist user preference
  );

  // Pagination and movies state
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [searchQuery, setSearchQuery] = useState("batman"); // Default query
  const [previousResults, setPreviousResults] = useState({}); // Cache results

  useEffect(() => {
    document.body.setAttribute("data-theme", theme); // Apply theme to the body
    localStorage.setItem("theme", theme); // Save user preference
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const [pageSize, setPageSize] = useState(10); // Default page size

  const fetchMovies = async (
    query = searchQuery,
    page = currentPage,
    size = pageSize
  ) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://www.omdbapi.com/?s=${query}&apikey=7b4d1853&page=${page}&pageSize=${size}`
      );
      if (response.data.Search) {
        setMovies(response.data.Search);
        setTotalResults(parseInt(response.data.totalResults, 10));
      } else {
        setMovies([]);
        setTotalResults(0);
      }
    } catch (err) {
      console.error("Error fetching movies:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  const [favourites, setFavourites] = useState([]);
  const toggleFavorite = (movie) => {
    const isFavorited = favorites.some((fav) => fav.imdbID === movie.imdbID);
    const updatedFavorites = isFavorited
      ? favorites.filter((fav) => fav.imdbID !== movie.imdbID) // Remove
      : [...favorites, movie]; // Add

    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };
  const removeFavorite = (movieID) => {
    const updatedFavorites = favorites.filter((fav) => fav.imdbID !== movieID);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <MainContext.Provider
      value={{
        theme,
        toggleTheme,
        movies,
        favorites,
        toggleFavorite,
        removeFavorite,
        fetchMovies,
        loading,
        currentPage,
        setCurrentPage,
        totalResults,
        searchQuery,
        setSearchQuery,
      }}>
      {children}
    </MainContext.Provider>
  );
};
