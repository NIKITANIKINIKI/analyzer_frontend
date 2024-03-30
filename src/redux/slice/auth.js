import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../axios";

const initialState = {
  data: null,
  status: "loading",
};

export const fetchLogin = createAsyncThunk(
  "user/fetchLogin",
  async (params) => {
    const { data } = await axios.post("/auth/login", params);
    return data;
  }
);

export const fetchRegister = createAsyncThunk(
  "user/fetchRegister",
  async (params) => {
    const { data } = await axios.post("/auth/register", params);
    return data;
  }
);

export const fetchMe=createAsyncThunk(
    'user/fetchMe',
    async ()=>{
        const {data}=await axios.get('/auth/me')
        return data
    }
)

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = "loaded";
      })
      .addCase(fetchLogin.rejected, (state) => {
        state.data = null;
        state.status = "loading";
      })
      .addCase(fetchLogin.pending, (state) => {
        state.data = null;
        state.status = "error";
      })
      //
      .addCase(fetchRegister.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = "loaded";
      })
      .addCase(fetchRegister.rejected, (state) => {
        state.data = null;
        state.status = "loading";
      })
      .addCase(fetchRegister.pending, (state) => {
        state.data = null;
        state.status = "error";
      })
      //
      .addCase(fetchMe.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = "loaded";
      })
      .addCase(fetchMe.rejected, (state) => {
        state.data = null;
        state.status = "loading";
      })
      .addCase(fetchMe.pending, (state) => {
        state.data = null;
        state.status = "error";
      });
  },
});

export const selectIsAuth = (state) => Boolean(state.auth.data);

export const authReducer = authSlice.reducer;

export const {logout}=authSlice.actions