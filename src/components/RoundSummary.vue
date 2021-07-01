<template>
  <div class="topContainer">
    <div class="title">
      {{ isBastion ? "Bastion" : "Pyre" }} Fighters - Round {{ curRound }}
    </div>
    <div class="scrollContainer">
      <div class="entry" v-for="f in shownFighters" :key="f.id">
        <div class="fighterName">
          {{ f.name }}
        </div>
        <div class="TileLocation">
          {{ f.tile }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import { ALL_FIGHTERS_IN_ROUND, CURRENT_ROUND } from "../state/getters"

export default {
  data: function() {
    return {}
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
