<template>
    <div>
        <div class="bj-img">
             <div class="pf-box">
        <div>
        <van-tabs v-model="active" background="inherit" animated color="#fff" title-active-color="#fff" title-inactive-color="#fff"> 
                <van-tab title="文章数">
                    <div class="tab-box">
                        <van-cell-group>
                            <van-cell>
                                11
                            </van-cell>
                            <van-cell>
                                11
                            </van-cell>
                            <van-cell>
                                11
                            </van-cell>
                            <van-cell>
                                11
                            </van-cell>
                        </van-cell-group>  
                    </div>
                </van-tab>
                <van-tab title="视频数">
11111
                </van-tab>
                <van-tab title="分享数">
11111
                </van-tab>
        </van-tabs>
                </div>
        </div>
        <!-- <img src="../../../assets/pxb/teaher.png"> -->
        </div>
        
    </div>
</template>

<script>
export default {
    name:'memberRanking',
    data(){
        return{
            active:0,
        }
    }
}
</script>

<style scoped>
.bj-img{
    position: relative;
}
.pf-box{
    position: absolute;
    z-index: 90;
    left:10px;
    right: 10px;
    top: 70%;
}
.tab-box{
    border-radius: 6px;
    background: #fff;
    box-shadow: 0 0 5px #f1f1f1;
    margin-top: 10px;
    padding: 5px;
}
</style>


