import locationHelperBuilder from "redux-auth-wrapper/history4/locationHelper";
import { connectedRouterRedirect } from "redux-auth-wrapper/history4/redirect";
import { LOCAL_STORAGE_TOKEN_NAME } from "../utils";
import axios from "axios";
import Token from "markdown-it/lib/token";
import { dispatch } from "../redux";

const locationHelper = locationHelperBuilder({});

export const userIsAuthenticated = connectedRouterRedirect({
    authenticatedSelector: state => state.user.isLoggedIn,
    wrapperDisplayName: 'UserIsAuthenticated',
    redirectPath: '/login'
});

export const userIsNotAuthenticated = connectedRouterRedirect({
    // Want to redirect the user when they are authenticated
    authenticatedSelector: state => !state.user.isLoggedIn,
    wrapperDisplayName: 'UserIsNotAuthenticated',
    redirectPath: (state, ownProps) => locationHelper.getRedirectQueryParam(ownProps) || '/',
    allowRedirectBack: false
});

// const loadUser = async () => {
//     if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
//         setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME])
//     }
//     try {
//         const response = await axios.get(`${apiUrl}/auth`)
//         if (response.data.success){
//             dispatch({
//                 type: 'SET_AUTH',
//                 payload: {isAuthenticated: true, user: response.data.user}
//             })
//         }
//     }catch (error) {
//         localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME)
//     }
// }

const setAuthToken = token => {
    if(token) {
        axios.defaults.headers.common['Authorization'] = `mysecret ${token}`
    }else{
        delete axios.defaults.headers.common['Authorization']
        setAuthToken(null)
        dispatch({type: 'SET_AUTH', payload: {isAuthenticated: false, user: null}})
    }
}
