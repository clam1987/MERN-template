import axios from 'axios';
import decode from 'jwt-decode';

const token = {
    get: () => JSON.parse(localStorage.getItem("token")),
    set: (token) => localStorage.setItem("token", JSON.stringify(token)),
    delete: () => localStorage.removeItem("token"),
    payload: () => {
        try {
            return decode(token.get())
        } catch (err) {
            console.error(err)
            return null
        }
    }
};

export const addAuthHeader = config => {
    const bearerToken = token.get();
    if (bearerToken) {
      config.headers.Authorization = `Bearer ${bearerToken}`;
    }
    return config;
  };

export const signup = data => axios.post("/api/users/signup", {
    username: data.username1,
    password: data.password1,
    email: data.email,
    firstName: data.firstName,
    lastName: data.lastName
});

export const login = data => axios.post("/api/users/login", data).then(res => {
    token.set(res.data.token)
    return token.payload();
});

export const logout = () => {
    axios.get("/api/users/logout")
    token.delete();
}
                                //  .then(() => token.delete());

export const isLoggedIn = () => {
    if(!token.get()) {
        return false;
    }
    const isNotExpired = token.payload().exp > Date.now() / 1000;
    return isNotExpired;
};

export const user = () => {
    if (isLoggedIn()) {
      const { id } = token.payload();
      return axios.get(`/api/users/${id}`)
        .then(res => res.data);
    }
    return Promise.resolve(null);
  };
  
  export const fetchUserData = () => user();