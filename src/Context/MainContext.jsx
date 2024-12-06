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

  const addToFavorites = (movie) => {
    setFavorites((prev) => {
      const alreadyFavorited = prev.some((fav) => fav.imdbID === movie.imdbID);
      if (alreadyFavorited) {
        return prev;
      }
      const updatedFavorites = [...prev, movie];
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites)); // Save to localStorage
      return updatedFavorites;
    });
  };

  const removeFromFavorites = (movieID) => {
    setFavorites((prev) => {
      const updatedFavorites = prev.filter((movie) => movie.imdbID !== movieID);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites)); // Save to localStorage
      return updatedFavorites;
    });
  };

  return (
    <MainContext.Provider
      value={{
        theme,
        toggleTheme,
        movies,
        favorites,
        addToFavorites,
        removeFromFavorites,
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
