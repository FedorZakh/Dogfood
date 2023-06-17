import "./index.scss";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchChangeProductLike } from "../../storage/slices/productsSlice";
import { actions } from "../../storage/slices/basketSlice";
export const CardBasket = ({
  name,
  price,
  wight,
  pictures,
  image,
  gender,
  likes,
  discount,
  product,
  ...args
}) => {
  return (
    <div className={` card card__light`}>
      <div className="card__sticky card__sticky_type_top-left"></div>
      <div className="card__sticky card__sticky_type_top-right">
        <button
          className={`card__favorite  "card__favorite_active" : ""}`}
        ></button>
      </div>
      <Link to={`/product/${product._id}`} className="card__link">
        <div className="card__desc">
          <span className="card__price">{price}p</span>
          <span className="card__weight">{wight}</span>
        </div>
        <p className="card__name">{name}</p>
      </Link>

      <span className="card__card btn btn_type_primary"></span>
    </div>
  );
};
