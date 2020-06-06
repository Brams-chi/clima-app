import config from 'config';
import { authHeader } from '../_helpers';
import axios from 'axios';
export const userService = {
    login,
    logout,
    register,
    getAll,
    getById,
    update,
    delete: _delete
};

function login(username, password) {

    var apiBaseUrl = "http://localhost/apiWhatwegonnaeat/public/api/getCredentials";
    var payload={
        "email":username,
        "pass":password,
    };
    return (
        axios.post(apiBaseUrl, payload)
            .then((response) =>{
                console.log(response);
                if(response.data.length > 0){
                    /* //  console.log("registration successfull");
                     var loginscreen=[];
                     loginscreen.push(<Login parentContext={this}/>);
                     var loginmessage = "Not Registered yet.Go to registration";
                     self.props.parentContext.setState({loginscreen:loginscreen,
                         loginmessage:loginmessage,
                         buttonLabel:"Registrar",
                         isLogin:true
                     });*/
                }
            })
            .catch( (error) => {
                console.log(error);
            })
    );
   /* return fetch(``, requestOptions)
        .then(handleResponse)
        .then(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('user', JSON.stringify(user));

            return user;
        });*/
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`http://localhost/apiWhatwegonnaeat/public/api/user/admin/showAll`, requestOptions).then(handleResponse);
}

function getById(id) {
    const requestOptions = {
        method: 'GET',
    };
    return fetch(`http://localhost/apiWhatwegonnaeat/public/api/user/admin/show/${id}`, requestOptions).then(handleResponse);
}
function register(user) {
    var apiBaseUrl = "http://localhost/apiWhatwegonnaeat/public/api/user/admin/store";
    //To be done:check for empty values before hitting submit
    var self = this;
    var payload={
        "firstName": user.firstName,
        "lastName":user.lastName,
        "mail":user.mail,
        "password":user.password,
    };
    return (
        axios.post(apiBaseUrl, payload)
            .then((response) =>{
                console.log(response);
                if(response.data.length > 0){
                    /* //  console.log("registration successfull");
                     var loginscreen=[];
                     loginscreen.push(<Login parentContext={this}/>);
                     var loginmessage = "Not Registered yet.Go to registration";
                     self.props.parentContext.setState({loginscreen:loginscreen,
                         loginmessage:loginmessage,
                         buttonLabel:"Registrar",
                         isLogin:true
                     });*/
                }
            })
            .catch( (error) => {
                console.log(error);
            })
        );
    /*{
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };
            "firstName": user.firstName,
            "lastName":user.lastName,
            "mail":user.mail,
            "password":user.password,

    return fetch(`http://localhost/apiWhatwegonnaeat/public/api/user/store`, requestOptions).then(handleResponse);
 }*/
}

function update(user) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(`${config.apiUrl}/users/${user.id}`, requestOptions).then(handleResponse);;
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}
