<template>
  <div id="fightersheet">
    <div>{{ allFighterDetails.name }}</div>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import { FIGHTER_SHEET } from "../state/getters"
// import { NEW_SELECTED } from "../state/mutations"

export default {
  props: {
    fighterId: Number
  },
  data: function() {
    return {}
  },
  name: "FighterSheet",
  computed: {
    allFighterDetails: function() {
      return this.allDetails(this.fighterId)
    },
    ...mapGetters({
      allDetails: FIGHTER_SHEET
    })
  },
  mounted: function() {
    console.log("Does this run?")
  }
}
</script>
