import "./index.scss";
import { ReactComponent as Like } from "./img/like.svg";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchChangeProductLike } from "../../storage/slices/productsSlice";
import { actions } from "../../storage/slices/basketSlice";
export const Card = ({
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
  const quantity = product.stock;
  const { data: user } = useSelector((s) => s.user);

  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(fetchChangeProductLike({ product: product, wasLiked: isLiked }));
  };
  const addToCart = (product) => {
    dispatch(actions.addGoods(product));
  };

  const isLiked = likes.some((e) => e === user._id);
  return (
    <div className={` card card__light`}>
      <div className="card__sticky card__sticky_type_top-left">
        {!!discount && <span className="card__discount">-{discount}%</span>}
        {args.tags.map((e) => (
          <span className={`tag tag_type_${e}`} key={e}>
            {e}
          </span>
        ))}
      </div>
      <div className="card__sticky card__sticky_type_top-right">
        <button
          onClick={handleClick}
          className={`card__favorite ${isLiked ? "card__favorite_active" : ""}`}
        >
          <Like />
        </button>
      </div>
      <Link to={`/product/${product._id}`} className="card__link">
        <img src={pictures ?? image} alt="food" className="card__image" />
        <div className="card__desc">
          <span className="card__price">{price}p</span>
          <span className="card__weight">{wight}</span>
        </div>
        <p className="card__name">{name}</p>
      </Link>
      {quantity === 0 ? (
        <h4>Товара нет</h4>
      ) : (
        <>
          <span
            className="card__card btn btn_type_primary"
            onClick={() => addToCart({ product: product, count: 1 })}
          >
            В Корзину
          </span>
        </>
      )}
    </div>
  );
};
