<template>
  <div
    :style="tileWidth"
    @mouseenter="mousedOver()"
    @mouseleave="mousedOut()"
    @mouseout="mousedOut()"
    v-touch="selectingClick"
  >
    <div class="terrainGroup" :class="{ terrainGroupHovered: isHovered }">
      <transition name="stab">
        <div class="selector" v-if="isSelected">
          <img src="../assets/pics/chooser-knife.png" draggable="false" />
          <div class="tileLabel">{{ title }}</div>
        </div>
      </transition>
      <transition name="fall">
        <div class="terrainTile">
          <img :src="mapTilePath" draggable="false" />
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import { NEW_SELECTED } from "../state/mutations"
import { SELECTING_GETTER, CUR_ZONE_ID } from "../state/getters"

export default {
  name: "RoomTile",
  data() {
    return {
      publicPath: process.env.BASE_URL,
      hovering: false
    }
  },
  computed: {
    tileWidth: function() {
      return {
        width: `${100 / 14}%`
        // "height": `${(100/28)}%`
      }
    },
    isHovered: function() {
      return this.hovering
    },
    mapTilePath: function() {
      // return `${this.title}.png`
      // return `tileimages/${this.title}.png`
      return require("../assets/pics/temp-room.png")
    },
    isSelected: function() {
      return this.selected == this.title
    },

    ...mapGetters({
      selected: SELECTING_GETTER,
      curZoneId: CUR_ZONE_ID
    })
  },
  props: {
    title: String
  },
  methods: {
    mousedOver() {
      this.hovering = true
    },
    mousedOut() {
      this.hovering = false
    },
    selectingClick() {
      this.$store.commit(NEW_SELECTED, this.title)
      //need to let the dom claim the space before scrolling
      // setTimeout(function(){
      //     window.scrollTo({top: window.innerHeight *.8, behavior: 'smooth'})
      // },200)
    }
  }
}
</script>

<style scoped>
/*elements*/

.selector {
  height: 8vw;
  width: auto;
  z-index: 97;
  left: 50%;
  transform: translate(-50%, -75%);
  top: 0%;
  position: absolute;
  pointer-events: none;

  -khtml-user-select: none;
  -o-user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  user-select: none;
}

.selector img {
  height: 8vw;
  width: auto;
}

.selector div {
  position: absolute;
  top: -2%;
  left: 50%;
  transform: translateX(-50%);
  color: rgb(3 64 11);
  font-family: "Permanent Marker", cursive;
  letter-spacing: 0.1em;
  font-size: 0.8em;
}

.terrainTile > img {
  width: 100%;
}

.simple {
  transform: translateY(-10%);
  width: 100%;
  height: auto;
  pointer-events: none;
  position: absolute;
  left: 0%;
  top: 0%;
  z-index: 90;
}

.battleIndicator {
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  left: 50%;
  transform: translate(-40%, -50%);
  z-index: 98;
  top: 0%;
  position: absolute;

  -khtml-user-select: none;
  -o-user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  user-select: none;
  pointer-events: none;
}

.terrainGroup {
  display: inline-block;
  transition: all 0.3s ease-in;
  left: 0%;
  top: 0%;

  -khtml-user-select: none;
  -o-user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  user-select: none;
  pointer-events: none;
}

.terrainTile {
  width: 100%;
  left: 0;
  top: 0;
  z-index: 90;

  pointer-events: none;

  -khtml-user-select: none;
  -o-user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  user-select: none;
}

.label {
  position: absolute;
  top: -80%;
  left: 50%;
  transform: translate(-50%, -20%);
  font-size: 0.9em;
  width: 70%;
  z-index: 99;

  background-color: whitesmoke;
  border: solid black;
  border-width: 0.02em;
  padding: 0.2em 0.65em 0.2em 0.65em;
  border-radius: 0.8em;

  -khtml-user-select: none;
  -o-user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  user-select: none;
}

@media only screen and (max-width: 840px) {
  .battleIndicator {
    width: 70%;
  }
  .selector {
    height: 6vh;
  }
  .selector div {
    font-size: 0.35em;
  }
}

@media only screen and (orientation: landscape) and (max-width: 840px) {
  .battleIndicator {
    width: 60%;
  }
  .selector {
    height: 14vh;
  }
}

/*modifiers*/

img {
  -khtml-user-select: none;
  -o-user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  user-select: none;
}

/*animations*/

div.terrainGroupHovered {
  transform: translateY(-50%);
}

.stab-enter-active,
.stab-leave-active {
  transition: all 0.3s ease-in;
}

.stab-enter /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translate(-50%, -300%);
  /* top: 500%; */
}
.stab-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease;
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translate(-50%, -200%);
  top: -200%;
  background-color: purple;
  color: white;
}

.fall-enter-active,
.fall-leave-active {
  transition: all var(--fall-time) ease-out;
  position: absolute;
}

.fall-enter /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translatey(-20vh);
  /* top: 500%; */
}
.fall-leave-to {
  opacity: 0;
  transform: translatey(20vh);
}

.ghost-enter-active,
.ghost-leave-active {
  transition: opacity 0.3s ease-out, width 0.9s ease-in-out;
}

.ghost-enter {
  opacity: 0;
  width: 0;
}

.ghost-leave-to {
  opacity: 0;
  width: 0;
}
</style>
