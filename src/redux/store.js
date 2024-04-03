import {configureStore} from "@reduxjs/toolkit"
import { authReducer } from "./slice/auth"
import {filesReducer} from './slice/files'
import algorithmsReducer from "./slice/algorithms"

const store=configureStore({
    reducer:{
        auth: authReducer,
        files: filesReducer,
        algorithms: algorithmsReducer
    }
})

export default store