import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../axios";

const initialState = {
  data: null,
  status: "loading",
  files: null,
};

export const fetchFiles = createAsyncThunk(
  "data/fetchFiles",
  async (params) => {
    const { data } = await axios.post("/upload/", params);
    return data;
  }
);

export const fetchFilesData = createAsyncThunk(
  "files/fetchFilesData",
  async () => {
    const { data } = await axios.get(`/files/`);
    return data;
  }
);

export const fetchDeleteFile = createAsyncThunk(
  "files/fetchDeleteFile",
  async (_id) => {
    await axios.delete(`/files/${_id}`);
  }
);

const filesSlice = createSlice({
  name: "files",
  initialState,
  reducers: {
    //   setFile(state, action){
    //    state.file=action.payload
    //   }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFiles.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(fetchFiles.rejected, (state) => {
        state.data = null;
      })
      .addCase(fetchFiles.pending, (state) => {
        state.data = null;
      })
      //
      .addCase(fetchFilesData.fulfilled, (state, action) => {
        state.files = action.payload.files;
        state.status = "loaded";
      })
      .addCase(fetchFilesData.rejected, (state) => {
        state.status = "loading";
      })
      .addCase(fetchFilesData.pending, (state) => {
        state.status = "loading";
      })
      //
      .addCase(fetchDeleteFile.fulfilled, (state, action) => {
        state.files = state.files.filter(file => file.file_id !=action.meta.arg);
      })
  },
});

export const filesReducer = filesSlice.reducer;

export const { setFile } = filesSlice.actions;
