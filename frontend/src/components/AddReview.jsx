import { useEffect, useState } from "react";
import { useThunk } from "../hooks/useThunk";
import { addReview } from "../store";

function AddReview({ restaurantId }) {
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  const [
    doAddReview,
    loadingAddReview,
    errorLoadingAddReview,
    resetAddReviewError,
  ] = useThunk(addReview);

  const handleAdd = () => {
    const data = {
      id: restaurantId,
      name,
      rating,
      review,
    };
    doAddReview(data);
    resetAddReviewError();
  };

  useEffect(() => {
    if (errorLoadingAddReview) {
      setTimeout(resetAddReviewError, 3000);
    }
  }, [errorLoadingAddReview, resetAddReviewError]);

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <label className="form-label">Name</label>
          <input
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="col-md-3">
          <label className="form-label">
            Rating - <span className="text-warning fw-bold">{rating}</span>
          </label>
          <input
            className="form-range"
            value={rating}
            type="range"
            step={0.1}
            onChange={(e) => setRating(e.target.value)}
            max={5}
            min={1}
          />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <label className="form-label">Review</label>
          <textarea
            className="form-control"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="write feedback"
          />
        </div>
      </div>
      <div className="mt-3">
        {errorLoadingAddReview && (
          <div className="text-danger">Retry: {errorLoadingAddReview}</div>
        )}
        <button onClick={handleAdd} className="btn btn-primary mt-3">
          {loadingAddReview ? "Loading..." : "Submit"}
        </button>
      </div>
    </div>
  );
}

export default AddReview;
