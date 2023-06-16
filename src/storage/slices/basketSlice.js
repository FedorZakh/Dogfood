import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  goods: [],
};
// localStorage.setItem("basket", JSON.stringify(initialState));
const basketSlice = createSlice({
  name: "basket",
  initialState: initialState,
  reducers: {
    addGoods: (state, { payload }) => {
      const productInBasket = state.goods.find(
        (e) => e.product._id === payload.product._id
      );
      localStorage.setItem("basket", JSON.stringify(state));
      if (productInBasket) {
        const order = productInBasket.count + payload.count;
        productInBasket.count =
          order < payload.product.stock ? order : productInBasket.count;
      } else {
        state.goods.push(payload);
      }
    },
    removeGoods: (state, { payload }) => {
      // useLocalStorage
      const productInBasket = state.goods.find(
        (e) => e.product._id === payload.product._id
      );
      if (productInBasket) {
        productInBasket.count = productInBasket.count - payload.count;
      }

      // state.goods
    },
  },
});
// ----------------------------------------------------

export const { actions } = basketSlice;

export default basketSlice.reducer;
