<template>
    <div id="mainMap">
        <div class="row" v-for="row in mapSource" v-bind:key="row.id" :style="rowPosition(row.id, mapSource.length)">
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
    methods: {
        rowPosition: function(rowId, maxRow){
            var horizontalPos = Math.floor((rowId-1) / (maxRow + 1) * 100);
            // console.log(`${rowId} : against ${maxRow}, ${horizontalPos}`)
            return {
                "top": `${horizontalPos}%`,
                "z-index": `${rowId}`
            };
        }
    },
    name: 'MainMap'
}
</script>

<style scoped>
#mainMap{
    position: relative;
    height: 12.5em;
    width: 80%;
    margin-left: 10%;
    margin-right: 10%;
}

.row {
  display: flex;
  justify-content: center;
  padding: 0;
  position: absolute;
  left:0;
  right:0;
  margin: auto;
  width: 100%;
  height: auto;
}

</style>