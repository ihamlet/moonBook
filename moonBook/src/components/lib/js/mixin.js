import { mapState,mapGetters,mapMutations } from 'vuex'
import wx from 'weixin-js-sdk'
import axios from './api'

const manageStateList = {
    data () {
        return {
            hackReset: true     
        }
    },
    computed: {
        manageActions() {
            let array = []
            if (this.managerState) {
                this.managerState.forEach(element => {
                    let data = {
                        name: `${element.item_type == 'school' ? element.name : this.formatBanjiTitle(element.name)}${element.child_name ? `(${element.child_name})` : ''}`,
                        subname: `${element.duty}-${element.desc}`,
                        id: element.id,
                        type: element.item_type,
                        school_id: element.school_id,
                        school_name: element.school_name,
                        banji_name: this.formatBanjiTitle(element.name),
                        banji_id: element.banji_id || 0,
                        className:'flex flex-align cell-actions'
                    }
                    array.push(data)
                })
            }
        
            if(this.$route.name == 'apps-school'){
                array.push({
                    name:'学校列表',
                    type:'toSchoolList'
                })
            }
        
            return array
        }
    },
    methods: {
        formatBanjiTitle(text) {
            if(text){
                if (text.indexOf('班') == -1) {
                    return text + '班'
                    } else {
                        let arr = text.split('')
                        let newArr = [...new Set(arr)]
                        return newArr.join('')
                    }
            }
        },
        onRecommendSelect(item) {
            let data = {
              params: {
                post_id: this.postId
              }
            }
      
            if (item.type == 'banji') {
              data.params.banji_id = item.id
            }
      
            if (item.type == 'school') {
              data.params.school_id = item.id
            }
      
            axios.get('/book/SchoolArticle/copy', data).then(res => {
              switch(res.data.status){
                case 1:
                  this.$toast.success('推荐成功')
                  break
                default:
                  this.$toast(res.data.msg)
              }
            })
      
            this.actionsheetShow = false
        },
        refreshPage(){
            this.hackReset = false
            this.$nextTick(() => {
              this.hackReset = true
              this.request()
          })
        }
    }
}

const manageSchoolList = {
    computed:{
        schoolActions(){
            let arr = []
            
            this.schoolList.map((e,i)=>{
                let obj = {
                    ...e,
                    name: e.school_name,
                    subname: e.duty,
                    index: i,
                    className:'flex flex-align cell-actions',
                }
        
                arr.push(obj)
            })
    
            return arr
        }
    }
}

const watchScroll = {
    data () {
        return {
            themeBarSearch:false,
            fixedHeaderBar: true,
            scrollTop:0,
            domHeight:0      
        }
    },
    created () {
      this.getDomHeight()  
    },
    destroyed() {
        window.removeEventListener('scroll', this.handleScroll)
    },
    mounted () {
        window.addEventListener('scroll', this.handleScroll)   
    },
    methods: {
        handleScroll(){
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
            this.scrollTop = scrollTop
            if(this.scrollTop > this.domHeight){
                this.themeBarSearch = true
                this.fixedHeaderBar = false
                this.$emit('onScrollDomShow',true)
            }else{
                this.themeBarSearch = false
                this.fixedHeaderBar = true
                this.$emit('onScrollDomShow',false)
            }
        },
        getDomHeight(){
            this.$nextTick(()=>{
                let domHeight = this.$refs.domHeight?this.$refs.domHeight.offsetHeight :  0
                this.domHeight = domHeight
            })
        }
    }
}

const getBanjiYear = {
    computed: {
        classYear(){
            let date = new Date()
            let month = date.getMonth() + 1
            let year = date.getFullYear() 
            let time
        
            if(month < 9){
                time = year -1
            }else{
                time = year
            }
        
            return time
        }   
    }
}

const newBanjiTitle = {
    methods:{
        formatBanjiTitle(text) {
            if(text){
                if (text.indexOf('班') == -1) {
                    return text + '班'
                    } else {
                        let arr = text.split('')
                        let newArr = [...new Set(arr)]
                        return newArr.join('')
                    }
            }
        }
    }
}

const watchTouch = {
    data() {
        return {
            top2bottom: false,
            moveEndX:0,
            moveEndY:0,
            startX:0,
            startY:0
        }
    },
    destroyed() {
        window.removeEventListener('touchstart', this.handleTouchstart)
        window.removeEventListener('touchmove', this.handleTouchmove)
    },
    mounted () {
        window.addEventListener('touchstart', this.handleTouchstart,{ passive: false })
        window.addEventListener('touchmove', this.handleTouchmove,{ passive: false })   
    },
    methods:{
        handleTouchstart(e){
    　　　　this.startX = e.changedTouches[0].pageX
    　　　　this.startY = e.changedTouches[0].pageY
        },
        handleTouchmove(e){ 
            this.moveEndX = e.changedTouches[0].pageX
            this.moveEndY = e.changedTouches[0].pageY
            let X = this.moveEndX - this.startX
            let Y = this.moveEndY - this.startY

    　　　　if ( Y > 0) {
        　　　this.top2bottom = true
    　　　　} else{
        　　　this.top2bottom = false
    　　　　}
        }
    }
}

