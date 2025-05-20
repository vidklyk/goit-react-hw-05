import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchReviews } from "../../api";
import Loader from "../Loader/Loader";

export default function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [expandedIds, setExpandedIds] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    fetchReviews(movieId)
      .then((data) => setReviews(data.results))
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, [movieId]);

  const toggleExpand = (id) => {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((el) => el !== id) : [...prev, id]
    );
  };
  return (
    <div>
      {isLoading && <Loader loading={isLoading} />}
      {isError && <p>Something went wrong while loading reviews.</p>}

      {!isLoading &&
        !isError &&
        (reviews.length > 0 ? (
          reviews.map((review) => {
            const isExpanded = expandedIds.includes(review.id);
            return (
              <div key={review.id}>
                <h3>Author: {review.author}</h3>
                <p onClick={() => toggleExpand(review.id)}>{review.content}</p>
              </div>
            );
          })
        ) : (
          <p>No reviews yet.</p>
        ))}
    </div>
  );
}
