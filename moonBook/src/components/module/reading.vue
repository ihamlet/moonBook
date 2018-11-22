<template>
    <div class="reading">
        <van-cell title="正在读的书" />
        <div class="book-list scroll-x">
            <div class="book-item scroll-item" v-for='(item,index) in readingList' :key="index">
                <div class="book-cover">
                    <img class="lazy" v-lazy="item.cover" :alt="item.name" />
                </div>
                <div class="book-name" v-line-clamp:20="2">
                    {{item.name}}
                </div>
                <div class="book-detail">
                    <div class="book-author" v-line-clamp:20="1">作者:{{item.author}}</div>
                    <div class="book-borrow">
                        <span>{{item.borrow}}</span>人借过
                    </div>
                    <div class="book-label">
                        <div class="label-item" v-for='(sortItem,sortIndex) in item.sort' :key="sortIndex">
                            {{sortItem}}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:'reading',
    props: ['readingList']
}
</script>
<style scoped>
.scroll-item{
    display: inline-grid
}

.book-list{
    padding-left: .625rem /* 10/16 */;
}

.book-cover{
    width: 9.375rem /* 150/16 */;
    height: 9.375rem /* 150/16 */;
}

.book-item{
    padding-right: .625rem /* 10/16 */;
}

.book-name{
    color: #303133;
    height: 2.5rem /* 40/16 */;
    margin: .3125rem /* 5/16 */ 0
}

.book-label{
    height: 4.0625rem /* 65/16 */;
}

.book-label .label-item{
    font-size: .75rem /* 12/16 */;
    border: .0625rem /* 1/16 */ solid #DCDFE6;
    padding: .125rem /* 2/16 */ .3125rem /* 5/16 */;
    margin-right: .3125rem /* 5/16 */;
    margin-top: .3125rem /* 5/16 */;
    float: left;
    border-radius: .25rem /* 4/16 */;
}

.book-borrow span{
    color: #F56C6C;
}

.book-detail{
    display: grid;
    font-size: .8125rem /* 13/16 */;
}

.book-borrow{
    margin: .125rem /* 2/16 */ 0;
}
</style>
