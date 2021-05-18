<template>
    <div id="mainMap">
        <div class="row" v-for="row in mapSource" v-bind:key="row.id" :style="rowPosition(row.id, mapSource.length)">
            <!-- {{row.id}} :  -->
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
            var horizontalPos = ((rowId-1) / (maxRow + 1) * 100).toFixed(2);
            // console.log(`${rowId} : against ${maxRow}, ${horizontalPos}`)
            return {
                "top": `${horizontalPos}%`,
                "z-index": `${rowId}`
            };
        },
    },
    name: 'MainMap'
}
</script>

<style scoped>
#mainMap{
    position: relative;
    height: 40vw;
    width: 80vw;
    margin-left: 10%;
    margin-right: 10%;
    margin-top:19vh;
    margin-bottom: 14vh;
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

<style>

body::-webkit-scrollbar {
  width: 18px;
}
body {
  scrollbar-width: thin;
  scrollbar-color:  rgb(202, 136, 12) rgb(114, 11, 50)
}
body::-webkit-scrollbar-track {
  background: var(rgb(202, 136, 12) );
}
body::-webkit-scrollbar-thumb {
  background-color:  rgb(114, 11, 50);
  border-radius: 6px;
  border: 3px solid rgb(202, 136, 12) ;
}

div::-webkit-scrollbar {
  width: 13px;
}
div {
  scrollbar-width: thin;
  scrollbar-color:  rgb(160, 109, 14) rgb(100, 23, 53)
}
div::-webkit-scrollbar-track {
  background: var(rgb(165, 113, 17) );
}
div::-webkit-scrollbar-thumb {
  background-color:  rgb(92, 25, 50);
  border-radius: 6px;
  border: 3px solid rgb(155, 110, 26) ;
}
</style>