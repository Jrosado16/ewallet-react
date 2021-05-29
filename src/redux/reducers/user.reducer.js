import { 
    LOADING, ERROR, LOGIN, TOKEN, GET_USER, SET_BALANCE, 
    ADD_BALANCE, RESET_MSG, ERROR_MSG, LOGOUT, REGISTER, CONTACT, RECORD
} from '../type/users.type';
const initialState = {
    users: {},
    loading: false,
    userError: '',
    message: '',
    record: []
}
const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN: 
            return {...state, users: action.payload, loading: false, }

        case REGISTER:
        case CONTACT:
            return { ...state, loading: false, userError: '', message: action.payload}

        case LOADING: 
            return { ...state, loading: true,}

        case ERROR: 
        case ERROR_MSG:
            return { ...state, loading: false, message: '', userError: action.payload }

        case TOKEN:
            return { ...state, users: {...state.users, access_token: action.payload}}

        case GET_USER:
        case SET_BALANCE:
            return { ...state, users: {...state.users, profile: action.payload}, loading: false}

        case ADD_BALANCE: 
            return { ...state, loading: false, userError: false, message: action.payload }

        case RESET_MSG: 
            return { ...state, loading: false, userError: '', message: ''}

        case RESET_MSG: 
            return { ...state, loading: false, userError: '', message: action.payload}

        case RECORD: 
            return { ...state, record: action.payload, loading: false}
        case LOGOUT: 
            return { ...initialState}
        default: 
            return state

    }
}

export default userReducer;