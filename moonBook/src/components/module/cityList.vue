<template>
    <div class="city-list">
        <search-city/>
    </div>
</template>
<script>
import searchCity from './search/searchCity'

export default {
    name:'selectCity',
    components: {
        searchCity
    },
    data () {
        return {
            
        }
    }
}
</script>
<style scoped>

</style>
