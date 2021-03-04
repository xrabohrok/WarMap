<template>
    <div id="mainMap"
        @mouseleave="mouseOut">
        <div class="row" v-for="row in mapSource" v-bind:key="row.id" :style="rowPosition(row.id, mapSource.length)">
            <!-- {{row.id}} :  -->
            <MapTile v-for="item in row.set" :key="item" :title="item"/>
        </div> 
    </div>
</template>

<script>
import {mapLayout} from '../assets/data/map.js'
import MapTile from './MapTile.vue'

import {NEW_HOVERED} from '../state/mutations'

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
            var horizontalPos = ((rowId-1) / (maxRow + 1) * 100).toFixed(2);
            // console.log(`${rowId} : against ${maxRow}, ${horizontalPos}`)
            return {
                "top": `${horizontalPos}%`,
                "z-index": `${rowId}`
            };
        },
        mouseOut: function(){
            this.$store.commit(NEW_HOVERED, 'mouse-out')
        }
    },
    name: 'MainMap'
}
</script>

<style scoped>
#mainMap{
    position: relative;
    height: 43vw;
    width: 80vw;
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
  height: 7.14%;
}

</style>