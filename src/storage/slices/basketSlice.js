// initial state
// ----------------------------------------------------

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../utils/api";
import { isError, isLoading } from "../utilsStore";
const initialState = {
  goods: [],
  loading: false,
};

localStorage.setItem("basket", JSON.stringify(initialState));
// ----------------------------------------------------

// actions
// ----------------------------------------------------

// ----------------------------------------------------
// slice // reducer
// ----------------------------------------------------

const basketSlice = createSlice({
  name: "basket",
  initialState: initialState,
  reducers: {
    addGoods: (state, { payload }) => {
      // payload = { _id: 1 }, count: 0 }
      console.log("пэйлоуд", payload);
      const productInBasket = state.goods.find(
        (e) => e.product._id === payload.product._id
      );
      if (productInBasket) {
        const order = productInBasket.count + payload.count;
        productInBasket.count =
          order < payload.product.stock ? order : productInBasket.count;
      } else {
        state.goods.push(payload);
      }
      console.log(state);

      // state.goods
    },
    removeGoods: (state, { payload }) => {
      // payload = { _id: 1 }, count: 0 }
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
