import decode from 'jwt-decode';
import fileSaver from 'file-saver';
import axios from 'axios';
export default class AuthService {
    // Initializing important variables
    constructor(domain) {
        // const url = 'http://172.19.5.55:8080/auth/login';
        // this.domain = domain || 'http://172.19.5.55:8080/auth/login'
        this.enviornment = process.env.NODE_ENV;
        if (this.enviornment === 'development') {
            this.domain = 'http://172.19.5.55:8080'; // API server domain
        } else if (this.enviornment === 'production') {
            this.domain = 'http://172.19.5.55:8080';
        }

        this.fetch = this.fetch.bind(this) // React binding stuff
        this.login = this.login.bind(this)
        this.getProfile = this.getProfile.bind(this)
        // this.token = localStorage.getItem('id_token');
        this.token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0YWRtaW4iLCJzY29wZXMiOlsiUk9MRV9SVUJJWEFETUlOIl0sImlzcyI6IlJ1Yml4IiwiaWF0IjoxNTM2NTg0MzE2LCJleHAiOjE1MzY1ODUyMTZ9.Voz3QKl6n4Pvyz8gY287F4Iv58kuDPUkfSqxofZWVCReaZ22NO9O_AG3TDHokeHuN_WHRlLCdp6vNUtJcG8XhQ"
    }
    uploadExcel(file, id) {
        let serviceUrl;
        if (this.token) {
            const formData = new FormData();
            formData.append('file', file);
            var httpHeaders = {
                'Content-Type': 'multipart/form-data',
                'Accept': 'application/json',
                'Authorization': `bearer ${this.token}`
            }
            if(id) {
                serviceUrl = this.domain + '/riskfactor/edit/' + id;
            } else {
                serviceUrl = this.domain + '/riskfactor/add';
            }
           return axios({
                method: 'post',
                url: serviceUrl,
                data: formData,
                headers: httpHeaders
            });

        }
    }
    downloadExcel(type) {
        let serviceUrl;
        console.log(type);
        if (this.token) {
            var httpHeaders = {
                'Content-Type': 'application/octet-stream',
                'Accept': 'application/json',
                'Authorization': `bearer ${this.token}`
            }
            if (type) {
                serviceUrl = this.domain + '/riskfactor/download/' + type;
            } else {
                serviceUrl = this.domain + '/riskfactor/download/template';
            }
            console.log(serviceUrl);
            axios({
                method: 'get',
                url: serviceUrl,
                responseType: 'arraybuffer',
                headers: httpHeaders
            }).then((response) => {
                var blob = new Blob([response.data], { type: 'application/octet-stream' });
                fileSaver.saveAs(blob, '_template.xlsx');
            })

        }
    }
    viewRiskDetails(id) {
        const httpHeaders = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json',
            'Authorization': `Bearer ${this.token}`
        };
        if (this.token) {
            /* return this.fetch(`${this.domain}/riskfactor/fetch/${id}`, {
                method: 'GET',
                // Authorization: `Bearer ${this.token}`,
                headers: new Headers(httpHeaders)
            }); */
            return axios({
                method: 'get',
                url: `${this.domain}/riskfactor/fetch/${id}`,
                headers: httpHeaders
            })
        }
    }
    getSearchResult(search, type) {
        console.log(search);
        const httpHeaders = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json',
            'Authorization': `Bearer ${this.token}`
        };
        //   172.19.5.55:8080/riskfactor/autocomplete/{type}/{searchtext}
        if (this.token) {
            return axios({
                method: 'get',
                url: `${this.domain}/riskfactor/autocomplete/${type}/${search}`,
                headers: httpHeaders
            })

            /* this.fetch(`${this.domain}/riskfactor/autocomplete/${type}/${search}`, {
                method: 'GET',
                // Authorization: `Bearer ${this.token}`,
                headers: new Headers(httpHeaders)
            }); */
        }

    }
    getViewList(type) {
        const httpHeaders = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json',
            'Authorization': `Bearer ${this.token}`
        };
        return axios({
            method: 'get',
            url: `${this.domain}/list/${type}`,
            headers: httpHeaders
        })
        /* return this.fetch(`${this.domain}/list/${type}`, {
            method: 'GET',
            headers: new Headers(httpHeaders)
        }) */
    }
    login(username, password) {
        // Get a token from api server using the fetch api
        const body = {
            username,
            password
        };
        /* return this.fetch(`${this.domain}/auth/login`, {
            method: 'POST',
            
        }) */
        return axios({
            method: 'post',
            url:'http://52.14.57.208:8080/auth/login',
            data: body
        });
    }

    loggedIn() {
        // Checks if there is a saved token and it's still valid
        const token = this.getToken() // GEtting token from localstorage
        return !!token && !this.isTokenExpired(token) // handwaiving here
    }

    isTokenExpired(token) {
        try {
            const decoded = decode(token);
            if (decoded.exp < Date.now() / 1000) { // Checking if token is expired. N
                return true;
            }
            else
                return false;
        }
        catch (err) {
            return false;
        }
    }

    setToken(idToken, refreshToken) {
        // Saves user token to localStorage
        localStorage.setItem('id_token', idToken);
        localStorage.setItem('refreshToken', refreshToken);
    }

    getToken() {
        // Retrieves the user token from localStorage
        return localStorage.getItem('id_token')
    }

    logout() {
        // Clear user token and profile data from localStorage
        localStorage.removeItem('id_token');
        localStorage.removeItem('refreshToken');
    }

    getProfile() {
        // Using jwt-decode npm package to decode the token
        return decode(this.getToken());
    }


    fetch(url, options) {
        // performs api calls sending the required authentication headers
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.token}`
        }
        // console.log(headers);
        // headers['Authorization'] = "Bearer  eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0YWRtaW4iLCJzY29wZXMiOlsiUk9MRV9SVUJJWEFETUlOIl0sImlzcyI6IlJ1Yml4IiwiaWF0IjoxNTM2MjE5Njc1LCJleHAiOjE1MzYyMjA1NzV9.U4zFdixkkjvd5-UifHTar9dMzAMv302FNSmfJGxSl174nbtkhF0NftYtSa796Vd3baTBUEJTOfylrzwz6eWWOg";
        // Setting Authorization header
        // Authorization: Bearer xxxxxxx.xxxxxxxx.xxxxxx
        /* if (this.loggedIn()) {
            headers['Authorization'] = 'Bearer ' + this.getToken()
        } */

        return fetch(url, {
            headers,
            ...options
        })
            .then(this._checkStatus)
            .then(response => { response.json() })
    }
    _checkStatus(response) {
        // raises an error in case response status is not a success
        if (response.status >= 200 && response.status < 300) { // Success status lies between 200 to 300
            return response
        } else {
            var error = new Error(response.statusText)
            error.response = response
            throw error
        }
    }
}