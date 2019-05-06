<template>
    <div class="trophy-box">
        <div class="poset flex flex-justify">
            <div class="arctext bounceIn animated an-2">
                <span v-for='(item,index) in arctext' :data-text='item.text' :key="index" :class="[`route-${index}`,item.name]">{{item.text}}</span>
            </div>
            <img class="trophy bounceIn animated an-0" src="https://assets-moonbook.oss-cn-beijing.aliyuncs.com/animate/jiangbei%20.png"/>
            <div class="receive tada animated an-4">
                领奖啦!
            </div>
        </div>
    </div>    
</template>
<script>
export default {
    name:'Trophy',
    props:['signDays'],
    computed: {
     arctext(){
        let arr = [{
            name:'text',
            text:'已'
        },{
            name:'text',
            text:'完'
        },{
            name:'text',
            text:'成'
        },{
            name:'number',
            text:this.signDays
        },{
            name:'text',
            text:'天'
        },{
            name:'text',
            text:'打'  
        },{
            name:'text',
            text:'卡'  
        }]
        return arr
     }
    }
}
</script>
<style scoped>
.poset{
    position: relative;
}

.day,
.trophy,
.flower{
    position: absolute;
}

.day{
    width: 240px;
    z-index: 3;
    margin-top: 40px;
}

.trophy{
    z-index: 2;
    width: 184px;
}

.flower{
    z-index: 1;
}

.arctext{
    z-index: 8;
    position: absolute;
    top: 30px;
    width: 100%;
    text-align: center;
    white-space: nowrap;
}


.arctext span{
    font-size: 36px;
    position: relative;
    font-weight: 800;
    display: inline-block;
}

.arctext span.number{
    font-size: 60px;
    line-height: 60px;
    font-style: italic;
}

/* .route-0{
    transform:rotate(-60deg);
    bottom: -50PX;
}

.route-1{
    transform:rotate(-45deg);
    bottom: -15PX;
}

.route-2{
    transform:rotate(-30deg);
    bottom: 10PX;
}

.route-4{
    transform:rotate(30deg);
    bottom: -7PX;
    right: 0;
}

.route-5{
    transform:rotate(50deg);
    bottom: -32PX;
    right: 0;
}

.route-6{
    transform:rotate(55deg);
    bottom: -70PX;
    right: 0;
} */
.arctext span::before{
    -webkit-text-stroke: 2px #fff;
    content: attr(data-text);
    position: absolute;
    color: red;
}

.receive{
    z-index: 10;
    position: absolute;
    background: red;
    font-size: 20px;
    color: #fff;
    height: 40px;
    line-height: 40px;
    padding: 0 20px;
    top: 100px;
}
</style>
