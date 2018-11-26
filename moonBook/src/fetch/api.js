import axios from 'axios'
import router from '@/router/index'

axios.defaults.timeout = 5000;

// http request 拦截器
axios.interceptors.request.use(
    config => {
        let token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `token ${token}`
      }
      return config
    },
    err => {
      return Promise.reject(err)
    },
  )


axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        switch (error.response.status) {
            case 401:
            case 402:
                console.log('current route path', router.currentRoute.path);
                router.currentRoute.path !== '/login' && router.replace({
                    path: '/login',
                    query: {redirect: router.currentRoute.fullPath}
                });
                return Promise.reject('need login');
        }
        return Promise.reject(error.response);
    });

export default axios