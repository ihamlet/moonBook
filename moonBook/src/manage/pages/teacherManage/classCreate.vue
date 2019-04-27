<template>
    <div class="padd-top">
        <div class="section-box">
            <div class="box-list">
                <div class="box-one">
                    <div class="pic-box"><van-icon name="user-o" /></div>
                </div>
                <div class="box-inp">
                   <van-field v-model="classname" label="班级名称" placeholder="请输入" input-align="right" />
                </div>
                <div class="but-box"><van-button size="large" round type="info" @click="golist">立即创建</van-button></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:'classcreate',
    data(){
        return{
           title:'创建班级',
           classname:'',
        }
    },
    methods:{
        golist(){
            this.$router.push({ path: '/teacherManage/classlist', })
        }
    }
}
</script>

<style scoped>
.section-box{
    padding: 15px 15px 15px;
}
.box-list{
  background: #fff;
  border-radius: 6px;
  padding: 10px;
  box-shadow: 1px 2px 5px #AAA;
}
.box-one{
    margin-top: 20px;
    display: flex;
    justify-content: center;
}
.pic-box{
    width: 70px;
    height: 70px;
    border-radius: 50%;
    background: #D8D8D8;
    font-size: 38px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
}
.box-inp{
    margin-top: 40px;
    border-bottom: 1px solid #f7f7f7;
}
.but-box{
    padding-top: 40px;
    padding-bottom: 25px;
    padding-left: 15px;
    padding-right: 15px;
}
</style>


