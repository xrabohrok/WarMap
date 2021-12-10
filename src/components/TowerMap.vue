<template>
  <div id="mainMap">
    <div
      class="sections"
      v-for="row in mapSource"
      v-bind:key="row.id"
      :style="pageLocation(row.id)"
    >
      <div class="singleBattle" v-for="cell in row.set" v-bind:key="cell">
        {{ cell }}
      </div>
    </div>
  </div>
</template>

<script>
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
  components: {},
  methods: {
    pageLocation: function(zoneName) {
      switch (zoneName) {
        case "pinnacle":
          return {
            left: "50%",
            top: "10%"
          }
        case "archive":
          return {
            left: "50%",
            top: "22%"
          }
        case "gallery":
          return {
            left: "25%",
            top: "40%"
          }
        case "hall":
          return {
            right: "25%",
            top: "40%"
          }
        case "grandBattle":
          return {
            left: "50%",
            top: "75%"
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
  width: 4vw;
  height: 4vh;
}

.sections {
  display: flex;
  justify-content: center;
  position: absolute;
  transform: translate(-50%, -50%);
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
