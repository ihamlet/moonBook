<template>
    <div class="school-map">
        <div class="map-container">
            <div id='Amap' class="map">
                <el-amap :vid="'amap-vue'" class="amap-demo" :center="center" :zoom="zoom" :zooms="zooms" :plugin="plugin">
                    <!-- <el-amap-marker :vid="index" :zIndex='mask.order.orderIndex' :events="mask.events" :animation='mask.animation.bounce' :content='mask.events.content' :key='index' v-for='(mask, index) in OverlayPoints' :position="[mask.location.lng,mask.location.lat]">
                    </el-amap-marker> -->
                </el-amap>
            </div>
        </div>
    </div>    
</template>
<script>
import { mapGetters } from 'vuex'

export default {
    name:'school-map',
    // computed:{
    //     ...mapGetters('userPoint'),
    //     userCenter(){
    //         return this.userPoint
    //     }
    // },
    data () {
        const self = this
        return {
            zooms:[10,19],
            zoom:14,
            center: [116.397477,39.908692],
            lng: 0,
            lat: 0,
            plugin:[{
                enableHighAccuracy:true,
                timeout:1000,
                showButton: false,
                showCircle: false,
                showMarker: true,
                markerOptions:{offset:{x:-7,y:-7},content:`<div class="UserConentPoint"></div>`},
                convert: true,
                panToLocation:true,
                extensions:'all',
                pName: 'Geolocation',
                events: {
                    init:(map)=>{
                        map.getCurrentPosition( (status, result) => {
                        if (result && result.position) {
                                self.lng = result.position.lng
                                self.lat = result.position.lat
                                self.center = [self.lng, self.lat]
                                self.dataLoading = false
                                self.$nextTick()
                            }
                        })
                    }
                }
            }],
        }
    },
    methods: {
        
    }
}
</script>
<style scoped>
.school-map,
.map-container,
.map{
    width: 100%;
    height: 100vh;
}

.map-container{
    overflow: hidden;
}

.map{
    height:calc( 100vh + 20px);
}

.map-container{
   position: relative;
}
</style>
