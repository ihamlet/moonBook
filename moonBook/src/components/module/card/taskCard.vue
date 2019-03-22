<template>
    <div class="task-card">
        <van-cell class="card-cell" is-link title-class='tast-card-title' center size='large' value='查看'>
            <div class="task-cover" slot="icon">
                <!-- <img src="./../../../assets/img/task-cover.png" /> -->
            </div>
            <div class="tast-title" slot="title">
                <div class="name" v-line-clamp:20="1">亲子时光，阅读相伴。</div>
                <div class="complete">已完成</div>
            </div>
        </van-cell>
    </div>    
</template>
<script>
export default {
    name:'task-card',
    data () {
        return {
            
        }
    },
    methods: {
        
    }
}
</script>
<style scoped>
.task-card{
    background: #f2f2f2;
}

.task-cover{
    margin-right: .625rem /* 10/16 */;
}

.task-cover img{
    width: 3.125rem /* 50/16 */;
    height: 3.125rem /* 50/16 */;
    border-radius: .375rem /* 6/16 */;
}

.name,
.complete{
    font-size: .8125rem /* 13/16 */;
}

.name{
    font-weight: 500;
}

.complete{
    color: #909399;
}
</style>
<style>
.card-cell.van-cell{
    background: transparent
}

.tast-card-title.van-cell__title{
    flex: 5;
}
</style>
