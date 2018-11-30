<template>
    <div class="img-preview flex flex-justify" v-if="drying.media.imgList.length > 0">
        <div class="grid" v-if="index < 4" v-for="(item,index) in drying.media.imgList" :key="index" v-lazy:background-image="item.img"></div>
        <div class="robe" v-if="drying.media.imgList.length > 4">
            <photo-stack/>
        </div>
        <div class="badge" v-if="drying.media.imgList.length > 4">{{drying.media.imgList.length}}</div>
    </div>
    <div class="text-preview" v-line-clamp:20="2" v-else>
        {{drying.text}}
    </div>
</template>
<script>
    import photoStack from './../animate/photoStack'
    export default {
        name: 'show-card',
        props: ['drying'],
        components: {
            photoStack
        },
    }
</script>
<style scoped>

</style>
