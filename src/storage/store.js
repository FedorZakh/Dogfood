import { configureStore } from "@reduxjs/toolkit";
import productsSlice from "./slices/productsSlice";
import userSlice from "./slices/userSlice";
import basketSlice from "./slices/basketSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    products: productsSlice,
    basket: basketSlice,
  },
});

export default store;
