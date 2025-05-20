import { useEffect, useState } from "react";
import { fetchCast } from "../../api";
import { useParams } from "react-router-dom";
import Loader from "../Loader/Loader";

export default function MovieCast() {
  const [actors, setActors] = useState([]);
  const { movieId } = useParams();
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    fetchCast(movieId)
      .then((data) => setActors(data.cast))
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, [movieId]);

  return (
    <div>
      <h2>Cast list</h2>
      {isLoading && <Loader loading={isLoading} />}
      {isError && <p>Something went wrong while loading cast information.</p>}
      {!isLoading && !isError && actors.length === 0 && (
        <p>We don’t have any cast information for this movie.</p>
      )}
      {!isLoading && !isError && (
        <ul>
          {actors.map((actor) => (
            <li key={actor.credit_id}>
              <img
                src={
                  actor.profile_path
                    ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                    : "https://placehold.co/200x300?text=No+Image"
                }
                alt={actor.name}
              />
              <div>
                <h3>{actor.name}</h3>
                <p>
                  <strong>Character:</strong> {actor.character}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
