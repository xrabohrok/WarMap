<template>
    <div id="mainmap">
        You should see something here no matter what
        <div class="row" v-for="row in mapSource" v-bind:key="row.id">
            {{row.id}} : 
            <MapTile v-for="item in row.set" :key="item" :title="item"/>
        </div> 
    </div>
</template>

<script>
import {mapLayout} from '../assets/data/map.js'
import MapTile from './MapTile.vue'

export default {
    data(){
        return{
            placeholder: "blah",
            mapSource: mapLayout
        }
    },
    components:{
        MapTile
    },
    name: 'MainMap'
}
</script>

<style scoped>
.row {
  display: flex;
  justify-content: center;
}

</style>