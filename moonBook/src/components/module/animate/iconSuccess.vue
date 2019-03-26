<template>
    <div class="icon-wrap">
        <div class="circle"></div>
        <div class="top"></div>
        <div class="bottom"></div>
        <div class="container">
            <img src="https://oss-hys.oss-cn-hangzhou.aliyuncs.com/moonBook/duihao.png">
            <div class="div11"></div>
        </div>
    </div>
</template>
<script>
export default {
    name:'icon-success'
}
</script>
<style scoped>
.icon-wrap {
    width: 60px;
    height: 60px;
    overflow: hidden;
    transform: rotate(270deg) scale(0.7);
}

.circle,
.circle:before{
    border: .125rem /* 2/16 */ solid #47d94a;
}

.circle {
    height: 100%;
    box-sizing: border-box;
    border-radius: 50%;
    z-index: 3;
}
.circle:before {
    content: '';
    position: absolute;
    display: block;
    width: 100%;
    height: 50%;
    box-sizing: border-box;
    top: 50%;
    left: 0;
    border-top: transparent;
    border-radius: 0 0 50% 50%/ 0 0 100% 100%;
    z-index: 2;
}
.top,
.bottom {
    position: absolute;
    left: 0px;
    width: 100%;
    height: 50%;
    box-sizing: border-box;
    background: white;
}
.top {
    top: 0;
    z-index: 1;
    transform-origin: center bottom;
    animation: 0.5s back-half linear 0.5s;
    animation-fill-mode: forwards;
}
.bottom {
    z-index: 3;
    top: 50%;
    transform-origin: center top;
    animation: 0.5s front-half linear;
    animation-fill-mode: forwards;
    z-index: 9;
}

.container {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    top: .3125rem /* 5/16 */;
    left: .3125rem /* 5/16 */;
    position: absolute;
    z-index: 10;
    overflow: hidden;
    transform: rotate(90deg);
}
.container img {
    width: 50px;
    height: 50px;
}
.div11 {
    position: absolute;
    width: 50px;
    height: 50px;
    animation: myfirst 5s;
    -moz-animation: myfirst 3s; /* Firefox */
    -webkit-animation: myfirst 3s; /* Safari 和 Chrome */
    -o-animation: myfirst 3s;
    top: 0;
    background: #fff;
    left: 0;
    border-radius: 50%;
    animation-fill-mode: forwards;
    animation-delay: 1s;
}

@keyframes front-half {
    0% {
        transform: rotate(0);
    }
    99% {
        transform: rotate(180deg);
        opacity: 1;
    }
    100% {
        transform: rotate(180deg);
        opacity: 0;
    }
}

@keyframes back-half {
    0% {
        transform: rotate(0);
    }
    99% {
        transform: rotate(180deg);
        opacity: 1;
    }
    100% {
        transform: rotate(180deg);
        opacity: 0;
    }
}

@keyframes myfirst {
    0% {
        left: 0;
    }

    100% {
        left: 100px;
    }
}
</style>

