<template>
  <div class="map_page main">
    <div v-if="!mobile">
      <MainMap />
      <transition name="slideup">
        <div class=" desktopHeader left" v-show="isSelected">
          <DetailPane :mode="showDetails" />
        </div>
      </transition>
      <MapHeader class="centerControls desktopHeader" />
      <transition name="slideup">
        <div class=" desktopHeader right" v-show="isSelectedFight">
          <DetailPane :mode="showFight" />
        </div>
      </transition>

      <transition name="fighterslide">
        <div class="desktopFooter" v-show="isSelectedFight">
          <DetailPane :mode="onLeft" :faction="'bastion'" />
        </div>
      </transition>
      <transition name="fighterslide">
        <div class="desktopFooter right" v-show="isSelectedFight">
          <DetailPane :mode="onRight" :faction="'pyre'" />
        </div>
      </transition>

      <transition name="side-slide-left">
        <RoundSummary
          class="bastion roundSummary"
          :isBastion="true"
          v-if="rosterEnabled && showingRoster"
        />
      </transition>
      <transition name="side-slide-right">
        <RoundSummary
          class="pyre roundSummary"
          :isBastion="false"
          v-if="rosterEnabled && showingRoster"
        />
      </transition>
    </div>

    <div class="screenContainer" v-if="mobile">
      <div id="mobileMap">
        <MobileMapZoom />
      </div>
      <div class="mobileContent" tag="div">
        <MapHeader />
        <transition-group name="grow">
          <div
            class="mobileSummaryContainer"
            :key="'pyreFighters'"
            v-if="rosterEnabled"
          >
            <div class="mobileSummaryButton" @click="pyreGroupClick">
              Pyre Fighters
            </div>
            <RoundSummary
              class="pyre mobileSummary"
              :isBastion="false"
              v-if="pyreRosterExpanded"
            />
          </div>
          <div
            class="mobileSummaryContainer"
            :key="'bastionFighters'"
            v-if="rosterEnabled"
          >
            <div class="mobileSummaryButton" @click="bastionGroupClick">
              Bastion Fighters
            </div>
            <RoundSummary
              class="bastion mobileSummary"
              :isBastion="true"
              v-if="bastionRosterExpanded"
            />
          </div>
          <DetailPane :mode="showDetails" :key="'tiledeets'" />
          <DetailPane
            :mode="showFight"
            v-show="isSelectedFight"
            :key="'fightdeets'"
          />
          <DetailPane
            :mode="onLeft"
            v-show="isSelectedFight"
            :faction="'bastion'"
            :key="'leftfighter'"
          />
          <DetailPane
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

import DetailPane from "../components/DetailPane.vue"
import MapHeader from "../components/MapHeader.vue"
import MobileMapZoom from "../components/MobileMapZoom.vue"
import RoundSummary from "../components/RoundSummary.vue"
import { LEFT, RIGHT, DETAILS, FIGHT } from "../components/DetailPane.vue"

import { storageAvailable } from "../common/localStorage"

import { LS_INIT, LS_AVAILABLE } from "../state/mutations"
import {
  SELECTING_GETTER,
  CURRENT_ZONE_FIGHT,
  CURRENT_ROUND,
  OPT_SHOW_SUMMARIES
} from "../state/getters"
import { mapGetters } from "vuex"

import { extractAndProcessParams } from "../common/queryRoute.js"

export default {
  name: "MainPage",
  data() {
    return {
      mobile: window.outerWidth <= 840,
      pyreRosterExpanded: false,
      bastionRosterExpanded: false
    }
  },
  components: {
    MainMap,
    DetailPane,
    MapHeader,
    MobileMapZoom,
    RoundSummary
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
      return (
        this.fight.contest ||
        this.fight.grandBattle ||
        this.fight.clash ||
        this.fight.miniclash
      )
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
    rosterEnabled: function() {
      return this.curRound !== 0
    },
    ...mapGetters({
      selecting: SELECTING_GETTER,
      fight: CURRENT_ZONE_FIGHT,
      curRound: CURRENT_ROUND,
      showingRoster: OPT_SHOW_SUMMARIES
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
  },
  beforeMount: function() {
    extractAndProcessParams(this)
    this.slider_round = this.curRound
  },
  created: function() {
    window.addEventListener("resize", () => {
      this.mobile = window.outerWidth <= 840
    })
  },
  watch: {},
  methods: {
    pyreGroupClick: function() {
      this.pyreRosterExpanded = !this.pyreRosterExpanded
    },
    bastionGroupClick: function() {
      this.bastionRosterExpanded = !this.bastionRosterExpanded
    }
  }
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

.roundSummary {
  position: fixed;
  top: 24vh;
  height: 70vh;

  background-color: rgb(48, 7, 17);
  border-color: chocolate;
  border-style: solid;
  border-radius: 1em;
  padding-left: 1%;
}

.mobileSummaryButton {
  font-size: 0.7em;
  margin: 2vh auto 2vh auto;
  width: 90%;

  background-color: rgb(41, 105, 50);
  padding: 0.3em 0 0.3em 0;
}

.mobileSummaryContainer {
  width: 100%;
  padding-left: 0.2em;
  padding-right: 0.2em;
}

.mobileSummary {
  height: 60vh;
  width: 100%;

  font-size: 0.6em;
}

.roundSummary.pyre {
  right: 1vw;
}

.roundSummary.bastion {
  left: 1vw;
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
  transition: all 0.5s;
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

.fighterslide-enter-active,
.fighterslide-leave-active {
  transition: all 0.5s;
}
.fighterslide-enter {
  opacity: 0;
  transform: translatey(100%);
  /* top: 500%; */
  /* height: 0; */
}
.fighterslide-leave-to {
  opacity: 0;
  transform: translatey(100%);
  /* height: 0; */
}

.side-slide-left-enter-active,
.side-slide-right-enter-active {
  transition: all 0.3s ease-out;
}

.side-slide-left-leave-active,
.side-slide-right-leave-active {
  transition: all 0.3s ease-in;
}

.side-slide-left-enter,
.side-slide-left-leave-to {
  transform: translateX(-100%);
}

.side-slide-right-enter,
.side-slide-right-leave-to {
  transform: translateX(100%);
}
</style>
