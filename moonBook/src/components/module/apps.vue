<template>
    <div class="apps">
        <div class="app-list flex">
            <div class="app-item" v-for='item in appsList'>
                <img class="lazy app-icon" v-lazy="item.icon" :alt="item.name">
                <div class="app-name">{{item.name}}</div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:'apps',
    props: ['appsList'],
    data () {
        return {
            
        }
    }    
}
</script>
<style scoped>
.app-item{
    flex: 1;
}

.app-icon{
    width: 2.625rem /* 42/16 */;
    margin: .3125rem /* 5/16 */ auto;
    display: block;
}

.app-list{
    padding: .625rem /* 10/16 */;
}

.app-name{
    font-size: .8125rem /* 13/16 */;
    text-align: center;
    color: #303133;
}
</style>
