import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../storage/slices/basketSlice";
import { CardShop } from "../../components/CardShop/CardShop";
import "./index.scss";
export const BasketPage = () => {
  const cardBasket = useSelector((state) => state.basket.goods);

  return (
    <div className="basketPage">
      <div className="cards">
        {cardBasket.map((item) => {
          return (
            <CardShop
              key={item.product._id}
              {...item.product}
              product={item.product}
              count={item.count}
            />
          );
        })}
      </div>
      <div className="textcart">
        <span>Доставка по всему Миру!</span>
        <span>Доставка курьером — от 399 ₽</span>
        <span>Доставка курьером — от 399 ₽</span>
      </div>
      <div className="textsum">
        Сумма заказа{" "}
        {cardBasket.reduce((acc, val) => {
          return acc + val.product.price * val.count;
        }, 0)}{" "}
        рублей
      </div>
    </div>
  );
};

//////////////////////////
/* <button onClick={()=> dispatch(actions.addGoods({ product: { _id: 1 }, count: 1 }))}>click</button>
    <button onClick={()=> dispatch(actions.removeGoods({ product: { _id: 1 }, count: 1 }))}>remove</button> */
