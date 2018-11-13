import axios from 'axios'

axios.defaults.timeout = 5000;
axios.interceptors.response.use(response=>{
    switch(response.data.resultCode) {
        case '401':
        case '402':
            console.log('need login');
            return Promise.reject('need login');
        default:
            return response;
    }
}, error=>{
    return Promise.reject(error.response);
})

export function fetch(url, params){
    return new Promise((resolve, reject)=>{
        axios.post(url, params).then(response=>{
            resolve(response.data);
        })
    }).catch(error=>{
        reject(error);
    });
};

export default {
    getUser(){
        return fetch('/book/member/getUser');
    },
    commonApi(url, params) {
        return fetch(url, params);
    }
}