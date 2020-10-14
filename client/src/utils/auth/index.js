import React, { useEffect, useReducer, useContext, createContext } from 'react';
import * as AuthLogic from './authLogic';
import { ERROR, LOGIN_SUCCESS, LOGOUT, PENDING } from './actions';

export * from './authLogic';

const initalAuthState = {
    isLoggedIn: false,
    user: null,
    isPending: false,
    error: ""
};

const defaultAuthValue = {
    ...initalAuthState,
    login: () => {},
    logout: () => {},
    signup: () => {}
}

const AuthContext = createContext(defaultAuthValue);

const authReducer = (state, action) => {
    switch(action.type) {
        case ERROR:
            return {
                ...state,
                error: action.error,
                isPending: false,
            };
        case PENDING:
            return {
                ...state,
                isPending: true,
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                user: action.user,
                error: "",
                isPending: false
            };
        case LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                isPending: false,
                user: null
            };
        default:
            throw new Error(`Invalid Action: ${action.type}`)
    };
};

export const AuthProvider = props => {
    const [state, dispatch] = useReducer(authReducer, initalAuthState);

    const logout = () => {
        AuthLogic.logout();
        dispatch({ type: LOGOUT });
    };

    const initAuth = () => {
        if (AuthLogic.isLoggedIn()) {
            dispatch({ type: PENDING });
            return AuthLogic.user()
                            .then(user => dispatch({ type: LOGIN_SUCCESS, user }))
                            .catch(err => (console.error(err), logout()));
        };
    };

    useEffect(initAuth, []);

    const login = data => {
        dispatch({ type: PENDING });
        return AuthLogic.login(data)
                        .then(() => AuthLogic.user())
                        .then(user => dispatch({ type: LOGIN_SUCCESS, user }))
                        .catch(err => (dispatch({ type: ERROR, error: "Invalid email or password. Try again!"}), console.error(err)));
    };

    const signup = data => {
        dispatch({ type: PENDING });
        AuthLogic.signup(data)
                 .then(() => login(data))
                 .catch(err => (console.error(err), dispatch({ type: ERROR, error: "Invalid email or password or account already exists. Try again!"})))
    };
    
    const value = {
        ...state,
        login,
        logout,
        signup
    };

    return <AuthContext.Provider value={value} {...props} />;
};

export const useAuth = () => {
    return useContext(AuthContext);
}
