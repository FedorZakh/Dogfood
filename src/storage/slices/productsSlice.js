import { openNotification } from "../../components/Notification/Notification";
import {
  CHEAPEST,
  EXPENSIVE,
  NEWEST,
  POPULAR,
  RATE,
  SALE,
} from "../../constants/constants";
import { api } from "../../utils/api";
import {
  filteredCards,
  findLiked,
  summaryProductRating,
} from "../../utils/utils";
import { isError, isLoading } from "../utilsStore";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const initialState = {
  products: [],
  loading: false,
  total: 0,
  favorites: [],
  currentProduct: {},
  search: null,
  chartsData: [],
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async function (id, { fulfillWithValue, getState, rejectWithValue }) {
    try {
      const state = getState();
      const data = await api.getProductList();
      return fulfillWithValue({ ...data, userId: state.user.data?._id });
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchChangeProductLike = createAsyncThunk(
  "products/fetchChangeProductLike",
  async function (data, arg) {
    try {
      const updatedCard = await api.changeProductLike(
        data.product._id,
        data.wasLiked
      );
      return arg.fulfillWithValue({ updatedCard, wasLiked: data.wasLiked });
    } catch (error) {
      return arg.rejectWithValue(error);
    }
  }
);

export const searchProductsByQuery = createAsyncThunk(
  "products/searchProductsByQuery",
  async function (search, { fulfillWithValue, rejectWithValue }) {
    try {
      const result = await api.searchProducts(search);
      return fulfillWithValue(result);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const products = createSlice({
  name: "products",
  initialState,
  reducers: {
    sortedProducts: (state, action) => {
      switch (action.payload) {
        case CHEAPEST:
          state.products = state.products.sort((a, b) => a.price - b.price);
          break;
        case EXPENSIVE:
          state.products = state.products.sort((a, b) => b.price - a.price);
          break;
        case POPULAR:
          state.products = state.products.sort(
            (a, b) => b.likes.length - a.likes.length
          );
          break;
        case NEWEST:
          state.products = state.products.sort(
            (a, b) => new Date(b.created_at) - new Date(a.created_at)
          );
          break;
        case SALE:
          state.products = state.products.sort(
            (a, b) => b.discount - a.discount
          );
          break;
        case RATE:
          state.products = state.products.sort(
            (a, b) =>
              summaryProductRating(b.reviews) - summaryProductRating(a.reviews)
          );
          break;
        default:
          state.products = state.products.sort((a, b) => a.price - b.price);
      }
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    getChartData: (state, action) => {
      console.log({ state });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      const authorCards = filteredCards(action.payload.products) ?? [];
      state.products = authorCards;
      state.favorites = authorCards.filter((e) =>
        findLiked(e, action.payload.userId)
      );
      state.total = action.payload.total;
    });
    builder.addCase(fetchChangeProductLike.fulfilled, (state, action) => {
      const updatedCard = action.payload.updatedCard;
      const wasLiked = action.payload.wasLiked;
      state.products = state.products.map((e) =>
        e._id === updatedCard?._id ? updatedCard : e
      );
      if (wasLiked) {
        state.favorites = state.favorites.filter(
          (f) => f._id !== updatedCard._id
        );
      } else {
        state.favorites = [...state.favorites, updatedCard];
      }
    });
    builder.addCase(searchProductsByQuery.fulfilled, (state, { payload }) => {
      state.products = filteredCards(payload);
    });

    builder.addMatcher(isError, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      openNotification("error", "Error", action.payload.message);
    });
    builder.addMatcher(isLoading, (state) => {});
  },
});

export const { sortedProducts, setSearch, getChartData } = products.actions;

export default products.reducer;
