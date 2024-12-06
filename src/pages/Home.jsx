import React, { useContext, useEffect, useState, useCallback } from "react";
import MovieCard from "../components/MovieCard";
import "./Home.scss";
import { Input, Spin, Empty } from "antd";
import { MainContext } from "../Context/MainContext";
import Pagination from "../components/Pagination";
import { debounce } from "lodash";

const Home = () => {
  const {
    fetchMovies,
    movies,
    currentPage,
    setCurrentPage,
    totalResults,
    loading,
    setSearchQuery,
  } = useContext(MainContext);

  const [searchInput, setSearchInput] = useState(""); // Local search input state

  // Debounced function to fetch movies on typing
  const debouncedSearch = useCallback(
    debounce((query) => {
      setSearchQuery(query);
      setCurrentPage(1); // Reset to the first page when making a new search
      fetchMovies(query, 1);
    }, 500), // Wait 500ms after typing
    []
  );

  // Update the debounced function whenever `searchInput` changes
  useEffect(() => {
    if (searchInput.trim()) {
      debouncedSearch(searchInput);
    }
    // Cleanup debounce on unmount
    return () => {
      debouncedSearch.cancel();
    };
  }, [searchInput, debouncedSearch]);

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value); // Update local input state
  };

  return (
    <div className="home-container">
      {/* Search Bar */}
      <div className="search-container">
        <div className="search-bar">
          <input
            placeholder="Search movies..."
            allowClear
            size="large"
            value={searchInput}
            onChange={handleSearchChange}
          />
        </div>
      </div>

      {/* Movies Section */}
      {loading ? (
        <div className="loading-container">
          <Spin size="large" />
        </div>
      ) : movies.length > 0 ? (
        <div
          className={`movies-grid ${
            movies.length === 1 ? "single-movie" : ""
          }`}>
          {movies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      ) : (
        <Empty className="no-results" description="No movies found" />
      )}

      {/* Pagination */}
      {!loading && totalResults > 10 && (
        <Pagination
          current={currentPage}
          total={totalResults}
          pageSize={10} // Movies per page
          onChange={(page) => {
            setCurrentPage(page); // Update current page in context
            fetchMovies(searchInput, page); // Fetch movies for the new page
          }}
          loading={loading} // Disable pagination during loading
        />
      )}
    </div>
  );
};

export default Home;
