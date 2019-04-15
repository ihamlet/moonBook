/*
2018年12月10日08:08:01
直接使用cookies
*/

import axios from 'axios-extra'
import router from '@/router/index'
import Cookies from 'js-cookie'

// axios.defaults.timeout = 5000
axios.defaults.maxConcurrent = 1
axios.defaults.queueOptions = {
    retry: 3,
    retryIsJump: true
}

axios.interceptors.request.use(
    config => {
        let token = Cookies.get('WWW_TOKEN')
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
