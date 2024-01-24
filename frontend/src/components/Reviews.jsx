import Ratings from "./Ratings";

function Reviews({ reviews }) {
  const renderedReviews = reviews.data.map((r) => {
    return (
      <div className="col-md-3 col flex-grow-1 card bg-primary" key={r.id}>
        <div className="card-header d-flex align-items-center justify-content-between">
          <span>{r.name}</span>
          <span>
            <Ratings rating={r.rating} />
          </span>
        </div>
        <div className="card-body">
          <p className="card-text">{r.review}</p>
        </div>
      </div>
    );
  });
  return (
    <div className="container">
      <div className="row mx-0 my-3 mx-md-0 d-flex flex-wrap flex-column flex-md-row gap-2">
        {renderedReviews}
      </div>
    </div>
  );
}

export default Reviews;
