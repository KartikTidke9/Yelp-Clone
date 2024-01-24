import { useEffect } from "react";
import Header from "../components/Header";
import { useSelector } from "react-redux";
import { fetchReviews, findRestaurant } from "../store";
import { useParams } from "react-router-dom";
import { useThunk } from "../hooks/useThunk";
import Ratings from "../components/Ratings";
import Reviews from "../components/Reviews";
import AddReview from "../components/AddReview";

function Details() {
  const { id } = useParams();
  const [doFindRestro, loadingRestro, errorLoadingRestro] =
    useThunk(findRestaurant);
  const [dofetchReviews, loadingReviews, errorLoadingReviews] =
    useThunk(fetchReviews);

  const {
    activeRestaurant: { name },
  } = useSelector((state) => state.restaurant);
  const { reviews } = useSelector((state) => state.review);
  const avgRating =
    reviews.data.reduce((acc, r) => acc + Number(r.rating), 0) / reviews.result;

  useEffect(() => {
    doFindRestro(id);
    dofetchReviews(id);
  }, [doFindRestro, dofetchReviews, id]);

  if (loadingRestro || loadingReviews) {
    return <div>Loading...</div>;
  }

  if (errorLoadingRestro || errorLoadingReviews) {
    return (
      <div>
        <p>{errorLoadingRestro || errorLoadingReviews}</p>
        <button className="btn btn-primary" onClick={() => doFindRestro(id)}>
          Retry
        </button>
      </div>
    );
  }
  
  return (
    <>
      <Header title={name} />
      <div className="d-flex justify-content-center align-items-center gap-1">
        <Ratings rating={avgRating} /> ({reviews.result})
      </div>
      <Reviews reviews={reviews} />
      <AddReview restaurantId={id} />
    </>
  );
}

export default Details;
