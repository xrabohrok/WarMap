<template>
  <div class="details">
    <h2 class="zoneTitle">
      {{ zoneName }}
    </h2>
    <div class="descText">
      <div class="blockText areaDescription">
        <div
          class="RuleText"
          v-for="entry in specialRuleText"
          :key="entry.name"
        >
          <div class="RuleTitle">{{ entry.name }}</div>
          {{ entry.rule }}
        </div>
        {{ zoneDesc }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import {
  CURRENT_ZONE_NAME,
  CURRENT_ZONE_DESC,
  SELECTING_GETTER,
  CURRENT_ZONE_FIGHT
} from "../../state/getters"

import specials from "../../assets/data/events.json"

export default {
  computed: {
    zoneName: function() {
      return this.currZone(this.selected)
    },
    zoneDesc: function() {
      return this.currZoneDesc(this.selected)
    },
    specialRuleText: function() {
      var ruleset = []
      if (this.zoneFight.events) {
        this.zoneFight.events.forEach(rid => {
          ruleset.push(specials[rid])
        })
      }
      return ruleset
    },
    ...mapGetters({
      currZone: CURRENT_ZONE_NAME,
      currZoneDesc: CURRENT_ZONE_DESC,
      zoneFight: CURRENT_ZONE_FIGHT,
      selected: SELECTING_GETTER
    })
  },
  name: "TileDetails"
}
</script>

<style scoped>
.areaDescription {
  white-space: pre-line;
}

.blockText {
  margin-bottom: 0.9em;
}

.zoneTitle {
  font-family: "Permanent Marker", cursive;
  font-size: 1.5em;
  margin-top: 0.3em;
  margin-bottom: 0.3em;
}

.RuleText {
  font-family: "Roboto Mono", monospace;
  font-size: 0.9em;
  margin: 0.6em;
  line-height: 1.05em;
  border-top-style: solid;
  border-bottom-style: solid;
  padding-top: 0.6em;
  padding-bottom: 0.6em;
}

.RuleTitle {
  font-size: 1.9em;
  padding-bottom: 0.6em;
}

.descText {
  height: 70%;
  overflow-y: auto;
}

.details {
  margin-top: 0.3vh;
  margin-left: auto;
  margin-right: auto;
  order: 2;
  min-width: 20vw;
  width: 98%;
  height: 100%;
  left: 0%;
}
</style>
