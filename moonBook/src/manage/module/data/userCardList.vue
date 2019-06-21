<template>
    <div class="user-card-list">
        <van-tabs>
            <van-tab v-for="(item,index) in tab" :title="item.title" :key="index">
                
            </van-tab>
        </van-tabs>
    </div>    
</template>
<script>
export default {
    name:'userCardList',
    data () {
        return {
            tab:[{
                title:'老师'
            },{
                title:'学生'
            }]
        }
    },
    methods: {
        
    },
}
</script>
<style scoped>

</style>
