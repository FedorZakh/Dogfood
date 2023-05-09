import s from "./index.module.css";
import { NavLink } from "react-router-dom";
import { BackNavigate } from "../BackNavigate/BackNavigate";

export const Product = ({ product }) => {
  return (
    <div className={`${s.product} container`}>
      <div className={s.titleWrapper}>
        <BackNavigate />

        <span className={s.productTitle}>{product.name}</span>
        <div className={s.rating}>
          <span>Артикул</span>
          <span></span>
        </div>
      </div>
      <div className={s.imgWrapper}>
        <img className={s.img} src={product.pictures} alt="" />
      </div>

      <div className={s.desc}>
        <span className={s.price}>{product.price}&nbsp;p</span>
      </div>
      <div className={s.desc}>
        <NavLink
          className={(res) =>
            res.isPending ? "pending" : res.isActive ? s.link : ""
          }
        >
          <span className={s.price}>Описание</span>
        </NavLink>
        <span>{product.description}</span>
      </div>
    </div>
  );
};
