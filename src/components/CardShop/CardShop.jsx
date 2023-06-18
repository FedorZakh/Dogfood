// import "./index.scss";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { actions } from "../../storage/slices/basketSlice";
export const CardShop = ({
  name,
  price,
  wight,
  pictures,
  image,
  gender,
  likes,
  discount,
  product,
  count,
  ...args
}) => {
  const dispatch = useDispatch();
  const removeGoods = (product) => {
    dispatch(actions.removeGoods(product));
  };

  return (
    <div className={` card card__light`}>
      <div className="card__sticky card__sticky_type_top-left">
        {!!discount && <span className="card__discount">-{discount}%</span>}
      </div>
      <div className="card__sticky card__sticky_type_top-right">
        <button
          className={`card__favorite  "card__favorite_active" : ""}`}
        ></button>
      </div>
      <Link to={`/product/${product._id}`} className="card__link">
        <img src={pictures} alt="food" className="card__image" />
        <div className="card__desc">
          <span className="card__price">{price}p</span>
          <span className="card__weight">{wight}</span>
          <span className="card__weight">{count}шт</span>
        </div>
        <p className="card__name">{name}</p>
      </Link>
      <div className="card_btn">
        <span
          onClick={() => {
            alert("Поздравляю! Заказ оформлен");
          }}
          className="card__card btn btn_type_primary"
        >
          Заказать
        </span>
        <span
          onClick={() => removeGoods({ product: product, count })}
          className="card__card btn btn_type_primary"
        >
          Удалить
        </span>
      </div>
    </div>
  );
};
