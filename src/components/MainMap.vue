<template>
  <div id="zoomMap" ref="zoomMap">
    <div id="mainMap" ref="mainMap">
      <div
        class="row"
        v-for="row in mapSource"
        v-bind:key="row.id"
        :style="rowPosition(row.id, mapSource.length)"
      >
        <!-- {{row.id}} :  -->
        <MapTile v-for="item in row.set" :key="item" :title="item" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapLayout } from "../assets/data/map.js"
import MapTile from "./MapTile.vue"

export default {
  props: {
    mobileMode: Boolean
  },
  data() {
    return {
      mapSource: mapLayout
    }
  },
  components: {
    MapTile
  },
  methods: {
    rowPosition: function(rowId, maxRow) {
      var horizontalPos = (((rowId - 1) / (maxRow + 1)) * 100).toFixed(2)
      // console.log(`${rowId} : against ${maxRow}, ${horizontalPos}`)
      return {
        top: `${horizontalPos}%`,
        "z-index": `${rowId}`
      }
    }
  },
  name: "MainMap"
}
</script>

<style scoped>
#zoomMap {
  height: 50vh;
  width: 100vw;
  transform-origin: top left;
  position: relative;
  touch-action: pinch-zoom pan-x pan-y;
}

@media only screen and (orientation: landscape) and (max-width: 840px) {
  #zoomMap {
    height: 100vh;
    width: 50vw;
    transform: translateX(-50%);
  }
}

#mainMap {
  position: absolute;
  height: 44vw;
  width: 88vw;
  top: 20vh;
  transform: translateX(-50%);
  left: 50vw;
  margin-top: 14vh;
  padding-bottom: 3vh;
  margin-bottom: 5vh;
}

.row {
  display: flex;
  justify-content: center;
  padding: 0;
  position: absolute;
  left: 0;
  right: 0;
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
  scrollbar-color: rgb(202, 136, 12) rgb(114, 11, 50);
}
body::-webkit-scrollbar-track {
  background: var(rgb(202, 136, 12));
}
body::-webkit-scrollbar-thumb {
  background-color: rgb(114, 11, 50);
  border-radius: 6px;
  border: 3px solid rgb(202, 136, 12);
}

div::-webkit-scrollbar {
  width: 13px;
}
div {
  scrollbar-width: thin;
  scrollbar-color: rgb(160, 109, 14) rgb(100, 23, 53);
}
div::-webkit-scrollbar-track {
  background: var(rgb(165, 113, 17));
}
div::-webkit-scrollbar-thumb {
  background-color: rgb(92, 25, 50);
  border-radius: 6px;
  border: 3px solid rgb(155, 110, 26);
}
</style>
