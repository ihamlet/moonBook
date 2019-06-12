const manageStateList = {
    computed: {
        actions() {
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
                        banji_id: element.banji_id || 0
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

                console.log(this.$refs)

                this.domHeight = domHeight
            })
        }
    }
}



export {
    manageStateList,
    watchScroll
}