const selection = {
    data() {
        return {
            selectChilds:[]
        }
    },
    methods: {
        selectSwitch(operating,item){
            if(operating){
              this.selectChilds.push(item)
            }else{
              this.selectChilds.splice(this.selectChilds.length-1, 1)
            }
          }
    }
}

const echartOption = {
    data() {
        return {
            memberTypeChart:null,
            dueTypeChart:null,
            memberTypeOption:{
                tooltip : {
                    trigger: 'item',
                    formatter: "{b} : {d}%"
                },
                calculable : true,
                series : [
                    {
                        name:'会员类型',
                        type:'pie',
                        radius : '55%',
                        center: ['50%', '60%'],
                        data:[
                            {value:30, name:'免费会员'},
                            {value:1010, name:'普通会员'},
                            {value:110, name:'老师年费优惠卡'},
                            {value:80, name:'砖石会员'},
                            {value:40, name:'黄金会员'}
                        ],
                        itemStyle:{
                            emphasis: {
                              shadowBlur: 20,
                              shadowOffsetX: 0,
                              shadowColor: 'rgba(0, 0, 0, .1)'
                            },
                            normal:{
                                color(params){
                                    const colorList = [          
                                        '#9E9E9E', '#607D8B', '#8BC34A', '#03A9F4', '#FF9800',
                                    ]
                                    return colorList[params.dataIndex]
                                }
                            }
                        }
                    }
                ]
            },
            dueTypeOption:{
                tooltip : {
                    trigger: 'item',
                    formatter: "{b} : {d}%"
                },
                calculable : true,
                series : [
                    {
                        name:'会员类型',
                        type:'pie',
                        radius : '55%',
                        center: ['50%', '60%'],
                        data:[
                            {value:90, name:'其它'},
                            {value:180, name:'免费'},
                            {value:20, name:'半年卡'},
                            {value:260, name:'季费'},
                            {value:420, name:'年费'},
                            {value:750, name:'月费'}
                        ],
                        itemStyle:{
                            emphasis: {
                              shadowBlur: 20,
                              shadowOffsetX: 0,
                              shadowColor: 'rgba(0, 0, 0, .1)'
                            },
                            normal:{
                                color(params){
                                    const colorList = [          
                                        '#9E9E9E', '#607D8B', '#8BC34A', '#03A9F4', '#FF9800','#FF5722'
                                    ]
                                    return colorList[params.dataIndex]
                                }
                            }
                        }
                    }
                ]
            },
        }
    },
    beforeDestroy () {
        this.clear()
    },
    methods:{
        clear(){
            this.memberTypeChart.clear()
            this.dueTypeChart.clear()
        }
    }
}


const verification = {
    computed:{
        ...mapState('manage',['authorizationList'])
    },
    methods:{
        verification(name){               
            let arr=[]

            this.authorizationList.forEach(e=>{
                arr.push(e.name)
            })

            return arr.includes(name)
        },
        getDomDvt(name){
            let obj

            this.authorizationList.map(e=>{
                if(e.name == name){
                    obj = e.auth_params.role_id
                }
            })

            return obj
        }
    }
}

const punch = {
    computed: {
        ...mapGetters(['userDataState'])
    },
    methods:{
        ...mapMutations('openWX',['setReadSign']),
        punch() {
            const self = this

            wx.ready(()=>{
                wx.scanQRCode({
                needResult: 1,
                scanType: ['barcode'],
                    success(res){
                        let data = {
                            child_id: self.userDataState.child_id,
                            isbn: res.resultStr
                        }
        
                        return axios.post('/book/member/read_sign', data).then(res =>{
                            self.setReadSign({data:res})
                            switch(res.data.status){
                                case 1:
                                    let data = {
                                        id: self.$route.query.id,
                                        child_id: self.userDataState.child_id,
                                        back: self.$route.name,
                                        cate_id: 133,
                                        tags:'阅读打卡'
                                    }
                        
                                    if(self.$route.name == 'class-home'){
                                        data.punchType = 'banji'
                                    }

                                    self.$router.push({
                                        name:'punch-back',
                                        query:{
                                            ...data,
                                            ...res.data.data.stat_data
                                        }
                                    })
                                break
                                default:
                                self.$toast(res.data.msg)
                            }
                        })
                    },
                    complete(e) {
                        if (e.errMsg == 'scanQRCode:permission denied') {
                            location.reload()
                        }
                    }
                })
            })
        }
    }
}

export {
    manageStateList,
    manageSchoolList,
    watchScroll,
    getBanjiYear,
    watchTouch,
    selection,
    newBanjiTitle,
    echartOption,
    verification,
    punch
}