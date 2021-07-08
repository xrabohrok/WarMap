<template>
  <div class="header">
    <h1 class="desktop">The Rayuba Archive</h1>
    <div class="control_bar">
      <div class="control_group" style="margin-bottom:7%;">
        <div class="control_label">Rounds:</div>
        <vue-slider
          v-model="slider_round"
          :max="maxRounds - 1"
          :min="0"
          :marks="true"
          :adsorb="true"
          :lazy="true"
          :tooltip="'none'"
          :maxRange="1"
          @change="setRound"
        >
          <template v-slot:step="{ active }">
            <div :class="['custom-step', { active }]"></div>
          </template>
        </vue-slider>
      </div>
      <div class="control_group">
        <ToggleButton
          :value="true"
          :labels="{ checked: 'Graphics', unchecked: 'Graphics' }"
          :width="115"
          :height="30"
          :font-size="17"
          @change="setGraphicVisibility($event)"
        />
        <ToggleButton
          :value="true"
          :labels="{ checked: 'Zones', unchecked: 'Zones' }"
          :width="115"
          :height="30"
          :font-size="17"
          @change="setZoneLabelVisibility($event)"
        />
        <ToggleButton
          :value="true"
          :labels="{ checked: 'Items', unchecked: 'Items' }"
          :width="115"
          :height="30"
          :font-size="17"
          @change="setItemVisibility($event)"
        />
      </div>
      <div class="control_group">
        <div
          class="wide_button"
          @click="toggleSummary"
          :class="{ disabled: !enableRosterButton }"
        >
          {{ showingSummaries ? "Hide" : "Show" }} Fighter Roster
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex"

import VueSlider from "vue-slider-component"
import "./elements/customerSlider.css"

import { ToggleButton } from "vue-js-toggle-button"

import {
  CURRENT_ZONE_FIGHT,
  NUMBER_OF_ROUNDS,
  CURRENT_ROUND,
  OPT_SHOW_SUMMARIES
} from "../state/getters"
import {
  CHANGE_ROUND,
  OPT_SET_GRAPHIC_VISIBILITY,
  OPT_SET_ZONE_VISIBILITY,
  OPT_SET_ITEM_VISIBILITY,
  OPT_SET_SUMMARY_SHOW
} from "../state/mutations"

export default {
  name: "MapHeader",
  data: function() {
    return {
      slider_round: 0
    }
  },
  components: {
    ToggleButton,
    VueSlider
  },
  methods: {
    setRound: function(value) {
      this.$store.commit(CHANGE_ROUND, value)
    },
    setGraphicVisibility: function({ value }) {
      this.$store.commit(OPT_SET_GRAPHIC_VISIBILITY, value)
    },
    setZoneLabelVisibility: function({ value }) {
      this.$store.commit(OPT_SET_ZONE_VISIBILITY, value)
    },
    setItemVisibility: function({ value }) {
      this.$store.commit(OPT_SET_ITEM_VISIBILITY, value)
    },
    toggleSummary: function() {
      if (this.enableRosterButton) {
        this.$store.commit(OPT_SET_SUMMARY_SHOW)
      }
    }
  },
  computed: {
    ...mapGetters({
      maxRounds: NUMBER_OF_ROUNDS,
      curRound: CURRENT_ROUND,
      fight: CURRENT_ZONE_FIGHT,
      showingSummaries: OPT_SHOW_SUMMARIES
    }),
    enableRosterButton: function() {
      return this.curRound !== 0
    }
  },
  mounted() {}
}
</script>

<style scoped>
h1 {
  font-family: "Suez One", serif;
  font-size: 2.5vw;
  margin-bottom: 2%;
}

@media only screen and (max-width: 840px) {
  .desktop {
    display: none;
  }
}

.header {
  padding: 0 0.3vw 0 0.3vw;
}

.wide_button {
  transition: border-color 1s, color 1s, background-color 1s;

  width: 80%;
  padding: 0.3em;
  margin-left: auto;
  margin-right: auto;
  margin-top: 0.3em;
  background-color: rgb(97, 69, 17);

  border-style: solid;
  border-color: rgb(189, 136, 58);
  border-radius: 0.15em;

  font-size: 1em;

  user-select: none;
  -ms-user-select: none;

  cursor: pointer;
}

.wide_button.disabled {
  color: darkgoldenrod;
  background-color: rgb(155, 125, 89);
  border-color: rgb(126, 117, 107);

  cursor: not-allowed;
}

.control_bar {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  padding-top: 0.3em;
  padding-bottom: 0.5em;
  justify-content: center;
}

.control_bar > div {
  margin-right: 1.4em;
  margin-left: 1em;
  width: 60%;
}

.control_bar_label {
  font-size: 0.9em;
  padding-bottom: 0.6em;
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
