<template>
    <div class="class-item">
        <van-cell is-link size='large' @click="selectBanji">
            <div class="item-cell flex flex-align">
                <div class="title flex flex-align">
                <div class="banji-name">{{formatBanjiTitle(item.title)}} </div>   
                    <div class="grade-name">{{item.grade_name}}</div> 
                </div>
                <div class="head-name" v-if='item.head_name'>
                    {{item.head_name}}
                </div>
                <div class="nofound-head" v-else>
                    尚无班级群主
                </div>
            </div>
        </van-cell>
    </div>    
</template>
<script>
import axios from './../../../components/lib/js/api'


export default {
    name:'class-list',
    props:{
        item:{
            type:Object,
            default(){
                return {
                    title: '一班',
                    banji_id: 0,
                    year: '2018',
                    grade_name:'大班'
                }
            }
        }
    },
    data() {
        return {

        }
    },
    methods: {
        formatBanjiTitle(text){
            if (text && text.indexOf('班') == -1) {
                return text + '班'
            } else {
                return text
            }
        },
        selectBanji(){

            let toast = this.$toast.loading({
                forbidClick: true,
                message: '正在换班中...'
            })


            let data = {
                params:{
                    id: this.$route.query.id.split(','),
                    banji_id: this.item.banji_id,
                    from_banji_id: this.$route.query.banji_id,
                    to_banji_id: this.item.banji_id
                }
            }

            axios.get(`/SchoolManage/students/${this.$route.query.set}`, data).then(res=>{
                toast.clear()

                this.$toast(res.data.msg)                        
                this.$router.replace({
                    name:'banjiTree',
                    query:{
                        school_id: this.$route.query.school_id,
                        year: this.$route.query.year,
                        activeId: this.$route.query.activeId
                    }
                })
            })
        }
    }
}
</script>
<style scoped>
.item-cell{
    justify-content: space-between;
}

.grade-name{
    font-size: 13px;
    color: #909399;
    margin-left: 10px;
}

.nofound-head{
    color: #C0C4CC;
}
</style>
