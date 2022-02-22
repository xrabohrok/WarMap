<template>
  <div id="mainMap">
    <div
      class="sections"
      v-for="row in mapSource"
      v-bind:key="row.id"
      :style="pageLocation(row.id)"
    >
      <div class="section_title">{{ row.id }}</div>
      <RoomTile
        :title="cell"
        class="singleBattle"
        v-for="cell in row.set"
        v-bind:key="cell"
      />
    </div>
  </div>
</template>

<script>
import RoomTile from "./RoomTile.vue"
import { towerGroups } from "../assets/data/towerLayout.js"
import { CHANGE_ROUND } from "../state/mutations.js"

export default {
  props: {
    mobileMode: Boolean
  },
  data() {
    return {
      mapSource: towerGroups
    }
  },
  components: {
    RoomTile
  },
  methods: {
    pageLocation: function(zoneName) {
      switch (zoneName) {
        case "pinnacle":
          return {
            left: "50%",
            top: "20%"
          }
        case "archive":
          return {
            left: "50%",
            top: "43%"
          }
        case "gallery":
          return {
            left: "20%",
            top: "55%",
            width: "35vw"
          }
        case "hall":
          return {
            left: "80%",
            top: "55%",
            width: "35vw"
          }
        case "grandBattle":
          return {
            left: "50%",
            bottom: "6%"
          }
        default:
          console.log(`Failed to find style for ${zoneName}`)
      }
    }
  },
  beforeMount: function() {
    this.$store.commit(CHANGE_ROUND, 8)
  },
  name: "TowerMap"
}
</script>

<style scoped>
.singleBattle {
  background-color: rgb(73, 30, 30);
  padding: 0.2em 0.8em;
  margin: 0.15em;
  min-width: 5vw;

  font-family: "Permanent Marker", cursive;
  font-size: 1.5em;
}

.sections {
  display: flex;
  justify-content: center;
  position: absolute;
  transform: translate(-50%, -50%);
  flex-direction: row;
  flex-wrap: wrap;
}

.section_title {
  position: absolute;
  top: -1.6em;

  font-family: "Permanent Marker", cursive;
  font-size: 1.9em;
}

#mainMap {
  width: 100%;
  height: 100%;
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
