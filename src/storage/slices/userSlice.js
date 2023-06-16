// initial state
// ----------------------------------------------------

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../utils/api";
import { isError, isLoading } from "../utilsStore";

const initialState = {
  data: {},
  loading: false,
};
// ----------------------------------------------------

// actions
// ----------------------------------------------------
export const getMyUser = createAsyncThunk(
  "getUser",
  async function (
    dataFromUp,
    { getState, dispatch, fulfillWithValue, rejectWithValue }
  ) {
    // console.log({ dataFromUp });
    // const {products} = getState();
    // console.log({ products });

    const data = await api.getUserInfo();
    return data;

    // try {
    //   const data = await api.getUserInfo();
    //   return fulfillWithValue(data);
    // } catch (error) {
    //   return rejectWithValue(error);
    // }
  }
);

export const updateUser = createAsyncThunk("updateUser", async function (data) {
  console.log({ data });
  if (data.avatar) {
    const res = await api.updateUserAvatar({avatar: data.avatar});
    return res;
  } else {
    const res = await api.updateUserInfo({name: data.name, about: data.about});
    return res;
  }
});

// ----------------------------------------------------
// slice // reducer
// ----------------------------------------------------

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  extraReducers: (builder) => {
    // builder.addCase(getMyUser.pending, (state) => {
    //   state.loading = true;
    // });
    builder.addCase(getMyUser.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
    });
    // builder.addCase(getMyUser.rejected, (state, action) => {
    //   state.loading = false;
    // });
    builder.addMatcher(isError, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addMatcher(isLoading, (state) => {
      // state.loading = true;
    });
  },
});
// ----------------------------------------------------

export default userSlice.reducer;
