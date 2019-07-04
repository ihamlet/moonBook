<template>
    <div class="item">
        <div class="school-name" v-line-clamp:20="1">
            {{item[searchType == 'wmSearchSchool'?'title':'name']}}
        </div>
        <div class="school-address" v-line-clamp:20="1">
            <span v-if="item[searchType == 'wmSearchSchool'?'addr':'address']">
                {{item[searchType == 'wmSearchSchool'?'addr':'address']}}
            </span>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
    name:'school-list',
    computed: {
      ...mapGetters(['userPointState'])
    },
    props: ['item','prompt','searchType']
}
</script>
<style scoped>
.search-nav-bar{
    padding: .3125rem /* 5/16 */;
    border-bottom: 1px solid #F2F6FC;
    background: #fff;
}

.search-close,
.search-btn{
    flex: 1;
    text-align: center;
}

.search-close{
    color: #909399;
}

.search-btn,
input.search-input{
    height: 2.25rem /* 36/16 */;
    line-height: 2.25rem /* 36/16 */;
}

input.search-input{
    flex: 5;
    background: #fff;
    border: none;
    border-radius: .375rem /* 6/16 */;
    padding-left: 1.25rem /* 20/16 */;
    padding-right: .3125rem /* 5/16 */;
    border: 1px solid #E4E7ED;
    margin-right: .3125rem /* 5/16 */;
}

.fixed{
    position: sticky;
    top: 0;
    z-index: 1001;
    width: 100%;
}
</style>
