/* eslint-disable no-unused-vars */

import React, { useContext, useEffect, useState } from "react";
import s from "./index.module.scss";
import { BackNavigate } from "../BackNavigate/BackNavigate";
import { CardsContext } from "../../context/cardContext";
import { getEndings } from "../../utils/utils";
import { BaseButton } from "../Button/Button";
import truck from "./delivery.svg";
import { ReactComponent as Like } from "../Card/img/like.svg";
import cn from "classnames";
import { Rating } from "../Rating/Rating";
import { Reviews } from "../Reviews/Reviews";

export const Product = ({
  product,
  onProductLike,
  sendReview,
  onDeleteReview,
}) => {
  const [isLikedProduct, setIsProductLike] = useState(false);
  const { user } = useContext(CardsContext);

  const getDiscountPrice = (discount, price) => {
    return (price - Math.floor((price * discount) / 100)).toFixed(0);
  };

  useEffect(() => {
    const isLiked = product.likes.some((e) => e === user?._id);
    setIsProductLike(isLiked);
  }, [product.likes, user]);

  const handleClick = () => {
    onProductLike(product, isLikedProduct);
    setIsProductLike(!isLikedProduct);
  };

  const onSendReview = (data) => {
    sendReview(data);
  };

  const productRating = (reviews) => {
    if (!reviews || !reviews.length) {
      return 0;
    }
    const res = reviews.reduce((acc, el) => (acc += el.rating), 0);
    return Math.floor(res / reviews.length);
  };

  return (
    <div className={`${s.product} container`}>
      <div className={s.titleWrapper}>
        <BackNavigate />
        <span className={s.productTitle}>{product.name}</span>
        <div className={s.rating}>
          <span>Artikul </span>
          <Rating rating={productRating(product.reviews)} />
          <span>
            {product.reviews.length}
            {getEndings(product.reviews.length, "отзыв")}
          </span>
        </div>
      </div>

      <div className={s.productInfo}>
        <div className={s.imgWrapper}>
          <img className={s.img} src={product.pictures} alt="" />
        </div>
        <div className={s.desc}>
          <span
            className={`${s.price} ${!!product.discount ? s.oldPrice : ""}`}
          >
            {product.price}&nbsp;p
          </span>
          {!!product.discount && (
            <span
              className={`${s.price} ${!!product.discount ? s.newPrice : ""}`}
            >
              {getDiscountPrice(product.discount, product.price)}&nbsp;p
            </span>
          )}

          <div className={s.controls}>
            <div className={s.controls__cart__left}>
              <span className={s.controls__minus}>-</span>
              <span className={s.controls__cart__num}>0</span>
              <span className={s.controls__plus}>+</span>
            </div>
            <BaseButton>В корзину</BaseButton>
          </div>
          <button
            className={cn(s.favorite, { [s.favoriteActive]: isLikedProduct })}
            onClick={handleClick}
          >
            <Like />
            <span>{isLikedProduct ? "В избранном" : "В избранное"}</span>
          </button>

          <div className={s.delivery}>
            <img src={truck} alt="truck" className="" />
            <div>
              <span className={s.desc}>Доставка по всему Миру!</span>
              <p className={s.text}>Доставка курьером — от 399 ₽</p>
              <p className={s.text}>Доставка курьером — от 399 ₽</p>
            </div>
          </div>
        </div>
      </div>

      <div className={s.desc}>
        <span className={s.price}>Описание</span>
        <span>{product.description}</span>
      </div>
      <div className={s.desc}>
        <span className={s.price}>Характеристики</span>
        <span>{product.description}</span>
      </div>
      <Reviews
        onDeleteReview={onDeleteReview}
        onSendReview={onSendReview}
        reviews={product.reviews}
      />
    </div>
  );
};
