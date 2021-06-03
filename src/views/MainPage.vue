<template>
  <div class="map_page main">

    <div v-if="!mobile">
      <MainMap/>
      <!-- <transition name="slideup"> -->
        <!-- <DetailPaneMobile v-show="isSelected"/> -->
      <!-- </transition> -->
      <!-- Desktop details are broken into multiple parts -->
      <transition name="slideup">
        <div class=" desktopHeader left" v-show="isSelected">
            <DetailPaneDesktop :mode="showDetails" />
        </div>
      </transition>
      <MapHeader class="centerControls desktopHeader"/>
      <transition name="slideup">
        <div class=" desktopHeader right" v-show="isSelectedFight">
            <DetailPaneDesktop :mode="showFight" />
        </div>
      </transition>

      <transition name="slideup">
        <div class="desktopFooter" v-show="isSelectedFight">
            <DetailPaneDesktop :mode="onLeft"  :faction="'bastion'"/>
        </div>
      </transition>
      <transition name="slideup">
        <div class="desktopFooter right" v-show="isSelectedFight">
            <DetailPaneDesktop :mode="onRight" :faction="'pyre'"/>
        </div>
      </transition>
    </div>
  </div>

</template>

<script>
import Vue from 'vue';
import MainMap from '../components/MainMap.vue'
// import DetailPaneMobile from '../components/DetailPaneMobile.vue'

import DetailPaneDesktop from '../components/DetailPaneDesktop.vue'
import MapHeader from '../components/MapHeader.vue'
import {LEFT, RIGHT, DETAILS, FIGHT} from '../components/DetailPaneDesktop.vue'

import {storageAvailable} from '../common/localStorage'

import { LS_INIT, LS_AVAILABLE} from '../state/mutations'
import {SELECTING_GETTER, CURRENT_ZONE_FIGHT} from '../state/getters'
import { mapGetters } from 'vuex'

export default {
  name: 'MainPage',
  data(){
    return {
      mobile:window.innerWidth <= 840,
    }
  }, 
  components: {
    MainMap,
    // DetailPaneMobile,
    DetailPaneDesktop,
    MapHeader,
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
      }
    )
  },
  mounted: function() {
    //check availability of LS
    const available = storageAvailable('localStorage')
    if(!available){
      Vue.$toast.open({
        message: 'Something about this Browser is not allowing for Local Storage, Your read list will not be saved!',
        duration: 10000,
        type: 'warning',
        position: 'top-right'
      })
    }
    else{
      Vue.$toast.open({
        message: 'Reading-list loaded!',
        duration: 3000,
        type: 'success',
        position: 'top-right'
      })
    }

    this.$store.commit(LS_AVAILABLE, available)
    this.$store.commit(LS_INIT)

  },
  created: function(){
    window.addEventListener('resize', ()=> {this.mobile = innerWidth <= 840})
  },
  methods:{

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>

.map_page{
  height: 99vh;
  position: absolute;
  top: 0%;
}

.desktopHeader{
  position: fixed;
  width: 32vw;
  height: 25vh;

  top:0%;
  z-index: 300;

  margin-top: .2vh;

}

.centerControls{
  height: 25vh;
  transform: translateX(-50%);
  left: 50%;
  padding: 0 .9vw 0 .9vw;
}

.right.desktopHeader{
  right: 0%;
}

.left.desktopHeader{
  left: 0%;
}

.desktopFooter{
  position: fixed;
  width: 33vw;
  height: 25vh;

  bottom:0%;
  left: 0%;
  z-index: 300;

  margin-bottom: .2vh;

}

.desktopFooter.right{
  left:auto;
  right: 0%;
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
