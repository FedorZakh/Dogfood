import React, { useContext } from "react";
import "./index.css";
import { ReactComponent as Like } from "./img/like.svg";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import { CardsContext } from "../../context/cardContext";
import { ThemeContext } from "../../context/themeContext";

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
  const user = useContext(UserContext);
  const { handleLike } = useContext(CardsContext);

  const handleClick = () => {
    handleLike(product, isLiked);
  };

  const theme = useContext(ThemeContext);

  const isLiked = likes.some((e) => e === user._id);
  return (
    <div className={` card card__${theme ? "light" : "dark"} `}>
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

      <span className="card__card btn btn_type_primary">В Корзину</span>
    </div>
  );
};
