<template>
    <div class="page manage">
        <div class="root-dom">
            <div class="refresh">
                <keep-alive>
                    <router-view v-if="$route.meta.keepAlive"></router-view>
                </keep-alive>
                <router-view v-if="!$route.meta.keepAlive"></router-view>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:'manage'
}
</script>
<style>

</style>
