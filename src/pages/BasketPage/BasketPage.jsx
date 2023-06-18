import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../storage/slices/basketSlice";
import { CardBasket } from "../../components/Card/CardBasket";
export const BasketPage = () => {
  const cardBasket = useSelector((state) => state.basket.goods);

  return (
    <div>
      <div className="cards">
        <div className="cards">
          {cardBasket.map((item) => {
            return (
              <CardBasket
                key={item.product._id}
                {...item.product}
                product={item.product}
              />
            );
          })}
        </div>
        ;
      </div>
    </div>
  );
};

//////////////////////////
/* <button onClick={()=> dispatch(actions.addGoods({ product: { _id: 1 }, count: 1 }))}>click</button>
    <button onClick={()=> dispatch(actions.removeGoods({ product: { _id: 1 }, count: 1 }))}>remove</button> */
