<template>
  <div class="map_page main">
    <h1>The Rayuba Archive</h1>
    <div class="control_bar">
      <div class="control_group">
        <div class="control_label">Rounds: </div>
        <vue-slider 
          v-model="slider_round"
          :max="maxRounds-1"
          :min="0"
          :width="500"
          :marks="true"
          :adsorb="true"
          :lazy="true"
          :maxRange="1"
          @change="setRound" 
        >
          <template v-slot:step="{active}">
            <div :class="['custom-step', {active}]"></div>
          </template>
        </vue-slider>
      </div>
      <ToggleButton :value="false" :labels="{checked:'Simple', unchecked:'Detail'}" 
        @change="setSimpleMode($event)" :width="120" :height="40" :font-size="20"/>
    </div>
    <MainMap/>
    <!-- <transition name="slideup"> -->
      <!-- <DetailPaneMobile v-show="isSelected"/> -->
    <!-- </transition> -->
    <!-- Desktop details are broken into multiple parts -->
      <transition name="slideup">
        <DetailPaneDesktop :mode="onLeft" v-show="isSelectedFight" :faction="'bastion'"/>
      </transition>
      <transition name="slideup">
        <DetailPaneDesktop :mode="onRight" v-show="isSelectedFight" :faction="'pyre'"/>
      </transition>
      <transition name="slideup">
        <DetailPaneDesktop :mode="showDetails" v-show="isSelected"/>
      </transition>
      <transition name="slideup">
        <DetailPaneDesktop :mode="showFight" v-show="isSelectedFight"/>
      </transition>

  </div>
</template>

<script>
import MainMap from '../components/MainMap.vue'
// import DetailPaneMobile from '../components/DetailPaneMobile.vue'
import {ToggleButton} from 'vue-js-toggle-button'

import DetailPaneDesktop from '../components/DetailPaneDesktop.vue'
import {LEFT, RIGHT, DETAILS, FIGHT} from '../components/DetailPaneDesktop.vue'

import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/default.css'

import {storageAvailable} from '../common/localStorage'

import {SET_SIMPLE_MODE, CHANGE_ROUND, LS_INIT, LS_AVAILABLE} from '../state/mutations'
import {SELECTING_GETTER, CURRENT_ZONE_FIGHT, NUMBER_OF_ROUNDS} from '../state/getters'
import { mapGetters } from 'vuex'


export default {
  name: 'MainPage',
  data(){
    return {
      slider_round: 0
    }
  }, 
  components: {
    MainMap,
    ToggleButton,
    // DetailPaneMobile,
    DetailPaneDesktop,
    VueSlider
  },
  computed:{
    isSelected: function(){
      return this.selecting !== "NA"
    },
    isSelectedDuel: function(){
      if(this.selecting == "NA") return false;
      return this.fight.contest
    },
    isSelectedFight: function(){
      if(this.selecting == "NA") return false;
      return this.fight.contest || this.fight.grandBattle || this.fight.clash
    },
    onLeft: function(){
      return LEFT
    },
    onRight: function(){
      return RIGHT
    },
    showDetails: function(){
      return DETAILS
    },
    showFight: function(){
      return FIGHT
    },
    ...mapGetters(
      {
        selecting: SELECTING_GETTER,
        fight: CURRENT_ZONE_FIGHT,
        maxRounds: NUMBER_OF_ROUNDS,
      }
    )
  },
  mounted: function() {
    //check availability of LS
    const available = storageAvailable('localStorage')
    this.$store.commit(LS_AVAILABLE, available)
    //throw a toast or something on failure, I dunno

    this.$store.commit(LS_INIT)

  },
  methods:{
    setSimpleMode: function({value}){
      this.$store.commit(SET_SIMPLE_MODE, value)
    },
    setRound: function(value){
      this.$store.commit(CHANGE_ROUND, value)
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->


<style scoped>
.control_bar{
  display: flex;
  flex-direction: row;
  padding-top:.3em;
  padding-bottom: .5em;
  justify-content: center;
}

.map_page{
  height: 110vh;
}

.control_bar > div {
  margin-right: 1.4em;
  margin-left: 1em;
}

.control_bar_label{
  font-size: .9em;
  padding-bottom: .6em;
}

.custom-step {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  box-shadow: 0 0 0 3px #ccc;
  background-color: #fff;
}
.custom-step.active {
  box-shadow: 0 0 0 3px #3498db;
  background-color: #3498db;
}

h1{
  font-family: 'Saira', sans-serif;
  font-size: 6em;
  margin-bottom: .3em;
}
a {
  color: #42b983;
}

.slideup-enter-active, .slideup-leave-active {
  transition: all .9s;
}
.slideup-enter{
  opacity: 0;
  transform: translatey(-100%);
  /* top: 500%; */
  /* height: 0; */


}
.slideup-leave-to{
  opacity: 0;
  transform: translatey(-100%);
  /* height: 0; */
}

/* .map_page::after{
  display: block;
  content: "";
  height: 26vh;
  width: 100vw;
  background-color: blue;
} */

</style>
