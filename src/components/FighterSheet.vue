<template>
  <div id="fightersheet">
    <div @click="closeWindow">X</div>
    <div class="column">
      <div class="cell">{{ allFighterDetails.name }}</div>
      <div class="cell"><img :src="fighterIcon" /></div>
    </div>
    <div class="column">
      <div class="details cell">
        <div class="entry">
          Joins the Fight for: {{ allFighterDetails.faction[0].toUpperCase() }}
        </div>
      </div>
      <div class="details cell">
        <div
          class="entry"
          v-for="artist in Object.keys(allFighterDetails.artists)"
          :key="artist"
        >
          {{ allFighterDetails.artists[artist].role }} :
          {{ allFighterDetails.artists[artist].name }}
          <div class="subsection">
            Contacts:
            <div
              class="contracts"
              v-for="site in Object.keys(
                allFighterDetails.artists[artist].contacts
              )"
              :key="site"
            >
              {{ site }} :
              {{ allFighterDetails.artists[artist].contacts[site] }}
            </div>
          </div>
        </div>
      </div>
      <div class="details cell">
        <div class="entry backstory">
          <div class="subTitle">Backstory:</div>
          {{ backstory(fighterId) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import { FIGHTER_SHEET, FIGHTER_BACKSTORY } from "../state/getters"
import { CLOSE_OVERVIEW } from "../state/mutations"

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
    fighterIcon: function() {
      return `fighterimages/${this.allFighterDetails.id}.png`
    },
    fighterBackupIcon: function() {
      if (this.allFighterDetails.faction[0] === "pyre")
        return require("../assets/pics/pyre-standin.png")
      return require("../assets/pics/bastion-standin.png")
    },
    ...mapGetters({
      allDetails: FIGHTER_SHEET,
      backstory: FIGHTER_BACKSTORY
    })
  },
  methods: {
    closeWindow: function() {
      this.$store.commit(CLOSE_OVERVIEW)
    }
  }
}
</script>

<style scoped>
#fightersheet {
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: row;
}

.cell {
  background-color: whitesmoke;
  border-style: solid;
  border-color: red;

  width: 100%;
}

.cell img {
  max-height: 80vh;
  max-width: 35vw;
}

.backstory {
  white-space: pre-wrap;
  text-align: left;

  max-height: 80vh;
  overflow: scroll;
}

.column {
  display: flex;
  flex-direction: column;

  min-width: 28vw;
  max-width: 40vw;
}
</style>
