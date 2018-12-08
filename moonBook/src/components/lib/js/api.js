/*
2018年12月8日08:32:06
引入vuex 获取到getters的token
*/

import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '@/router/index'
import store from './../../../store/index'

Vue.use(Vuex)

axios.defaults.timeout = 5000

axios.interceptors.request.use(
    config => {
        let token = store.getters.userToken
        if (token) {
            config.headers.Authorization = `token ${token}`
        }
        return config
    },
    err => {
        return Promise.reject(err)
    }
)


// http request 拦截器
axios.interceptors.response.use(
    response => {
        return response
    },
    error => {
        switch (error.response.status) {
            case 401:
            case 402:
                console.log('current route path', router.currentRoute.path)
                router.currentRoute.path !== '/login' && router.replace({
                    path: '/login',
                    query: {redirect: router.currentRoute.fullPath}
                })
                return Promise.reject('need login')
        }
        return Promise.reject(error.response)
    }
)

export default axios
