import { useEffect } from "react";
import { useThunk } from "../hooks/useThunk";
import { deleteRestaurant, fetchAllRestaurants } from "../store";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Table() {
  const [
    doFetchAllRestaurants,
    loadingAllRestaurants,
    errorLoadingAllRestaurants,
  ] = useThunk(fetchAllRestaurants);

  const [
    doDeleteRestaurant,
    loadingDeleteRestaurant,
    errorLoadingDeleteRestaurant,
    resetErrorLoadingDeleteRestaurant,
  ] = useThunk(deleteRestaurant);

  const { restaurants } = useSelector((state) => state.restaurant);
  const navigate = useNavigate();

  const handleDelete = (e, id) => {
    e.stopPropagation();
    doDeleteRestaurant(id);
  };

  useEffect(() => {
    doFetchAllRestaurants();
  }, [doFetchAllRestaurants]);

  useEffect(() => {
    if (errorLoadingDeleteRestaurant) {
      setTimeout(() => {
        resetErrorLoadingDeleteRestaurant();
      }, 3000);
    }
  }, [errorLoadingDeleteRestaurant, resetErrorLoadingDeleteRestaurant]);

  let results;
  if (loadingAllRestaurants) {
    results = (
      <tr>
        <td>Loading...</td>
      </tr>
    );
  } else if (errorLoadingAllRestaurants) {
    results = (
      <tr>
        <td>{errorLoadingAllRestaurants}</td>
      </tr>
    );
  } else {
    results = restaurants?.data?.map((r) => {
      return (
        <tr key={r.id} onClick={() => navigate(`/restaurants/${r.id}`)} className="cursor-pointer">
          <td>{r.name}</td>
          <td>{r.location}</td>
          <td>{"$".repeat(r.price_range)}</td>
          <td>dsd</td>
          <td>
            <button
              className="btn btn-warning"
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/restaurants/${r.id}/update`);
              }}
            >
              Update
            </button>
          </td>
          <td>
            {loadingDeleteRestaurant ? (
              <div>Loading...</div>
            ) : !errorLoadingDeleteRestaurant ? (
              <button
                className="btn btn-danger"
                onClick={(e) => handleDelete(e, r.id)}
              >
                Delete
              </button>
            ) : (
              <p className="text-danger">{errorLoadingDeleteRestaurant}</p>
            )}
          </td>
        </tr>
      );
    });
  }

  return (
    <div className="mt-5 d-flex flex-column">
      <div className="align-self-end">
        Total Restaurants : {restaurants?.result}
      </div>
      <table className="table table-striped table-hover mt-1">
        <thead>
          <tr className="table-dark">
            <th>Restaurant</th>
            <th>Location</th>
            <th>Price Range</th>
            <th>Ratings</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>{results}</tbody>
      </table>
    </div>
  );
}

export default Table;
