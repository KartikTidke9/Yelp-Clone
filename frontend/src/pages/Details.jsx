import { useEffect } from "react";
import Header from "../components/Header";
import { useSelector } from "react-redux";
import { findRestaurant } from "../store";
import { useParams } from "react-router-dom";
import { useThunk } from "../hooks/useThunk";

function Details() {
  const { id } = useParams();
  const [doFindRestro, loadingRestro, errorLoadingRestro] =
    useThunk(findRestaurant);
  const {
    activeRestaurant: { name, location, price_range },
  } = useSelector((state) => state.restaurant);

  useEffect(() => {
    doFindRestro(id);
  }, [doFindRestro, id]);

  if (loadingRestro) {
    return <div>Loading...</div>;
  }

  if (errorLoadingRestro) {
    return (
      <div>
        <p>{errorLoadingRestro}</p>
        <button className="btn btn-primary" onClick={() => doFindRestro(id)}>
          Retry
        </button>
      </div>
    );
  }

  return (
    <>
      <Header title={name} />
    </>
  );
}

export default Details;
