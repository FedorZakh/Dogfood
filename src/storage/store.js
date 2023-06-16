import { configureStore } from "@reduxjs/toolkit";
import productsSlice from "./slices/productsSlice";
import userSlice from "./slices/userSlice";
import { api } from "../utils/api";
import basketSlice from "./slices/basketSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    products: productsSlice,
    basket: basketSlice,
  },
  // middleware: (getDefaultMiddleWare) => getDefaultMiddleWare({
  //   thunk: {
  //     extraArgument: api
  //   }
  // })
});

export default store;
