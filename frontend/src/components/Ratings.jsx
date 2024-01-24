import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";

function Ratings({ rating = 0 }) {
  const renderStars = (r) => {
    const fullStars = parseInt(r);
    const halfStars = r > fullStars ? 1 : 0;
    const remainingStars = Math.abs(halfStars + fullStars - 5);

    const full = Array.from({ length: fullStars });
    const half = Array.from({ length: halfStars });
    const remain = Array.from({ length: remainingStars });

    return (
      <>
        {full.map((_, i) => {
          return <FaStar key={i} style={{ color: "orange" }} />;
        })}
        {half.map((_, i) => {
          return <FaStarHalfAlt key={i} style={{ color: "orange" }} />;
        })}
        {remain.map((_, i) => {
          return <FaRegStar key={i} style={{ color: "orange" }} />;
        })}
      </>
    );
  };

  return renderStars(rating);
}

export default Ratings;
