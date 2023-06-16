import { useDispatch } from "react-redux"
import { actions } from "../../storage/slices/basketSlice";



export const BasketPage = () => {


    const dispatch = useDispatch();
    return (<div>
<div>

    <button onClick={()=> dispatch(actions.addGoods({ product: { _id: 1 }, count: 1 }))}>click</button>
    <button onClick={()=> dispatch(actions.removeGoods({ product: { _id: 1 }, count: 1 }))}>remove</button>

</div>
        this is BasketPage
    </div>)
}