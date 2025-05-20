import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { useDebounce } from "use-debounce";
import { fetchFilmSearcht } from "../../api";
import { useState } from "react";
import MovieList from "../../components/MovieList/MovieList";
import Loader from "../../components/Loader/Loader";
import Search from "../../components/Search/Search";

const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") ?? "";
  const [debounceQuery] = useDebounce(query, 1000);
  const [movies, setMovies] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const changeSearchQuery = (event) => {
    const newQuery = event.target.value;
    const nextSearchParams = new URLSearchParams(searchParams);

    if (newQuery !== "") {
      nextSearchParams.set("query", newQuery);
    } else {
      nextSearchParams.delete("query");
    }
    setSearchParams(nextSearchParams);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    if (debounceQuery.trim() === "") {
      setMovies([]);
      setIsError(false);
      return;
    }
    setLoading(true);
    setIsError(false);
    fetchFilmSearcht(debounceQuery)
      .then((data) => {
        setMovies(data.results);
        setIsError(false);
      })
      .catch((error) => {
        setIsError(true);
      })
      .finally(() => setLoading(false));
  }, [debounceQuery]);

  return (
    <>
      <Search
        query={query}
        onChange={changeSearchQuery}
        onSubmit={handleSubmit}
      />
      {isLoading && <Loader loading={isLoading} />}
      {!isLoading && isError && <p>Something went wrong, try again later</p>}
      {!isLoading &&
        !isError &&
        movies.length === 0 &&
        debounceQuery.trim() !== "" && (
          <p>No movies found. Try another query.</p>
        )}
      {movies.length > 0 && <MovieList films={movies} />}
    </>
  );
};

export default MoviesPage;
