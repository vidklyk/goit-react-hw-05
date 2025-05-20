import { useEffect, useRef, useState } from "react";
import mycss from "./MovieDetailsPage.module.css";
import {
  NavLink,
  useParams,
  Outlet,
  Link,
  useLocation,
} from "react-router-dom";

import MovieDetails from "../../components/MovieDetails/MovieDetails";
import Loader from "../../components/Loader/Loader";

import { fetchDetailsFilm } from "../../api";

const MovieDetailsPage = () => {
  const location = useLocation();
  const backLinkRef = useRef(location.state?.from ?? "/movies");
  const { filmId } = useParams();
  const [film, setFilm] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setIsError(false);
    fetchDetailsFilm(filmId)
      .then((film) => {
        setFilm(film);
      })
      .catch((error) => {
        setIsError(true);
      })
      .finally(() => setLoading(false));
  }, [filmId]);

  return (
    <div className={mycss.box}>
      {isLoading && <Loader loading={isLoading} />}
      {!isLoading && isError && <p>Something went wrong, try again later</p>}
      <Link to={backLinkRef.current}>Go back</Link>
      {film && <MovieDetails film={film} />}
      <ul className={mycss.nav_list}>
        <li>
          <NavLink
            to="cast"
            className={({ isActive }) =>
              isActive ? `${mycss.nav_link} ${mycss.active}` : mycss.nav_link
            }
          >
            Cast list
          </NavLink>
        </li>
        <li>
          <NavLink
            to="reviews"
            className={({ isActive }) =>
              isActive ? `${mycss.nav_link} ${mycss.active}` : mycss.nav_link
            }
          >
            Reviews
          </NavLink>
        </li>
      </ul>
      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;
