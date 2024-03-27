import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from '../../axios'

const initialState={
    data: null,
    status: 'loading'
}

export const fetchLogin=createAsyncThunk('user/fetchLogin', async (params) =>{
    const {data}= await axios.post('/auth/login', params)
    return data
})

export const fetchRegister=createAsyncThunk('user/fetchRegister', async (params) => {
    const {data} =await axios.post('/auth/register', params)
    return data 
} )


const authSlice=createSlice({
    name:'auth',
    initialState,
    reducers:{},
    extraReducers:(builder) =>{
        builder.addCase(fetchLogin.fulfilled, (state, action) =>{
            state.data=action.payload
            state.status='loaded'
        })
        .addCase(fetchLogin.rejected, (state) =>{
            state.data=null
            state.status='loading'
        })
        .addCase(fetchLogin.pending, (state) =>{
            state.data=null
            state.status='error'
        })
        .addCase(fetchRegister.fulfilled, (state, action) =>{
            state.data=action.payload
            state.status='loaded'
        })
        .addCase(fetchRegister.rejected, (state) =>{
            state.data=null
            state.status='loading'
        })
        .addCase(fetchRegister.pending, (state) =>{
            state.data=null
            state.status='error'
        })
    }
})

export const selectIsAuth=(state) => Boolean(state.auth.data)

export const authReducer=authSlice.reducer