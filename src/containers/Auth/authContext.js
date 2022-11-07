import { createContext, useReducer } from "react";
import axios from "axios";
import {authReducer} from '../../redux/authReducer'
import { LOCAL_STORAGE_TOKEN_NAME } from "../utils";

export const authContext = createContext()

const AuthContextProvider = ({children}) => {
    const {authState, dispatch} = useReducer(authReducer, {
        authLoading: true,
        isAuthenticated: false,
        user: null
    })
}
const loginUser = async userForm => {
    try {
        const response = await axios.post()
        if(response.data.success)
        localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, response.data.token1)
        return response.data
    }catch(error) {
        console.log('check 01', error)
    }
}

