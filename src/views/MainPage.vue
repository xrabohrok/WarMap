<template>
  <div class="map_page main">
    <div v-if="!mobile">
      <MainMap />
      <!-- <transition name="slideup"> -->
      <!-- <DetailPaneMobile v-show="isSelected"/> -->
      <!-- </transition> -->
      <!-- Desktop details are broken into multiple parts -->
      <transition name="slideup">
        <div class=" desktopHeader left" v-show="isSelected">
          <DetailPaneDesktop :mode="showDetails" />
        </div>
      </transition>
      <MapHeader class="centerControls desktopHeader" />
      <transition name="slideup">
        <div class=" desktopHeader right" v-show="isSelectedFight">
          <DetailPaneDesktop :mode="showFight" />
        </div>
      </transition>

      <transition name="slideup">
        <div class="desktopFooter" v-show="isSelectedFight">
          <DetailPaneDesktop :mode="onLeft" :faction="'bastion'" />
        </div>
      </transition>
      <transition name="slideup">
        <div class="desktopFooter right" v-show="isSelectedFight">
          <DetailPaneDesktop :mode="onRight" :faction="'pyre'" />
        </div>
      </transition>
    </div>

    <div class="screenContainer" v-if="mobile">
      <div id="mobileMap">
        <MobileMapZoom />
      </div>
      <div class="mobileContent" tag="div">
        <MapHeader />
        <transition-group name="grow">
          <DetailPaneDesktop :mode="showDetails" :key="'tiledeets'" />
          <DetailPaneDesktop
            :mode="showFight"
            v-show="isSelectedFight"
            :key="'fightdeets'"
          />
          <DetailPaneDesktop
            :mode="onLeft"
            v-show="isSelectedFight"
            :faction="'bastion'"
            :key="'leftfighter'"
          />
          <DetailPaneDesktop
            :mode="onRight"
            v-show="isSelectedFight"
            :faction="'pyre'"
            :key="'rightfighter'"
          />
          <div v-if="!isSelected" class="prompt" :key="'prompt'">
            Tap a Tile to see information about it
          </div>
        </transition-group>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue"
import MainMap from "../components/MainMap.vue"
// import DetailPaneMobile from '../components/DetailPaneMobile.vue'

import DetailPaneDesktop from "../components/DetailPaneDesktop.vue"
import MapHeader from "../components/MapHeader.vue"
import MobileMapZoom from "../components/MobileMapZoom.vue"
import {
  LEFT,
  RIGHT,
  DETAILS,
  FIGHT
} from "../components/DetailPaneDesktop.vue"

import { storageAvailable } from "../common/localStorage"

import { LS_INIT, LS_AVAILABLE } from "../state/mutations"
import { SELECTING_GETTER, CURRENT_ZONE_FIGHT } from "../state/getters"
import { mapGetters } from "vuex"

import { extractAndProcessParams } from "../common/queryRoute.js"

export default {
  name: "MainPage",
  data() {
    return {
      mobile: window.outerWidth <= 840,
      zoomer: null
    }
  },
  components: {
    MainMap,
    // DetailPaneMobile,
    DetailPaneDesktop,
    MapHeader,
    MobileMapZoom
  },
  computed: {
    isSelected: function() {
      return this.selecting !== "NA"
    },
    isSelectedDuel: function() {
      if (this.selecting == "NA") return false
      return this.fight.contest
    },
    isSelectedFight: function() {
      if (this.selecting == "NA") return false
      return this.fight.contest || this.fight.grandBattle || this.fight.clash
    },
    onLeft: function() {
      return LEFT
    },
    onRight: function() {
      return RIGHT
    },
    showDetails: function() {
      return DETAILS
    },
    showFight: function() {
      return FIGHT
    },
    ...mapGetters({
      selecting: SELECTING_GETTER,
      fight: CURRENT_ZONE_FIGHT
    })
  },
  mounted: function() {
    //check availability of LS
    const available = storageAvailable("localStorage")
    if (!available) {
      Vue.$toast.open({
        message:
          "Something about this Browser is not allowing for Local Storage, Your read list will not be saved!",
        duration: 10000,
        type: "warning",
        position: "top-right"
      })
    } else {
      Vue.$toast.open({
        message: "Reading-list loaded!",
        duration: 3000,
        type: "success",
        position: "top-right"
      })
    }

    this.$store.commit(LS_AVAILABLE, available)
    this.$store.commit(LS_INIT)

    //if a special route was used, ingest it now
    extractAndProcessParams(this)
    this.slider_round = this.curRound
  },
  created: function() {
    window.addEventListener("resize", () => {
      this.mobile = window.outerWidth <= 840
    })
  },
  watch: {},
  methods: {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
#mobileMap {
  /*portrait*/
  height: 50vh;
  width: 100vw;
}

.prompt {
  font-family: "Suez One", serif;
  width: 100%;
  height: 50%;
  background-color: #631042;
  padding-top: 1em;
}

.screenContainer {
  display: flex;
  flex-direction: column;
}

.mobileContent {
  position: relative;
  height: 50vh;
  width: 100vw;
  background-color: rgb(48, 7, 26);
  margin: 0%;
  overflow: auto;
}

.map_page {
  height: 99vh;
  position: absolute;
  top: 0%;
  overflow-y: auto;
  overflow-x: hidden;
}

@media only screen and (max-width: 840px) {
  .map_page {
    overflow: hidden;
  }
}

@media only screen and (orientation: landscape) and (max-width: 840px) {
  #mobileMap {
    height: 100vh;
    width: 50vw;
  }

  .mobileContent {
    height: 100vh;
    width: 50vw;
  }

  .screenContainer {
    flex-direction: row;
    overflow: hidden;
  }
}

.desktopHeader {
  position: fixed;
  width: 32vw;
  height: 25vh;

  top: 0%;
  z-index: 300;

  margin-top: 0.2vh;
}

.centerControls {
  height: 25vh;
  transform: translateX(-50%);
  left: 50%;
  padding: 0 0.9vw 0 0.9vw;
}

.right.desktopHeader {
  right: 0%;
}

.left.desktopHeader {
  left: 0%;
}

.desktopFooter {
  position: fixed;
  width: 33vw;
  height: 25vh;

  bottom: 0%;
  left: 0%;
  z-index: 300;

  margin-bottom: 0.2vh;
}

.desktopFooter.right {
  left: auto;
  right: 0%;
}

h1 {
  font-family: "Saira", sans-serif;
  font-size: 6em;
  margin-bottom: 0.3em;
}

a {
  color: #42b983;
}

.grow-enter-active,
.grow-leave-active {
  transition: flex-grow 0.9s opacity 0.5s;
}
.grow-enter {
  opacity: 0;
  flex-grow: 0.01;
  /* top: 500%; */
  /* height: 0; */
}
.grow-leave-to {
  opacity: 0;
  flex-grow: 0.01;
  /* height: 0; */
}
/* .grow-move{
  transition: transform 1s;
} */

.slideup-enter-active,
.slideup-leave-active {
  transition: all 0.9s;
}
.slideup-enter {
  opacity: 0;
  transform: translatey(-100%);
  /* top: 500%; */
  /* height: 0; */
}
.slideup-leave-to {
  opacity: 0;
  transform: translatey(-100%);
  /* height: 0; */
}
</style>
