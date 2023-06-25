import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  goods: JSON.parse(localStorage.getItem("basket")).goods ?? [],
};

const basketSlice = createSlice({
  name: "basket",
  initialState: initialState,
  reducers: {
    addGoods: (state, { payload }) => {
      const productInBasket = state.goods.find(
        (e) => e.product._id === payload.product._id
      );
      if (productInBasket) {
        const order = productInBasket.count + payload.count;
        productInBasket.count =
          order <= payload.product.stock ? order : productInBasket.count;
      } else {
        state.goods.push(payload);
      }
      localStorage.setItem("basket", JSON.stringify(state));
    },
    removeGoods: (state, { payload }) => {
      const productInBasket = state.goods.find(
        (e) => e.product._id === payload.product._id
      );
      if (productInBasket) {
        productInBasket.count = productInBasket.count - payload.count;
      }
      state.goods = state.goods.filter((e) => e.count > 0);
      localStorage.setItem("basket", JSON.stringify(state));
    },
  },
});

export const { actions } = basketSlice;

export default basketSlice.reducer;
