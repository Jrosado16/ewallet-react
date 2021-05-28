import { 
    LOADING, ERROR, LOGIN, TOKEN, GET_USER, SET_BALANCE, 
    ADD_BALANCE, RESET_MSG, ERROR_MSG, LOGOUT, REGISTER, CONTACT
} 
from '../type/users.type';
import axios from 'axios';

// let URL = 'http://localhost:3000';
let URL = 'https://pruebanestjs.herokuapp.com';

export const login = (user) => async (dispatch) => {
    dispatch({
        type: LOADING
    })
    try {
        const resp = await axios.post(`${URL}/auth/login`, user);
        console.log(resp.data.access_token)
        localStorage.setItem('token', resp.data.access_token);
        dispatch({
            type: LOGIN,
            payload: resp.data
        })
    } catch (error) {
        console.log('eror')
        dispatch({
            type: ERROR,
            payload: 'User not found'
        })
    }
}

export const register = (user) => async (dispatch) => {
    dispatch({
        type: LOADING,
    })

        axios.post(`${URL}/users/create`, user)
        .then(resp => {
            console.log(resp.data)
            dispatch({
                type: REGISTER,
                payload: 'User Created, login Now'
            })

        })
        .catch(e => {
            dispatch({
                type: ERROR,
                payload: e.response.data.message
            })
        })
}

export const getToken = () => async (dispatch) => {
    const mytoken = localStorage.getItem('token');
    if(mytoken)
    dispatch({
        type: TOKEN,
        payload: mytoken
    })
}

export const getProfile = () => async (dispatch) => {
    const mytoken = localStorage.getItem('token');
    try {
        dispatch({
            type: LOADING
        })
        let config = {
            headers: {
              'Authorization': 'Bearer ' + mytoken
            }
        }
        console.log('profile')
        const resp = await axios.get(`${URL}/users/profile`, config);
        console.log(resp)
        dispatch({
            type: GET_USER,
            payload: resp.data
        })
    } catch (error) {
        console.log(error)
        
    }
}

export const updateBalance = (amount, type) => async (dispatch) => {
    const mytoken = localStorage.getItem('token');
    try {
        dispatch({
            type: LOADING
        })
        let config = {
            headers: {
              'Authorization': 'Bearer ' + mytoken
            }
        }
        const resp = await axios.post(`${URL}/record/${type}`, {amount}, config);
        console.log(resp)
        dispatch({
            type: SET_BALANCE,
            payload: resp.data
        })
    } catch (error) {
        console.log(error)
        
    }
}

export const transferBalance = (data) => async (dispatch, getState) => {
    const mytoken = localStorage.getItem('token');
    try {
        console.log(getState())
        dispatch({
            type: LOADING
        })
        let config = {
            headers: {
              'Authorization': 'Bearer ' + mytoken
            }
        }
        console.log('pasa')
        const resp = await axios.post(`${URL}/record/transfer`, data, config);
        console.log(resp)
        console.log('aqui tambien')

        dispatch({
            type: ADD_BALANCE,
            payload: 'Funds Transferred'
        })
    } catch (error) {
        console.log('error.message')
        console.log(error.message)
        dispatch({
            type: ERROR,
            payload: 'User not Found'
        })
        
    }
}

export const resetMsg = () => async (dispatch) => {
    dispatch({
        type: RESET_MSG
    })
}

export const errorMsg = (msg) => async (dispatch) => {
    dispatch({
        type: ERROR_MSG,
        payload: msg
    })
}

export const logout = () => (dispatch) => {
    localStorage.removeItem('token')
    dispatch({
        type: LOGOUT
    })
}

export const ftContact = (user) => (dispatch) => {
    dispatch({
        type: LOADING
    })
    axios.post(`${URL}/mail/contact`, user)
        .then(resp => {
            console.log(resp.data)
            dispatch({
                type: CONTACT,
                payload: 'We send you an email'
            })

        })
        .catch(e => {
            dispatch({
                type: ERROR,
                payload: "Error try again"
            })
        })
}