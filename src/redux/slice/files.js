import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../axios";


const initialState={
    data: null,
    status: 'loading',
    file:null
}


export const fetchFiles=createAsyncThunk(
    'data/fetchFiles',
    async (params) =>{
        const {data}= await axios.post('/upload/', params)
        return data
    }
)

const filesSlice=createSlice({
    name: 'files',
    initialState,
    reducers:{
       setFile(state, action){
        state.file=action.payload
       } 
    },
    extraReducers:(builder) => {
        builder
        .addCase(fetchFiles.fulfilled, (state, action) =>{
           state.data=action.payload
        })
        .addCase(fetchFiles.rejected, (state) =>{
            state.data=null
         })
         .addCase(fetchFiles.pending, (state) =>{
            state.data=null
         })
    }
})


export const filesReducer=filesSlice.reducer

export const {setFile}=filesSlice.actions