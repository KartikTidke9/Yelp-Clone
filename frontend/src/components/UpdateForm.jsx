import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useThunk } from "../hooks/useThunk";
import { updateRestaurant } from "../store";

function UpdateForm({ preName, preLocation, prePrice, id }) {
  const [name, setName] = useState(preName);
  const [location, setLocation] = useState(preLocation);
  const [price, setPrice] = useState(prePrice);
  const [
    doUpdateRestaurant,
    loadingUpdateRestaurant,
    errorUpdatingRestaurant,
    ,
    isUpdateRan,
  ] = useThunk(updateRestaurant);
  const navigate = useNavigate();

  const handleUpdate = () => {
    if (!name || !location || price === "price_range") return;
    doUpdateRestaurant({ id, name, location, price });

    if (!errorUpdatingRestaurant || isUpdateRan || !loadingUpdateRestaurant) {
      navigate(-1);
    }
  };
  return (
    <div className="container my-4">
      <div className="row d-flex justify-content-center align-items-center">
        <div className="col-md-4">
          <label className="form-label">Name</label>
          <input
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <label className="form-label">Location</label>
          <input
            className="form-control"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <div className="col-md-3">
          <label className="form-label">Price range</label>
          <select
            className="form-select"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          >
            <option value="price_range" disabled>
              Price Range
            </option>
            <option value="1">$</option>
            <option value="2">$$</option>
            <option value="3">$$$</option>
            <option value="4">$$$$</option>
            <option value="5">$$$$$</option>
          </select>
        </div>
        <div className="col-1 align-self-end mt-2">
          <button className="btn btn-primary" onClick={handleUpdate}>
            {loadingUpdateRestaurant ? "Loading..." : "Update"}
          </button>
          <button
            className="btn btn-warning mt-md-0 mt-2"
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>
        </div>
      </div>
      {errorUpdatingRestaurant && (
        <div className="text-danger">{errorUpdatingRestaurant}</div>
      )}
    </div>
  );
}

export default UpdateForm;
