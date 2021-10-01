<template>
  <div id="FrontCenter" class="secondary"></div>
</template>

<script>
import { mapGetters } from "vuex"
import {
  CURRENT_ZONE_NAME,
  CURRENT_ZONE_DESC,
  SELECTING_GETTER,
  CURRENT_ZONE_FIGHT,
  CURRENT_ROUND
} from "../state/getters"
// import {DESELECT} from '../state/mutations'
// import FighterDetails from "./FightPane/FighterDetails.vue"
// import GrandBattleView from "./FightPane/GrandBattleView.vue"
// import ClashView from "./FightPane/ClashView.vue"
// import FightSummary from "./FightPane/FightSummary.vue"
// import TileDetails from "./FightPane/TileDetails.vue"

export default {
  components: {
    // Welcome Screen
    // Fighter
  },
  props: {
    fighterId: {
      type: Number,
      default: -1
    }
  },
  computed: {
    ...mapGetters({
      currZone: CURRENT_ZONE_NAME,
      currZoneDesc: CURRENT_ZONE_DESC,
      selected: SELECTING_GETTER,
      zoneFight: CURRENT_ZONE_FIGHT,
      round: CURRENT_ROUND
    })
  },
  name: "FrontCenterPane"
}
</script>

<style scoped>
#FrontCenter {
  border-radius: 10px;
  border-style: solid;
  border-color: rgb(107, 20, 71);
  position: absolute;
  width: 90vw;
  height: 90vh;
  top: 3%;
  left: 5%;
}

h2 {
  font-size: 1.9em;
}

@media only screen and (max-width: 840px) {
  #majorPaneDesktop {
    height: auto;
    font-size: 4vw;
    padding-bottom: 4%;
    border-bottom-style: solid;
    border-bottom-color: rgb(73, 11, 49);
    border-bottom-width: 2px;
  }

  h2 {
    font-size: 3vw;
  }
}

@media only screen and (orientation: landscape) and (max-width: 840px) {
  #majorPaneDesktop {
    font-size: 2vw;
  }

  h2 {
    font-size: 2.2vw;
  }
}
</style>
