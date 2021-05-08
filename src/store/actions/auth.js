import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        userId : userId
    };
}
export const autFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
}

export const logout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        },expirationTime * 1000)
    };
}

export const auth = (email, password, isSIGNUP) => {

     let url;

    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };
        if (!isSIGNUP) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDwjnXt-_WyBk6dleVUwjIBGNJLwoj08J0'
        }else{
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDwjnXt-_WyBk6dleVUwjIBGNJLwoj08J0';
        }
        axios.post(url, authData)
        .then(res => {
            console.log(res)
            dispatch(authSuccess(res.data.idToken, res.data.localId));
            dispatch(checkAuthTimeout(res.data.expiresIn))
        })
        .catch(err => {
            console.log(err)
            dispatch(autFail(err.response.data.error));
        })
     
    }
}

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}