<template>
  <div class="topContainer">
    <div class="title desktop">
      {{ isBastion ? "Bastion" : "Pyre" }} Fighters - Round {{ curRound }}
    </div>
    <div class="scrollContainer">
      <table>
        <tr class="entry" v-for="f in shownFighters" :key="f.id">
          <td class="fighterName">
            {{ f.name }}
          </td>
          <td class="TileLocation">
            {{ f.tile.toUpperCase() }}
          </td>
          <td>
            <StrikeLink
              :fighterId="f.id"
              :round="curRound"
              :inputURL="f.link"
            />
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import StrikeLink from "./elements/StrikeLink.vue"

import { mapGetters } from "vuex"
import { ALL_FIGHTERS_IN_ROUND, CURRENT_ROUND } from "../state/getters"

export default {
  data: function() {
    return {}
  },
  components: {
    StrikeLink
  },
  beforeMount: function() {
    this.fighters = this.allFighters(this.isBastion)
  },
  props: {
    isBastion: Boolean
  },
  computed: {
    shownFighters: function() {
      return this.allFighters(this.isBastion)
    },
    ...mapGetters({
      allFighters: ALL_FIGHTERS_IN_ROUND,
      curRound: CURRENT_ROUND
    })
  },
  name: "RoundSummary"
}
</script>

<style scoped>
.scrollContainer {
  overflow-y: auto;
  height: 90%;
}

@media only screen and (max-width: 840px) {
  .desktop {
    display: none;
  }
}
</style>
