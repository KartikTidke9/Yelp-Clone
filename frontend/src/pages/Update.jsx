import { useParams } from "react-router-dom";
import Header from "../components/Header";
import UpdateForm from "../components/UpdateForm";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useThunk } from "../hooks/useThunk";
import { findRestaurant } from "../store";

function Update() {
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
      <Header title={"Update Restaurant"} />
      <UpdateForm
        id={id}
        preName={name}
        preLocation={location}
        prePrice={price_range}
      />
    </>
  );
}

export default Update;
