<template>
    <div class="page manage manage-page-style">
        <router-view></router-view>
    </div>
</template>
<script>
import { mapActions } from 'vuex'

export default {
    name:'manage',
    created () {
       this.getMyMenus()
    },
    methods: {
        ...mapActions('manage',['getMyMenus'])
    }
}
</script>
<style lang="less">
.manage-page-style{
    .teacher-card,
    .user-card{
        justify-content: space-between;
    }

    .child-card  .info img,
    .teacher-card .info img,
    .user-card .info img{
        width: 40px;
        height: 40px;
        overflow: hidden;
        border-radius: 50%;
        margin-right: 10px;
    }

    .child-card .name,
    .teacher-card .name,
    .user-card .name{
        font-size: 16px;
        color: #303133;
    }

    .operation-btn .pass,
    .operation-btn .past{
        margin-left: 10px;
    }

    .avatar{
        position: relative;
    }

    .avatar .teacher-type{
        position: absolute;
        z-index: 10;
        top: -5px;
        color: #fff;
        font-size: 13px;
        right: 7px;
    }

    .teacher-type.red{
        background: #F56C6C
    }

    .teacher-type.yellow{
        background: #E6A23C;
    }

    .tell .iconfont{
        font-size: 20px;
        color: #67C23A;
        margin-right: 20px;
    }
}

.van-cell__value.info-cell{
    flex: 2;
}
.van-cell__label.directions{
    white-space: nowrap;
}
</style>
