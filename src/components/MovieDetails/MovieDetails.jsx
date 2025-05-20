import { Link } from "react-router-dom";

export default function MovieDetail({ film }) {
  return (
    <div>
      <img
        src={
          film.poster_path
            ? `https://image.tmdb.org/t/p/w500${film.poster_path}`
            : "https://placehold.co/200x300?text=No+Image"
        }
        alt={film.title}
      />
      <div>
        <h3>
          {film.title} (
          {film.release_date ? film.release_date.slice(0, 4) : "No year"})
        </h3>
        <p>Rating: {film.vote_average?.toFixed(1) ?? "N/A"}</p>
        <p>Genres: {film.genres.map((genre) => genre.name).join(", ")}</p>
      </div>
    </div>
  );
}
