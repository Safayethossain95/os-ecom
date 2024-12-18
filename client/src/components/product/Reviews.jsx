import StarRatings from "react-star-ratings";
import { productStore } from "../../store/ProductStore";

const Reviews = () => {
  const { ReviewList } = productStore();
  return (
    <>
      <div className="container">
        <ul className="list-group list-group-flush">
          {ReviewList?.map((item, i) => {
            return (
              <>
                <li key={i} className="list-group-item">
                  <h6>
                    {" "}
                    <i className="bi bi-person me-2"></i>
                    {item.profile.cus_name}
                  </h6>
                  <StarRatings
                    rating={parseFloat(item.rating)}
                    starRatedColor="red"
                    starDimension="15px"
                    starSpacing="2px"
                  />
                  <p>{item.des}</p>
                </li>
              </>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default Reviews;
