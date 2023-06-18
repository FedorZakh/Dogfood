import "./index.scss";
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
          onClick={() => removeGoods({ product: product, count: count })}
          className="todo__todo btn btn_type_primary"
        >
          Удалить
        </span>
      </div>
    </div>
  );
};
