import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../fetch/api'
import fetchJsonp from 'fetch-jsonp'
import Cookies from 'js-cookie'

Vue.use(Vuex)

const state = {
    slogan: '阅读点亮人生',
    userData: {},
    msgLength: 1,
    tabBtn: [],
    amapApiKey: '0522f462288e296eac959dbde42718ab',
    userPoint: ''
}

const getters = {
    userDataState: state => {
        return state.userData
    },
    MsgLengthState: state => {
        return state.msgLength
    },
    dryingListLengthState: state => {
        if (state.userData.dryingList) {
            return state.userData.dryingList.length
        }
    },
    userPraiseState: state => {
        let praise = []
        if (state.userData.dryingList) {
            state.userData.dryingList.forEach(element => {
                praise.push(element.social.praise.number)
            })
        }
        return praise
    },
    userPointState: state => {
        if (state.userPoint) {
            return state.userPoint
        } else {
            let data
            if (Cookies.get('userPoint')) {
                data = JSON.parse(Cookies.get('userPoint'))
            }
            return state.userPoint = data
        }
    },
    userTabBtn: state => {
        return state.tabBtn
    }
}

const mutations = {
    setUserData(state, params) {
        state.userData = params.data
    },
    setMsgLength(state, count) {
        state.msgLength = count
    },
    setTabBtn(state, params) {
        state.tabBtn = params.data
    },
    setUserPoint(state, params) {
        Cookies.set('userPoint', params.data, { expires: 1 })
        state.userPoint = params.data
    },
    getMsgs(state, msgs) {
        state.msgs = msgs;
    },
    getToken(state, token) {
        state.token = token;
    }
}

const actions = {
    getUserData(context) {
        axios.get('/book/memberUser/getInfo').then(res => {
            context.commit('setUserData', res.data)
        })
    },
    async getMsgLength(context) {
        const url = '/book/MemberMsg/getList?is_read=0';
        await axios.get(url).then((res) => {
            if (res.data.status === 1) {
                context.commit('setMsgLength', res.data.count);
            }
        });
    },
    async getMsgs(context, params = {}) {
        const url = '/book/MemberMsg/getList';
        return new Promise((resolve, reject)=>{
            axios.get(url, params).then((res) => {
                if (res.data.status === 1) {            
                    resolve(res.data);
                }
            });
        });
    },
    updateMsgLength(context, length) {
        context.commit('setMsgLength', length);
    },
    getTabBtn(context) {
        axios.get('/api/barBtn').then(res => {
            context.commit('setTabBtn', {
                data: res.data.barBtn
            })
        })
    },
    getUserLocation(context, products) {
        let cityInfo = {
            location: products.location
        }

        let data = {
            Key: context.state.amapApiKey,
            location: products.location,
        }

        let amapApiLink = `https://restapi.amap.com/v3/geocode/regeo?output=json&location=${data.location}&key=${data.Key}`

        fetchJsonp(amapApiLink).then(response => {
            return response.json()
        }).then(res => {
            cityInfo.city = res.regeocode.addressComponent.city

            context.commit('setUserPoint', {
                data: cityInfo
            })
        })
    },
    getSchoolList(context, products) {
        let data = {
            Key: context.state.amapApiKey,
            keywords: '教育',
            types: 141204,
            location: products.location,
            offset: 20,
            page: products.page,
            radius: 24000
        }

        let amapApiLink = `https://restapi.amap.com/v3/place/around?key=${data.Key}&location=${data.location}&radius=${data.radius}&keywords=${data.keywords}&types=${data.types}&offset=${data.offset}&page=${data.page}`

        return new Promise((resolve, reject) => {
            fetchJsonp(amapApiLink).then(response => {
                return response.json()
            }).then(res => {
                resolve(res)
            })
        })
    },
    getSearch(context, products) {
        let data = {
            Key: context.state.amapApiKey,
            keywords: products.keywords,
            type: products.type,
            location: products.location,
            city: products.city,
            citylimit: true,
            datatype: 'all'
        }

        let amamApiLink = `https://restapi.amap.com/v3/assistant/inputtips?key=${data.Key}&keywords=${data.keywords}&type=${data.type}&location=${data.location}&city=${data.city}&citylimit=${data.citylimit}&datatype=${data.datatype}`

        return new Promise((resolve, reject) => {
            fetchJsonp(amamApiLink).then(response => {
                return response.json()
            }).then(res => {
                resolve(res)
            })
        })
    },
    getCityDistrict(context, products) {
        let data = {
            Key: context.state.amapApiKey,
            keywords: products.city,
            subdistrict: 2,
            extensions: 'base'
        }

        let amamApiLink = `https://restapi.amap.com/v3/config/district?key=${data.Key}&keywords=${data.keywords}&subdistrict=${data.subdistrict}&extensions=${data.extensions}`

        return new Promise((resolve, reject) => {
            fetchJsonp(amamApiLink).then(response => {
                return response.json()
            }).then(res => {
                let cityInfo = {
                    city: res.districts[0].name,
                    location: res.districts[0].center
                }
                context.commit('setUserPoint', {
                    data: cityInfo
                })
                resolve(res)
            })
        })
    },
    getToken(context) {
        return new Promise((resolve) => {
            let token = localStorage.getItem('token');
            if(token) {
                context.commit('getToken', token);
                resolve(token);
            } else {
                const url = `/book/login/login`;
                axios.get(url).then((res) => {
                    token = res.data.token;
                    localStorage.setItem('token', token);
                    resolve(token);
                });
            }
        });    
        
    }
}

export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions
})
