import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://www.omdbapi.com/";
const API_KEY = "7b4d1853";

const useFetchMovies = (query, page = 1) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalResults, setTotalResults] = useState(0);

  useEffect(() => {
    if (!query) return;

    const fetchMovies = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(API_URL, {
          params: {
            s: query, // Movie search keyword
            apikey: API_KEY,
            page, // Page number for pagination
          },
        });

        if (response.data.Response === "True") {
          setMovies(response.data.Search);
          setTotalResults(Number(response.data.totalResults));
        } else {
          setMovies([]);
          setError(response.data.Error || "No results found.");
        }
      } catch (err) {
        setError(err.message || "An error occurred while fetching movies.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [query, page]);

  return { movies, loading, error, totalResults };
};

export default useFetchMovies;
