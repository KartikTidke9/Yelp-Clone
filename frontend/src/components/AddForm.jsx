import { useState } from "react";
import { useThunk } from "../hooks/useThunk";
import { createRestaurant } from "../store";

function AddForm() {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("price_range");
  const [doCreateRestaurant, loadingCreateRestaurant, errorLoadingRestaurant] =
    useThunk(createRestaurant);

  const handleAdd = () => {
    if (!name || !location || price === "price_range") return;
    doCreateRestaurant({ name, location, price });
  };

  return (
    <div className="container-fluid my-4">
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
          <button className="btn btn-primary" onClick={handleAdd}>
            {loadingCreateRestaurant ? "Loading..." : "Add"}
          </button>
        </div>
      </div>
      {errorLoadingRestaurant && (
        <div className="text-danger">{errorLoadingRestaurant}</div>
      )}
    </div>
  );
}

export default AddForm;
