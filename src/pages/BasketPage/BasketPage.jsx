import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../storage/slices/basketSlice";
import { CardShop } from "../../components/CardShop/CardShop";

export const BasketPage = () => {
  const cardBasket = useSelector((state) => state.basket.goods);

  return (
    <div className="cards">
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
    </div>
  );
};

//////////////////////////
/* <button onClick={()=> dispatch(actions.addGoods({ product: { _id: 1 }, count: 1 }))}>click</button>
    <button onClick={()=> dispatch(actions.removeGoods({ product: { _id: 1 }, count: 1 }))}>remove</button> */
