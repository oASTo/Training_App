
import config from 'config';
import { authHeader } from '../_helpers/auth-header';

export const userService ={
    login,
    logout,
    register,
    getAll,
    getById
};

function login(username, password){
    const requestOptions ={
        method:'POST',
        headers : { 'Content-Type': 'application/json' },
        body: JSON.stringify ({username, password })
    };

    return fetch(`/users/authenticate`, requestOptions)
        .then(handleResponse)
        .then(user =>{
            //store user detail and jwt token in local storage to keep user logged in between page refreshes
            
            localStorage.setItem('user', JSON.stringify(user));

            return user;
        });
}

function logout(){
    //remove user from local storage to logout
    localStorage.removeItem('user');

}
function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/users`, requestOptions).then(handleResponse);
}

function register(user){
    const requestOptions = {
        method:'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(`/users/register`, requestOptions).then(handleResponse);

}

function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(handleResponse);
}

function handleResponse(response){
    return response.text().then(text=>
        {
            const data = text && JSON.parse(text);
            if(!response.ok){
                if(response.status === 401){
                    //auto logout if 401 response returned from api

                    logout();
                    window.location.reload(true);
                }

                const error = (data && data.message) || response.statusText;
                return Promise.reject(error);
            }

            return data;
        });
}


