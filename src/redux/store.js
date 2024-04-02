import {configureStore} from "@reduxjs/toolkit"
import { authReducer } from "./slice/auth"
import {filesReducer} from './slice/files'

const store=configureStore({
    reducer:{
        auth: authReducer,
        files: filesReducer
    }
})

export default store