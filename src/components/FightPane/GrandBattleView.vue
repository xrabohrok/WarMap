<template>
  <div class="grandbattle">
    <grand-battle-listing
      v-for="(id, index) in fighters"
      :key="id"
      :fighterId="id"
      :round="round"
      :hideLink="hideLinks"
      :isDuelist="index === 0 && alsoDuel"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import GrandBattleListing from "./GrandBattleListing"
import {
  MASSBATTLE_FIGHTERS,
  CURRENT_ROUND,
  CURRENT_ZONE_FIGHT
} from "../../state/getters"

export default {
  components: {
    GrandBattleListing
  },
  props: {
    faction: String,
    hideLinks: Boolean
  },
  computed: {
    fighters: function() {
      if (!this.alsoDuel) return this.gbfighters(this.faction)
      return this.gbfighters(this.faction) //.splice(0,0, this.zoneFight.fighters[this.faction][0])
    },
    alsoDuel: function() {
      return this.zoneFight.contest
    },
    ...mapGetters({
      gbfighters: MASSBATTLE_FIGHTERS,
      zoneFight: CURRENT_ZONE_FIGHT,
      round: CURRENT_ROUND
    })
  },
  name: "GrandBattleView"
}
</script>

<style scoped>
.grandbattle {
  height: 100%;
  width: 100%;
  overflow-y: auto;
}
</style>
