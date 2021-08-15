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
    localStorage.removeItem('token');
    localStorage.removeItem('expirationTime');
    localStorage.removeItem('userId')
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
            console.log(res);
            const expirationDate = new Date(new Date().getTime() + res.data.expiresIn * 1000);//?
            localStorage.setItem('token', res.data.idToken);
            localStorage.setItem('expirationDate', expirationDate);
            localStorage.setItem('userId', res.data.localId);
            dispatch(authSuccess(res.data.idToken, res.data.localId));
            dispatch(checkAuthTimeout(res.data.expiresIn));
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

export const authCheckState = () =>{
    return dispatch => {
        const token = localStorage.getItem('token');
        //?Or use local storage to store userId
        const userId = localStorage.getItem('userId')

        if (!token) {
            dispatch(logout())
        }else {
            const expirationDate =new Date(localStorage.getItem('expirationDate'))//! convert the string from local storage to a date object;
            if (expirationDate >= new Date()){
                //?send an api requeste to get user data firbase 
                // let userId;
                // axios.post('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=[API_KEY]')
                // .then(res => {
                //     console.log(res);
                //     userId = res.users.localId;
                // })
                // .catch(e=rr => {
                //     console.error(err); 
                // })

                dispatch(authSuccess(token, userId));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000))
            }else {
                dispatch(logout());
            }
            
        }
    };
}