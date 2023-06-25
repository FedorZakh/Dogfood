import "./index.scss";
import s from "./index.module.scss";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
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
  const removeGoods = (product, count) => {
    dispatch(actions.removeGoods({ product: product, count: count }));
  };
  const addGoods = (product, count) => {
    dispatch(actions.addGoods({ product: product, count: count }));
  };
  const [counter, setCount] = useState(count);
  const countPlus = (product) => {
    setCount(counter + 1);
    addGoods(product, 1);
  };
  const countMinus = (product) => {
    setCount(counter - 1);
    removeGoods(product, 1);
  };

  return (
    <div className={`todo`}>
      <div className="todo__sticky todo__sticky_type_top-left">
        {!!discount && <span className="todo__discount">-{discount}%</span>}
      </div>
      <div className="todo__sticky todo__sticky_type_top-right">
        <button
          className={`todo__favorite  "todo__favorite_active" : ""}`}
        ></button>
      </div>
      <Link to={`/product/${product._id}`} className="todo__link">
        <img src={pictures} alt="food" className="todo__image" />
        <div className="todo__desc">
          <span className="todo__price">{price}p</span>
          <span className="todo__weight">{wight}</span>
          <span className="todo__weight">{count}шт</span>
        </div>
        <p className="todo__name">{name}</p>
      </Link>
      <div className="todo_btn">
        <span
          onClick={() => {
            removeGoods(product, count);
          }}
          className="todo__todo btn btn_type_primary"
        >
          Удалить
        </span>
        {counter > 0 && (
          <span
            onClick={() => countMinus(product)}
            className={s.controls__minus}
          >
            -
          </span>
        )}
        <span className={s.controls__cart__num}>{counter}</span>
        {counter < product.stock && (
          <span onClick={() => countPlus(product)} className={s.controls__plus}>
            +
          </span>
        )}
      </div>
    </div>
  );
};
