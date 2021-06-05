<template>
    <div class="header">
        <h1>The Rayuba Archive</h1>
        <div class="control_bar">
        <div class="control_group">
            <div class="control_label">Rounds: </div>
            <vue-slider
            v-model="slider_round"
            :max="maxRounds-1"
            :min="0"
            :width="400"
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
        <div class="control_group">
            <ToggleButton
              :value="true"
              :labels="{checked:'Graphics', unchecked:'Graphics'}"
              :width="115"
              :height="30"
              :font-size="17"
              @change="setGraphicVisibility($event)"
            />
            <ToggleButton
              :value="true"
              :labels="{checked:'Zones', unchecked:'Zones'}"
              :width="115"
              :height="30"
              :font-size="17"
              @change="setZoneLabelVisibility($event)"
            />
            <ToggleButton
              :value="true"
              :labels="{checked:'Items', unchecked:'Items'}"
              :width="115"
              :height="30"
              :font-size="17"
              @change="setItemVisibility($event)"
            />
        </div>
        </div>
    </div>
</template>

<script>

import { mapGetters } from 'vuex'

import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/default.css'

import {ToggleButton} from 'vue-js-toggle-button'

import {extractAndProcessParams} from '../common/queryRoute.js'

import {CURRENT_ZONE_FIGHT, NUMBER_OF_ROUNDS, CURRENT_ROUND} from '../state/getters'
import {CHANGE_ROUND, OPT_SET_GRAPHIC_VISIBILITY, OPT_SET_ZONE_VISIBILITY, OPT_SET_ITEM_VISIBILITY} from '../state/mutations'


export default {
    name:"MapHeader",
    data:function(){
        return {
            slider_round: 0
        }
    },
    components:{
        ToggleButton,
        VueSlider
    },
    methods:{
        setRound: function(value){
            this.$store.commit(CHANGE_ROUND, value)
        },
        setGraphicVisibility: function({value}){
            this.$store.commit(OPT_SET_GRAPHIC_VISIBILITY, value)
        },
        setZoneLabelVisibility: function({value}){
            this.$store.commit(OPT_SET_ZONE_VISIBILITY, value)
        },
        setItemVisibility: function({value}){
            this.$store.commit(OPT_SET_ITEM_VISIBILITY, value)
        },
    },
    computed:{
        ...mapGetters(
            {
                maxRounds: NUMBER_OF_ROUNDS,
                curRound: CURRENT_ROUND,
                fight: CURRENT_ZONE_FIGHT,

            }
        )
    },
    mounted(){
        //if a special route was used, ingest it now
        extractAndProcessParams(this)
        this.slider_round = this.curRound
    }
}
</script>

<style scoped>

h1{
    font-family: 'Suez One', serif;
    font-size: 2.5vw;
}

.header{
    padding: 0 .3vw 0 .3vw;
}

.control_bar{
  display: flex;
  flex-direction: row;
  padding-top:.3em;
  padding-bottom: .5em;
  justify-content: center;

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
</style>
