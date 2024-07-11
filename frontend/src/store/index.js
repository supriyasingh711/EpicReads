import {configureStore} from "@reduxjs/toolkit"
import { authActions } from "./auth";
import authReducer from "./auth"
const store=configureStore({
    reducer:{
        auth:authReducer
    },
})

export default store;
