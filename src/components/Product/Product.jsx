/* eslint-disable no-unused-vars */

import React, { useEffect, useState } from "react";
import s from "./index.module.scss";
import { BackNavigate } from "../BackNavigate/BackNavigate";
import { getEndings, productRating } from "../../utils/utils";
import { BaseButton } from "../Button/Button";
import truck from "./delivery.svg";
import { ReactComponent as Like } from "../Card/img/like.svg";
import cn from "classnames";
import { Rating } from "../Rating/Rating";
import { Reviews } from "../Reviews/Reviews";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { actions } from "../../storage/slices/basketSlice";

export const Product = ({
  product,
  onProductLike,
  sendReview,
  onDeleteReview,
}) => {
  const [isLikedProduct, setIsProductLike] = useState(false);

  const [count, setCount] = useState(0);
  const countPlus = () => setCount(count + 1);
  const countMinus = () => setCount(count - 1);
  const { data: user } = useSelector((s) => s.user);

  const getDiscountPrice = (discount, price) => {
    return (price - Math.floor((price * discount) / 100)).toFixed(0);
  };

  useEffect(() => {
    const isLiked = product.likes.some((e) => e === user?._id);
    setIsProductLike(isLiked);
  }, [product.likes, user]);

  const handleClick = () => {
    onProductLike(product, isLikedProduct);
  };

  const onSendReview = (data) => {
    sendReview(data);
  };
  const dispatch = useDispatch();
  const addToCart = (product) => {
    dispatch(actions.addGoods(product));
    console.log(product);
  };
  return (
    <div className={`${s.product} container`}>
      <div className={s.titleWrapper}>
        <BackNavigate />
        <span className={s.productTitle}>{product.name}</span>
        <div className={s.rating}>
          <span>Артикул</span>
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
              {count > 0 && (
                <span onClick={countMinus} className={s.controls__minus}>
                  -
                </span>
              )}
              <span className={s.controls__cart__num}>{count}</span>
              <span onClick={countPlus} className={s.controls__plus}>
                +
              </span>
            </div>
            <BaseButton onClick={() => addToCart({ product: product, count })}>
              В корзину
            </BaseButton>
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
        <div dangerouslySetInnerHTML={{ __html: product.description }}></div>
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
