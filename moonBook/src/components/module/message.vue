<template>
    <div class="message">
        <van-tabs color='#409eff' :line-width='20' sticky @click="onTabClick">
            <van-tab v-for="(list,index) in tab" :key="index" :disabled="index==1&&tabDisabled">
                <div class="tab-title" slot="title">
                    {{list.title}}
                    <div class="unread badge" v-if="index==0">
                        {{list.count}}
                    </div>
                </div>

                <van-list v-model='loading' :finished='finished' @load="fetchData(tab[currentTabIdx])" class="list">
                    <div class="item" v-for='(item,itemIndex) in list.content' :key="itemIndex">
                        <van-swipe-cell :right-width="index==0?150:0">
                            <van-cell-group>
                                <van-cell>
                                    <div class="flex flex-align" @click="onItemClick(item)">
                                        <div class="icon" :class="[item.type=='bookshelf'?'moon-book':'system']">
                                            <i class="iconfont moon-book" v-if="item.type=='bookshelf'">&#xe605;</i>
                                            <i class="iconfont system" v-else>&#xe600;</i>
                                        </div>
                                        <div class="msg-content">
                                            <div class="type">
                                                <div class="name">{{item.type=='bookshelf'?'阅亮书架':'系统消息'}}</div>
                                                <div class="date">
                                                    <span>{{item.create_date}}</span>
                                                </div>
                                            </div>
                                            <div class="text" v-line-clamp:20="1">
                                                <div>{{item.title}}</div>
                                                {{item.details}}
                                            </div>
                                        </div>
                                    </div>
                                </van-cell>
                            </van-cell-group>
                            <div slot="right" class="slot flex" :style="{width:150+'px'}">
                                <span class="add-read" @click="addRead(item)">标记已读</span>
                                <span class="topping" @click="topping(item)">置顶</span>
                            </div>
                        </van-swipe-cell>
                    </div>
                </van-list>
            </van-tab>
        </van-tabs>
        <slogan/>
    </div>
</template>
<script>
import { mapActions } from 'vuex'
import slogan from './../module/slogan'
import axios from '@/fetch/api'

export default {
    name:'message',
    props: ['readList'],
    components: {
        slogan
    },
    data () {
        return {
            loading: false,
            finished: false,
            tabDisabled:true,
            currentTabIdx: 0,
            tab:[{
                title:'未读消息',
                params:{
                    page:1,
                    limit:10,
                    is_read:0,
                    sort: 'top'
                },
                content: []
            },{
                title:'已读消息',
                params:{
                    page: 1,
                    limit: 10,
                    is_read: 1
                },
                content: []
            }]
        }
    },
    created () {
        this.fetchData(this.tab[0]).then(this.fetchData(this.tab[1]));
    },
    watch: {
        tab:{
            handler(val){
                if( val[1].content.length > 0 ){
                    this.tabDisabled = false
                }
            },
            deep:true
        },
        '$router':'fetchData'
    },
    methods: {
        fetchData(tab){
            const url = '/book/memberMsg/getList';
            const params = {params:tab.params};
            let $this = this;
            return axios.get(url, params).then((res) => {
                if(res.data.status === 1) {
                    if(tab.params.page === 1) {
                        tab.content = res.data.data;
                        tab.count = res.data.count;
                    } else {
                        tab.content = tab.content.concat(res.data.data);
                    }       
                    $this.loading = false;           
                    if(res.data.data.length == tab.params.limit)  {
                        $this.finished = false;
                        tab.params.page ++;
                    } else {
                        $this.finished = true;
                    }                    
                }                             
            });
        },
        addRead(item){
            const url = '/book/MemberMsg/addRead';
            const params = {
                params: {
                    id:item.msg_id
                }
            };
            let toast = this.$toast.loading({
                forbidClick: true,
                loadingType: 'spinner'
            });
            let $this = this;
            axios.get(url, params).then(res=>{
                toast.clear();
                if(res.data.status === 1) {
                    let content = $this.tab[0].content;
                    let idx = content.indexOf(item);                
                    if(idx !== -1) content.splice(idx, 1);
                    $this.tab[0].count > 1 && $this.tab[0].count--;
                } else {
                    $this.$toast(res.data.msg);
                }                
            })
        },
        topping(item){
            const url = '/book/MemberMsg/topping';
            const params = {
                params: {
                    id: item.msg_id
                }                
            };
            console.log('params', params);
            let toast = this.$toast.loading({
                forbidClick: true,
                loadingType: 'spinner'
            });
            let $this = this;
            axios.get(url, params).then(res=>{                
                toast.clear();
                if(res.data.status === 1) {
                    $this.tab[0].params.page = 1;
                    $this.fetchData($this.tab[0]);
                } else {
                    $this.$toast(res.data.msg);
                }
            })
        },
        onItemClick(item){
            location.href = '/book/MemberMsg/detail?id=' + item.msg_id;
        },
        onTabClick(idx){
            this.currentTabIdx = idx;
        }
    }
}
</script>
<style scoped>
.type{
    font-size: 1rem /* 16/16 */;
    color: #303133;
    position: relative;
}

.text{
    color: #606266;
}

.icon{
    flex: 1;
    width: 3.125rem /* 50/16 */;
    height: 3.125rem /* 50/16 */;
    line-height: 3.125rem /* 50/16 */;
    text-align: center;
    margin-right: .9375rem /* 15/16 */;
    color: #fff;
    border-radius: .375rem /* 6/16 */;
    opacity: .8;
}

.icon.moon-book{
    background: #FFC107;
}

.icon.system{
    background: #03A9F4;
}

.msg-content{
    flex: 6;
}

.icon i.iconfont{
    font-size: 1.75rem /* 28/16 */;
}

.tab-title{
    position: relative;
}

.tab-title .unread{
    position: absolute;
    right: 2.5rem /* 40/16 */;
    top: .3125rem /* 5/16 */;
}

.date{
    position: absolute;
    top: 0;
    right: 0;
    color: #C0C4CC;
    font-size: .75rem /* 12/16 */;
    line-height: normal;
}

.add-read,
.topping{
    width: 50%;
}

.list .slot{
    text-align: center;
    height: 4.375rem /* 70/16 */;
    line-height: 4.375rem /* 70/16 */;
    color: #fff;
}

.add-read{
    background: #C0C4CC;
}

.topping{
    background: #03A9F4;
}

</style>
