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
            if (text && text.indexOf('班') == -1) {
              return text + '班'
            } else {
              return text
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
                    name: e.school_name,
                    subname: e.duty,
                    school_id: e.school_id,
                    index: i,
                    className:'flex flex-align cell-actions'
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

const manageJurisdiction = {
    
}

export {
    manageStateList,
    manageSchoolList,
    watchScroll,
    getBanjiYear,
    watchTouch,
}