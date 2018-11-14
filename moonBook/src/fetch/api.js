import axios from 'axios'
import Router from 'vue-router'

axios.defaults.timeout = 5000;
axios.interceptors.response.use(response=>{
    console.log('status', response.status);
    switch(response.status) {
        case 401:
        case 402:
            console.log('need login');
            location.href = '/login';
            return Promise.reject('need login');
        default:
            return response;
    }
}, (error, header, status)=>{
    console.log('x', error, header, status);
    return Promise.reject(error.response);
})

export default axios