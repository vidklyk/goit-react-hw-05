import { Link, useLocation } from "react-router-dom";

export default function MovieList({ films }) {
  const location = useLocation();
  return (
    <ul>
      {films.map((film) => (
        <li key={film.id}>
          <img
            src={
              film.poster_path
                ? `https://image.tmdb.org/t/p/w200${film.poster_path}`
                : "https://via.placeholder.com/200x300?text=No+Image"
            }
            alt={film.title}
          />
          <div>
            <h3>{film.title}</h3>
            <p>Rating: {film.vote_average.toFixed(1)}</p>
            <Link to={`/movies/${film.id}`} state={{ from: location }}>
              Read more
            </Link>
          </div>
        </li>
      ))}
    </ul>
  );
}
